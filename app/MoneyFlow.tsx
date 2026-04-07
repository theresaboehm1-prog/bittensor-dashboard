"use client";

import { useState, useEffect } from "react";

type SubnetFlow = {
  netuid: number;
  name: string;
  flow1h: number;
  flow24h: number;
  flow7d: number;
  emission: number;
  miners: number;
  validators: number;
};

export default function MoneyFlow({ taoPrice }: { taoPrice: number }) {
  var [subnets, setSubnets] = useState<SubnetFlow[]>([]);
  var [loading, setLoading] = useState(true);
  var [sortBy, setSortBy] = useState<"flow" | "emission">("flow");
  var [timeframe, setTimeframe] = useState<"1h" | "24h" | "7d">("24h");

  var NAMES: Record<number, string> = {
    0: "Root Network", 1: "Apex", 3: "MyShell", 4: "Targon", 5: "OpenKaito",
    6: "Nous Research", 7: "Subvortex", 8: "Taoshi", 9: "Pretrain",
    10: "Sturdy", 11: "Dippy", 19: "Nineteen", 22: "Datura", 25: "Protein Folding",
    27: "Compute", 37: "Finetuning", 44: "Score Vision", 56: "Gradients", 64: "Chutes",
    75: "PatternX", 120: "Hyperliquid TAO",
  };

  useEffect(function() {
    Promise.all([
      fetch("/api/taostats/dtao/tao_flow/v1?per_page=200").then(function(r) { return r.json(); }).catch(function() { return { data: [] }; }),
      fetch("/api/taostats/subnet/latest/v1?per_page=200").then(function(r) { return r.json(); }).catch(function() { return { data: [] }; })
    ]).then(function(results) {
      var flowData = results[0]?.data || [];
      var subnetData = results[1]?.data || [];

      var flowMap: Record<number, { f1h: number; f24h: number; f7d: number }> = {};
      flowData.forEach(function(f: any) {
        if (f.netuid !== undefined && f.netuid !== 0) {
          var f1h = Number(f.tao_flow_1h || f.flow_1h || f.tao_flow || "0") / 1e9;
          var f24h = Number(f.tao_flow_24h || f.flow_24h || "0") / 1e9;
          var f7d = Number(f.tao_flow_7d || f.flow_7d || "0") / 1e9;
          if (f24h === 0 && f.tao_in_24h && f.tao_out_24h) {
            f24h = (Number(f.tao_in_24h) - Number(f.tao_out_24h)) / 1e9;
          }
          if (f7d === 0 && f.tao_in_7d && f.tao_out_7d) {
            f7d = (Number(f.tao_in_7d) - Number(f.tao_out_7d)) / 1e9;
          }
          if (f1h === 0 && f.tao_in_1h && f.tao_out_1h) {
            f1h = (Number(f.tao_in_1h) - Number(f.tao_out_1h)) / 1e9;
          }
          flowMap[f.netuid] = { f1h: f1h, f24h: f24h, f7d: f7d };
        }
      });

      var entries = subnetData
        .filter(function(s: any) { return s.netuid !== 0; })
        .map(function(s: any) {
          var mapped = flowMap[s.netuid];
          var fallback = Number(s.tao_flow || s.tao_flow_24h || "0") / 1e9;
          return {
            netuid: s.netuid,
            name: NAMES[s.netuid] || "Subnet " + s.netuid,
            flow1h: mapped ? mapped.f1h : fallback,
            flow24h: mapped ? mapped.f24h : fallback,
            flow7d: mapped ? mapped.f7d : 0,
            emission: parseFloat(s.emission || "0") / 1e7,
            miners: s.active_miners || 0,
            validators: s.active_validators || 0,
          };
        })
        .filter(function(s: SubnetFlow) { return s.emission > 0; });
      setSubnets(entries);
      if (typeof window !== "undefined") {
        (window as any).__flowData = entries.map(function(s: any) { return { netuid: s.netuid, name: s.name, flow: s.flow24h }; });
      }
      setLoading(false);
    }).catch(function() { setLoading(false); });
  }, []);

  function getFlow(s: SubnetFlow) {
    if (timeframe === "1h") return s.flow1h;
    if (timeframe === "7d") return s.flow7d;
    return s.flow24h;
  }

  var sorted = subnets.slice().sort(function(a, b) {
    if (sortBy === "flow") return getFlow(b) - getFlow(a);
    return b.emission - a.emission;
  });

  var inflows = sorted.filter(function(s) { return getFlow(s) > 0; });
  var outflows = sorted.filter(function(s) { return getFlow(s) < 0; });
  var totalInflow = inflows.reduce(function(sum, s) { return sum + getFlow(s); }, 0);
  var totalOutflow = outflows.reduce(function(sum, s) { return sum + getFlow(s); }, 0);
  var maxAbsFlow = sorted.length > 0 ? Math.max.apply(null, sorted.map(function(s) { return Math.abs(getFlow(s)); }).concat([1])) : 1;

  var topInflows = inflows.slice(0, 15);
  var topOutflows = outflows.slice(0, 15);

  var timeLabel = timeframe === "1h" ? "1 Hour" : timeframe === "7d" ? "7 Days" : "24 Hours";

  function formatFlow(val: number) {
    var abs = Math.abs(val);
    if (abs >= 1e6) return (val / 1e6).toFixed(1) + "M";
    if (abs >= 1e3) return (val / 1e3).toFixed(1) + "K";
    if (abs >= 1) return val.toFixed(0);
    return val.toFixed(2);
  }

  function formatUSD(val: number) {
    var abs = Math.abs(val);
    if (abs >= 1e6) return "$" + (val / 1e6).toFixed(1) + "M";
    if (abs >= 1e3) return "$" + (val / 1e3).toFixed(0) + "K";
    return "$" + val.toFixed(0);
  }

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Subnet Money Flow Radar</h2>
          <p style={{ color: "#555566", fontSize: "11px" }}>Net TAO flowing in/out of subnet pools — the #1 signal for investor sentiment. <a href="/flow-methodology" style={{ color: "#00d4aa", textDecoration: "none", fontWeight: 600 }}>How it works →</a></p>
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <button onClick={function() { setTimeframe("1h"); }} style={{ background: timeframe === "1h" ? "#00d4aa" : "#1e1e2e", color: timeframe === "1h" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>1 Hour</button>
          <button onClick={function() { setTimeframe("24h"); }} style={{ background: timeframe === "24h" ? "#00d4aa" : "#1e1e2e", color: timeframe === "24h" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>24 Hours</button>
          <button onClick={function() { setTimeframe("7d"); }} style={{ background: timeframe === "7d" ? "#00d4aa" : "#1e1e2e", color: timeframe === "7d" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>7 Days</button>
          <div style={{ width: "1px", background: "#1e1e2e", margin: "0 4px" }} />
          <button onClick={function() { setSortBy("flow"); }} style={{ background: sortBy === "flow" ? "#ffaa00" : "#1e1e2e", color: sortBy === "flow" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>By Flow</button>
          <button onClick={function() { setSortBy("emission"); }} style={{ background: sortBy === "emission" ? "#ffaa00" : "#1e1e2e", color: sortBy === "emission" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>By Emission</button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#555566" }}>Loading flow data...</div>
      )}

      {!loading && (
        <div>
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px", background: "#1a1a25", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Inflows ({timeLabel})</div>
              <div style={{ color: "#00d4aa", fontSize: "24px", fontWeight: 700 }}>+{formatFlow(totalInflow)} τ</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>{formatUSD(Math.abs(totalInflow) * taoPrice)}</div>
              <div style={{ color: "#00d4aa", fontSize: "11px", marginTop: "4px" }}>{inflows.length} subnets gaining</div>
            </div>
            <div style={{ flex: "1 1 200px", background: "#1a1a25", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Outflows ({timeLabel})</div>
              <div style={{ color: "#ff4466", fontSize: "24px", fontWeight: 700 }}>{formatFlow(totalOutflow)} τ</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>{formatUSD(Math.abs(totalOutflow) * taoPrice)}</div>
              <div style={{ color: "#ff4466", fontSize: "11px", marginTop: "4px" }}>{outflows.length} subnets losing</div>
            </div>
            <div style={{ flex: "1 1 200px", background: "#1a1a25", border: "1px solid " + (totalInflow + totalOutflow > 0 ? "#00d4aa30" : "#ff446630"), borderRadius: "8px", padding: "16px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Net Flow ({timeLabel})</div>
              <div style={{ color: totalInflow + totalOutflow > 0 ? "#00d4aa" : "#ff4466", fontSize: "24px", fontWeight: 700 }}>{formatFlow(totalInflow + totalOutflow)} τ</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>{formatUSD(Math.abs(totalInflow + totalOutflow) * taoPrice)}</div>
              <div style={{ color: totalInflow + totalOutflow > 0 ? "#00d4aa" : "#ff4466", fontSize: "11px", marginTop: "4px" }}>{totalInflow + totalOutflow > 0 ? "Net bullish" : "Net bearish"}</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <div style={{ color: "#00d4aa", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Top Inflows — {timeLabel}</div>
              {topInflows.length === 0 && (
                <div style={{ color: "#555566", fontSize: "12px", padding: "12px 0" }}>No significant inflows detected in this period</div>
              )}
              {topInflows.map(function(s) {
                var flowVal = getFlow(s);
                var barWidth = maxAbsFlow > 0 ? (Math.abs(flowVal) / maxAbsFlow) * 100 : 0;
                return (
                  <a key={s.netuid} href={"/subnet/" + s.netuid} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
                      <div style={{ width: "100px", flexShrink: 0, fontSize: "11px", color: "#e8e8f0", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                      <div style={{ flex: 1, background: "#1e1e2e", borderRadius: "3px", height: "16px", overflow: "hidden" }}>
                        <div style={{ width: barWidth + "%", height: "100%", background: "linear-gradient(90deg, #00d4aa, #00d4aa88)", borderRadius: "3px" }} />
                      </div>
                      <div style={{ width: "70px", flexShrink: 0, fontSize: "11px", color: "#00d4aa", fontWeight: 600, textAlign: "right" }}>+{formatFlow(flowVal)}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div>
              <div style={{ color: "#ff4466", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Top Outflows — {timeLabel}</div>
              {topOutflows.length === 0 && (
                <div style={{ color: "#555566", fontSize: "12px", padding: "12px 0" }}>No significant outflows detected in this period</div>
              )}
              {topOutflows.map(function(s) {
                var flowVal = getFlow(s);
                var barWidth = maxAbsFlow > 0 ? (Math.abs(flowVal) / maxAbsFlow) * 100 : 0;
                return (
                  <a key={s.netuid} href={"/subnet/" + s.netuid} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
                      <div style={{ width: "100px", flexShrink: 0, fontSize: "11px", color: "#e8e8f0", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                      <div style={{ flex: 1, background: "#1e1e2e", borderRadius: "3px", height: "16px", overflow: "hidden", display: "flex", justifyContent: "flex-end" }}>
                        <div style={{ width: barWidth + "%", height: "100%", background: "linear-gradient(270deg, #ff4466, #ff446688)", borderRadius: "3px" }} />
                      </div>
                      <div style={{ width: "70px", flexShrink: 0, fontSize: "11px", color: "#ff4466", fontWeight: 600, textAlign: "right" }}>{formatFlow(flowVal)}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: "16px", padding: "12px", background: "#1a1a25", borderRadius: "6px" }}>
            <div style={{ color: "#8888a0", fontSize: "11px", fontWeight: 600, marginBottom: "6px" }}>How to Read This</div>
            <div style={{ color: "#555566", fontSize: "11px", lineHeight: 1.6 }}>
              Green (inflows) = TAO being staked INTO the subnet pool, driving up the alpha token price. Red (outflows) = TAO being withdrawn, pushing the alpha price down. Use 1-hour for real-time momentum, 24-hour for daily sentiment, and 7-day for medium-term trends. Key signal: a subnet with 1h inflow but 7d outflow may be a dead cat bounce — short-term buying in a longer downtrend.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}