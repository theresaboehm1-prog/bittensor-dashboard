"use client";

import { useState, useEffect } from "react";

type Movement = {
  rank: number;
  name: string;
  coldkey: string;
  balance: number;
  netuid: number;
};

export default function LargeMovements({ taoPrice }: { taoPrice: number }) {
  var [current, setCurrent] = useState<Movement[]>([]);
  var [loading, setLoading] = useState(true);
  var [threshold, setThreshold] = useState(50000);

  var NAMES: Record<number, string> = {
    0: "Root", 1: "Apex", 3: "MyShell", 4: "Targon", 5: "OpenKaito",
    8: "Taoshi", 9: "Pretrain", 19: "Nineteen", 64: "Chutes", 75: "PatternX", 120: "Hyperliquid",
  };

  useEffect(function() {
    fetch("/api/taostats/dtao/stake_balance/latest/v1?per_page=100&netuid=0")
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var entries = (data.data || []).map(function(w: any, i: number) {
          return {
            rank: w.subnet_rank || i + 1,
            name: w.hotkey_name || "Unknown",
            coldkey: w.coldkey?.ss58 || "Unknown",
            balance: Number(w.balance_as_tao || "0") / 1e9,
            netuid: w.netuid || 0,
          };
        });
        setCurrent(entries);
        setLoading(false);
      })
      .catch(function() { setLoading(false); });
  }, []);

  var largeHolders = current.filter(function(w) { return w.balance >= threshold; });
  var totalLargeHoldings = largeHolders.reduce(function(sum, w) { return sum + w.balance; }, 0);

  var entityTotals: Record<string, { name: string; total: number; wallets: number }> = {};
  current.forEach(function(w) {
    if (!entityTotals[w.name]) {
      entityTotals[w.name] = { name: w.name, total: 0, wallets: 0 };
    }
    entityTotals[w.name].total += w.balance;
    entityTotals[w.name].wallets += 1;
  });

  var entities = Object.values(entityTotals).sort(function(a, b) { return b.total - a.total; }).slice(0, 15);
  var maxEntity = entities.length > 0 ? entities[0].total : 1;

  function formatTAO(val: number) {
    if (val >= 1e6) return (val / 1e6).toFixed(2) + "M";
    if (val >= 1e3) return (val / 1e3).toFixed(1) + "K";
    return val.toFixed(0);
  }

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Large Holder Concentration Monitor</h2>
          <p style={{ color: "#555566", fontSize: "11px" }}>Track whale concentration risk — entities with positions above your threshold</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ color: "#8888a0", fontSize: "11px" }}>THRESHOLD:</label>
          <select value={threshold} onChange={function(e) { setThreshold(Number(e.target.value)); }} style={{ background: "#1e1e2e", border: "1px solid #2a2a3a", borderRadius: "4px", color: "#ffaa00", padding: "4px 8px", fontSize: "12px", fontFamily: "inherit", fontWeight: 600 }}>
            <option value={10000}>10K+ TAO</option>
            <option value={25000}>25K+ TAO</option>
            <option value={50000}>50K+ TAO</option>
            <option value={100000}>100K+ TAO</option>
          </select>
        </div>
      </div>

      {loading && <div style={{ textAlign: "center", padding: "40px", color: "#555566" }}>Loading holder data...</div>}

      {!loading && (
        <div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 180px", background: "#1a1a25", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Holders Above {formatTAO(threshold)}</div>
              <div style={{ color: "#ffaa00", fontSize: "24px", fontWeight: 700 }}>{largeHolders.length}</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>wallets</div>
            </div>
            <div style={{ flex: "1 1 180px", background: "#1a1a25", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Combined Holdings</div>
              <div style={{ color: "#00d4aa", fontSize: "24px", fontWeight: 700 }}>{formatTAO(totalLargeHoldings)} τ</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>${(totalLargeHoldings * taoPrice / 1e6).toFixed(0)}M USD</div>
            </div>
            <div style={{ flex: "1 1 180px", background: "#1a1a25", borderRadius: "8px", padding: "14px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Unique Entities</div>
              <div style={{ color: "#4488ff", fontSize: "24px", fontWeight: 700 }}>{entities.length}</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>distinct organizations</div>
            </div>
            <div style={{ flex: "1 1 180px", background: totalLargeHoldings / 10780000 > 0.3 ? "#ff446610" : "#00d4aa10", border: "1px solid " + (totalLargeHoldings / 10780000 > 0.3 ? "#ff446630" : "#00d4aa30"), borderRadius: "8px", padding: "14px", textAlign: "center" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Concentration</div>
              <div style={{ color: totalLargeHoldings / 10780000 > 0.3 ? "#ff4466" : "#00d4aa", fontSize: "24px", fontWeight: 700 }}>{(totalLargeHoldings / 10780000 * 100).toFixed(1)}%</div>
              <div style={{ color: "#555566", fontSize: "11px" }}>of circulating supply</div>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ color: "#8888a0", fontSize: "12px", fontWeight: 600, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Entity Concentration Map</div>
            {entities.map(function(e) {
              var barWidth = maxEntity > 0 ? (e.total / maxEntity) * 100 : 0;
              var isExchange = e.name === "Kraken" || e.name.includes("Binance") || e.name.includes("Coinbase");
              var isInstitution = e.name.includes("Polychain") || e.name.includes("Yuma") || e.name.includes("DCG");
              var isFoundation = e.name.includes("Foundation") || e.name.includes("Opentensor") || e.name.includes("OpenTensor");
              var tagColor = isExchange ? "#4488ff" : isInstitution ? "#aa66ff" : isFoundation ? "#ffaa00" : "#555566";
              var tagLabel = isExchange ? "EXCHANGE" : isInstitution ? "INSTITUTION" : isFoundation ? "FOUNDATION" : "OTHER";
              return (
                <div key={e.name} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
                  <div style={{ width: "130px", flexShrink: 0 }}>
                    <div style={{ color: "#e8e8f0", fontSize: "12px", fontWeight: 600 }}>{e.name}</div>
                    <div style={{ color: tagColor, fontSize: "9px", fontWeight: 600 }}>{tagLabel} · {e.wallets} wallet{e.wallets > 1 ? "s" : ""}</div>
                  </div>
                  <div style={{ flex: 1, background: "#1e1e2e", borderRadius: "3px", height: "20px", overflow: "hidden" }}>
                    <div style={{ width: barWidth + "%", height: "100%", background: "linear-gradient(90deg, " + tagColor + ", " + tagColor + "88)", borderRadius: "3px" }} />
                  </div>
                  <div style={{ width: "90px", flexShrink: 0, textAlign: "right" }}>
                    <div style={{ color: "#e8e8f0", fontSize: "12px", fontWeight: 600 }}>{formatTAO(e.total)} τ</div>
                    <div style={{ color: "#555566", fontSize: "10px" }}>${(e.total * taoPrice / 1e6).toFixed(1)}M</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "12px", background: "#1a1a25", borderRadius: "6px" }}>
            <div style={{ color: "#8888a0", fontSize: "11px", fontWeight: 600, marginBottom: "6px" }}>Why This Matters</div>
            <div style={{ color: "#555566", fontSize: "11px", lineHeight: 1.6 }}>
              High concentration = higher risk. If a single entity controls a large percentage of staked TAO and decides to unstake, it could crash the alpha token price of affected subnets. Exchanges (blue) hold TAO on behalf of many users so their concentration is less risky than a single institution (purple) holding the same amount. Watch for any entity's holdings suddenly dropping — that's the sell signal.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}