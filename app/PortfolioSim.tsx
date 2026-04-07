"use client";

import { useState } from "react";

const TOP_SUBNETS = [
  { netuid: 3, name: "MyShell", emission: 3.43 },
  { netuid: 4, name: "Targon (Manifold)", emission: 2.44 },
  { netuid: 75, name: "PatternX", emission: 1.82 },
  { netuid: 9, name: "Pretrain (Macrocosmos)", emission: 1.41 },
  { netuid: 120, name: "Hyperliquid TAO", emission: 1.37 },
  { netuid: 39, name: "Subnet 39", emission: 1.04 },
  { netuid: 81, name: "Subnet 81", emission: 1.03 },
  { netuid: 44, name: "Score Vision", emission: 0.97 },
  { netuid: 19, name: "Nineteen (Rayon)", emission: 0.76 },
  { netuid: 64, name: "Chutes (Rayon)", emission: 0.70 },
  { netuid: 1, name: "Apex (Macrocosmos)", emission: 0.65 },
  { netuid: 8, name: "Taoshi", emission: 0.55 },
];

export default function PortfolioSim({ taoPrice }: { taoPrice: number }) {
  const [totalTAO, setTotalTAO] = useState(100);
  const [allocations, setAllocations] = useState<Record<number, number>>({});

  const dailyTAOEmission = 3600;

  const setAlloc = (netuid: number, pct: number) => {
    setAllocations((prev) => ({ ...prev, [netuid]: Math.min(100, Math.max(0, pct)) }));
  };

  const totalAllocPct = Object.values(allocations).reduce((s, v) => s + v, 0);
  const remaining = 100 - totalAllocPct;

  const results = TOP_SUBNETS.map((sn) => {
    const allocPct = allocations[sn.netuid] || 0;
    const taoAllocated = (allocPct / 100) * totalTAO;
    const dailyEmission = dailyTAOEmission * (sn.emission / 100);
    const estDailyYield = taoAllocated > 0 ? dailyEmission * (allocPct / 100) * 0.01 : 0;
    const annualYield = estDailyYield * 365;
    const apr = taoAllocated > 0 ? (annualYield / taoAllocated) * 100 : 0;
    return { ...sn, allocPct, taoAllocated, estDailyYield, annualYield, apr };
  });

  const totalDaily = results.reduce((s, r) => s + r.estDailyYield, 0);
  const totalAnnual = results.reduce((s, r) => s + r.annualYield, 0);

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: 0 }}>Portfolio Simulator</h2>
          <p style={{ color: "#555566", fontSize: "11px", margin: "4px 0 0 0" }}>Model your TAO allocation across multiple subnets. <a href="/portfolio-methodology" style={{ color: "#aa66ff", textDecoration: "none", fontWeight: 600 }}>How it works →</a></p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ color: "#8888a0", fontSize: "12px" }}>TOTAL TAO:</label>
          <input
            type="number"
            value={totalTAO}
            onChange={(e) => setTotalTAO(Math.max(0, Number(e.target.value)))}
            style={{
              background: "#1e1e2e",
              border: "1px solid #2a2a3a",
              borderRadius: "4px",
              color: "#00d4aa",
              padding: "6px 12px",
              width: "100px",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "inherit",
              textAlign: "right",
            }}
          />
          <span style={{ color: "#555566", fontSize: "12px" }}>
            ≈ ${(totalTAO * taoPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      {/* Allocation bar */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <span style={{ color: "#8888a0", fontSize: "11px" }}>ALLOCATION</span>
          <span style={{ color: remaining < 0 ? "#ff4466" : "#00d4aa", fontSize: "11px", fontWeight: 600 }}>
            {remaining >= 0 ? `${remaining}% remaining` : `${Math.abs(remaining)}% over!`}
          </span>
        </div>
        <div style={{ background: "#1e1e2e", borderRadius: "4px", height: "8px", overflow: "hidden" }}>
          <div
            style={{
              width: `${Math.min(totalAllocPct, 100)}%`,
              height: "100%",
              background: totalAllocPct > 100 ? "#ff4466" : "linear-gradient(90deg, #00d4aa, #4488ff)",
              borderRadius: "4px",
              transition: "width 0.2s",
            }}
          />
        </div>
      </div>

      {/* Subnet rows */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "650px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e1e2e" }}>
              <th style={{ padding: "8px 12px", textAlign: "left", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Subnet</th>
              <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Emission</th>
              <th style={{ padding: "8px 12px", textAlign: "center", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", width: "140px" }}>Allocate %</th>
              <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>TAO In</th>
              <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Est. Daily</th>
              <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Est. Annual</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.netuid} style={{ borderBottom: "1px solid #1e1e2e" }}>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ color: "#e8e8f0", fontWeight: 600, fontSize: "13px" }}>{r.name}</span>
                  <span style={{ color: "#555566", marginLeft: "6px", fontSize: "11px" }}>SN{r.netuid}</span>
                </td>
                <td style={{ padding: "10px 12px", color: "#00d4aa", textAlign: "right", fontSize: "13px" }}>{r.emission}%</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={r.allocPct}
                    onChange={(e) => setAlloc(r.netuid, Number(e.target.value))}
                    style={{ width: "80px", accentColor: "#00d4aa", cursor: "pointer" }}
                  />
                  <span style={{ color: "#8888a0", fontSize: "12px", marginLeft: "6px", display: "inline-block", width: "32px" }}>{r.allocPct}%</span>
                </td>
                <td style={{ padding: "10px 12px", color: "#e8e8f0", textAlign: "right", fontSize: "13px" }}>{r.taoAllocated.toFixed(1)} τ</td>
                <td style={{ padding: "10px 12px", color: "#ffaa00", textAlign: "right", fontSize: "13px" }}>{r.estDailyYield.toFixed(4)} τ</td>
                <td style={{ padding: "10px 12px", color: "#4488ff", textAlign: "right", fontSize: "13px" }}>{r.annualYield.toFixed(2)} τ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      {totalAllocPct > 0 && (
        <div style={{
          marginTop: "16px",
          padding: "16px",
          background: "#1a1a25",
          borderRadius: "6px",
          display: "flex",
          gap: "32px",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Est. Daily Yield</div>
            <div style={{ color: "#ffaa00", fontSize: "20px", fontWeight: 700, marginTop: "4px" }}>{totalDaily.toFixed(4)} τ</div>
            <div style={{ color: "#555566", fontSize: "11px" }}>≈ ${(totalDaily * taoPrice).toFixed(2)}/day</div>
          </div>
          <div>
            <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Est. Annual Yield</div>
            <div style={{ color: "#4488ff", fontSize: "20px", fontWeight: 700, marginTop: "4px" }}>{totalAnnual.toFixed(2)} τ</div>
            <div style={{ color: "#555566", fontSize: "11px" }}>≈ ${(totalAnnual * taoPrice).toFixed(0)}/year</div>
          </div>
          <div>
            <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Portfolio Value</div>
            <div style={{ color: "#00d4aa", fontSize: "20px", fontWeight: 700, marginTop: "4px" }}>${(totalTAO * taoPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div style={{ color: "#555566", fontSize: "11px" }}>{totalTAO} τ across {results.filter(r => r.allocPct > 0).length} subnets</div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "12px", color: "#555566", fontSize: "10px", fontStyle: "italic" }}>
        * Estimates are simplified projections based on current emission rates. Actual yields depend on stake weight, validator performance, and network dynamics.
      </div>
    </div>
  );
}