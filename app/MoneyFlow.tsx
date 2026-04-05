"use client";

import { useState, useEffect } from "react";

type SubnetFlow = {
  netuid: number;
  name: string;
  taoFlow: number;
  emission: number;
  miners: number;
  validators: number;
};

export default function MoneyFlow({ taoPrice }: { taoPrice: number }) {
  var [subnets, setSubnets] = useState<SubnetFlow[]>([]);
  var [loading, setLoading] = useState(true);
  var [sortBy, setSortBy] = useState<"flow" | "emission">("flow");

  var NAMES: Record<number, string> = {
    0: "Root Network", 1: "Apex", 3: "MyShell", 4: "Targon", 5: "OpenKaito",
    6: "Nous Research", 7: "Subvortex", 8: "Taoshi", 9: "Pretrain",
    10: "Sturdy", 11: "Dippy", 19: "Nineteen", 22: "Datura", 25: "Protein Folding",
    27: "Compute", 37: "Finetuning", 44: "Score Vision", 64: "Chutes",
    75: "PatternX", 120: "Hyperliquid TAO",
  };

  useEffect(function() {
    fetch("/api/taostats/subnet/latest/v1?per_page=200")
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var entries = (data.data || [])
          .filter(function(s: any) { return s.netuid !== 0; })
          .map(function(s: any) {
            return {
              netuid: s.netuid,
              name: NAMES[s.netuid] || "Subnet " + s.netuid,
              taoFlow: Number(s.tao_flow || "0") / 1e9,
              emission: parseFloat(s.emission || "0") / 1e7,
              miners: s.active_miners || 0,
              validators: s.active_validators || 0,
            };
          })
          .filter(function(s: SubnetFlow) { return s.taoFlow !== 0 || s.emission > 0; });
        setSubnets(entries);
        setLoading(false);
      })
      .catch(function() { setLoading(false); });
  }, []);

  var sorted = subnets.slice().sort(function(a, b) {
    if (sortBy === "flow") return b.taoFlow - a.taoFlow;
    return b.emission - a.emission;
  });

  var inflows = sorted.filter(function(s) { return s.taoFlow > 0; });
  var outflows = sorted.filter(function(s) { return s.taoFlow < 0; });
  var totalInflow = inflows.reduce(function(sum, s) { return sum + s.taoFlow; }, 0);
  var totalOutflow = outflows.reduce(function(sum, s) { return sum + s.taoFlow; }, 0);
  var maxAbsFlow = sorted.length > 0 ? Math.max.apply(null, sorted.map(function(s) { return Math.abs(s.taoFlow); })) : 1;

  var topInflows = inflows.slice(0, 15);
  var topOutflows = outflows.slice(0, 15);

  function formatFlow(val: number) {
    var abs = Math.abs(val);
    if (abs >= 1e6) return (val / 1e6).toFixed(1) + "M";
    if (abs >= 1e3) return (val / 1e3).toFixed(1) + "K";
    return val.toFixed(0);
  }

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Subnet Money Flow Radar</h2>
          <p style={{ color: "#555566", fontSize: "11px" }}>Net TAO flowing in/out of subnet pools — the #1 signal for investor sentiment</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={function() { setSortBy("flow"); }} style={{ background: sortBy === "flow" ? "#00d4aa" : "#1e1e2e", color: sortBy === "flow" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Sort by Flow</button>
          <button onClick={function() { setSortBy("emission"); }} style={{ background: sortBy === "emission" ? "#00d4aa" : "#1e1e2e", color: sortBy === "emission" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Sort by Emission</button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#555566" }}>Loading flow data...</div>
      )}

      {!loading && (
        <div>
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px", background: "#00d4aa10", border: "1px solid #00d4aa30", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Total Inflows</div>
              <div style={{ color: "#00d4aa", fontSize: "24px", fontWeight: 700 }}>+{formatFlow(totalInflow)} τ</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>${(Math.abs(totalInflow) * taoPrice / 1e6).toFixed(1)}M USD</div>
              <div style={{ color: "#00d4aa", fontSize: "11px", marginTop: "4px" }}>{inflows.length} subnets gaining</div>
            </div>
            <div style={{ flex: "1 1 200px", background: "#ff446610", border: "1px solid #ff446630", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Total Outflows</div>
              <div style={{ color: "#ff4466", fontSize: "24px", fontWeight: 700 }}>{formatFlow(totalOutflow)} τ</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>${(Math.abs(totalOutflow) * taoPrice / 1e6).toFixed(1)}M USD</div>
              <div style={{ color: "#ff4466", fontSize: "11px", marginTop: "4px" }}>{outflows.length} subnets losing</div>
            </div>
            <div style={{ flex: "1 1 200px", background: totalInflow + totalOutflow > 0 ? "#00d4aa10" : "#ff446610", border: "1px solid " + (totalInflow + totalOutflow > 0 ? "#00d4aa30" : "#ff446630"), borderRadius: "8px", padding: "16px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Net Flow</div>
              <div style={{ color: totalInflow + totalOutflow > 0 ? "#00d4aa" : "#ff4466", fontSize: "24px", fontWeight: 700 }}>{formatFlow(totalInflow + totalOutflow)} τ</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>${(Math.abs(totalInflow + totalOutflow) * taoPrice / 1e6).toFixed(1)}M USD</div>
              <div style={{ color: totalInflow + totalOutflow > 0 ? "#00d4aa" : "#ff4466", fontSize: "11px", marginTop: "4px" }}>{totalInflow + totalOutflow > 0 ? "Net bullish" : "Net bearish"}</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <div style={{ color: "#00d4aa", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Top Inflows (Money Coming In)</div>
              {topInflows.map(function(s) {
                var barWidth = maxAbsFlow > 0 ? (Math.abs(s.taoFlow) / maxAbsFlow) * 100 : 0;
                return (
                  <a key={s.netuid} href={"/subnet/" + s.netuid} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
                      <div style={{ width: "100px", flexShrink: 0, fontSize: "11px", color: "#e8e8f0", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                      <div style={{ flex: 1, background: "#1e1e2e", borderRadius: "3px", height: "16px", overflow: "hidden" }}>
                        <div style={{ width: barWidth + "%", height: "100%", background: "linear-gradient(90deg, #00d4aa, #00d4aa88)", borderRadius: "3px" }} />
                      </div>
                      <div style={{ width: "70px", flexShrink: 0, fontSize: "11px", color: "#00d4aa", fontWeight: 600, textAlign: "right" }}>+{formatFlow(s.taoFlow)}</div>
                    </div>
                  </a>
                );
              })}
              {topInflows.length === 0 && (
                <div style={{ color: "#555566", fontSize: "12px", padding: "12px 0" }}>No inflows detected</div>
              )}
            </div>

            <div>
              <div style={{ color: "#ff4466", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Top Outflows (Money Leaving)</div>
              {topOutflows.map(function(s) {
                var barWidth = maxAbsFlow > 0 ? (Math.abs(s.taoFlow) / maxAbsFlow) * 100 : 0;
                return (
                  <a key={s.netuid} href={"/subnet/" + s.netuid} style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
                      <div style={{ width: "100px", flexShrink: 0, fontSize: "11px", color: "#e8e8f0", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                      <div style={{ flex: 1, background: "#1e1e2e", borderRadius: "3px", height: "16px", overflow: "hidden", display: "flex", justifyContent: "flex-end" }}>
                        <div style={{ width: barWidth + "%", height: "100%", background: "linear-gradient(270deg, #ff4466, #ff446688)", borderRadius: "3px" }} />
                      </div>
                      <div style={{ width: "70px", flexShrink: 0, fontSize: "11px", color: "#ff4466", fontWeight: 600, textAlign: "right" }}>{formatFlow(s.taoFlow)}</div>
                    </div>
                  </a>
                );
              })}
              {topOutflows.length === 0 && (
                <div style={{ color: "#555566", fontSize: "12px", padding: "12px 0" }}>No outflows detected</div>
              )}
            </div>
          </div>

          <div style={{ marginTop: "16px", padding: "12px", background: "#1a1a25", borderRadius: "6px" }}>
            <div style={{ color: "#8888a0", fontSize: "11px", fontWeight: 600, marginBottom: "6px" }}>How to Read This</div>
            <div style={{ color: "#555566", fontSize: "11px", lineHeight: 1.6 }}>
              Green (inflows) = TAO is being staked INTO the subnet pool, increasing its alpha token price and signaling growing investor confidence. Red (outflows) = TAO is being withdrawn FROM the subnet pool, decreasing its alpha token price and signaling declining confidence. Large inflows with rising emission share = strongest bullish signal. Large outflows despite high emission = potential capitulation or rebalancing.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}