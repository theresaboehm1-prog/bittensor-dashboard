"use client";

import { useState, useEffect } from "react";

type Validator = {
  name: string;
  hotkey: string;
  take: number;
  nominators: number;
  activeSubnets: number;
  rootStake: number;
  alphaStake: number;
};

export default function ValidatorFees({ taoPrice }: { taoPrice: number }) {
  var [validators, setValidators] = useState<Validator[]>([]);
  var [loading, setLoading] = useState(true);
  var [sortBy, setSortBy] = useState<"take" | "stake" | "noms">("take");
  var [stakeInput, setStakeInput] = useState(100);

  useEffect(function() {
    fetch("/api/taostats/validator/latest/v1?per_page=50")
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var entries = (data.data || []).map(function(v: any) {
          return {
            name: v.hotkey_name || "Unknown",
            hotkey: v.hotkey?.ss58 || v.hotkey || "Unknown",
            take: parseFloat(v.take || "0.18") * 100,
            nominators: v.nominators || 0,
            activeSubnets: v.active_subnets || v.registrations || 0,
            rootStake: Number(v.root_stake || "0") / 1e9,
            alphaStake: Number(v.alpha_stake || "0") / 1e9,
          };
        });
        setValidators(entries);
        setLoading(false);
      })
      .catch(function() { setLoading(false); });
  }, []);

  var sorted = validators.slice().sort(function(a, b) {
    if (sortBy === "take") return a.take - b.take;
    if (sortBy === "stake") return (b.rootStake + b.alphaStake) - (a.rootStake + a.alphaStake);
    return b.nominators - a.nominators;
  });

  var dailyEmission = 3600;
  var totalStaked = 7330000;
  var baseAnnualYield = (stakeInput / totalStaked) * dailyEmission * 365;

  function formatTAO(val: number) {
    if (val >= 1e6) return (val / 1e6).toFixed(2) + "M";
    if (val >= 1e3) return (val / 1e3).toFixed(1) + "K";
    return val.toFixed(1);
  }

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Validator Fee Comparison</h2>
          <p style={{ color: "#555566", fontSize: "11px" }}>Compare validator take rates — a 5% difference on 100 TAO = ${(baseAnnualYield * 0.05 * taoPrice).toFixed(0)}/year</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ color: "#8888a0", fontSize: "11px" }}>YOUR STAKE:</label>
          <input type="number" value={stakeInput} onChange={function(e) { setStakeInput(Math.max(1, Number(e.target.value))); }} style={{ background: "#1e1e2e", border: "1px solid #2a2a3a", borderRadius: "4px", color: "#00d4aa", padding: "4px 8px", width: "80px", fontSize: "13px", fontWeight: 700, fontFamily: "inherit", textAlign: "right" }} />
          <span style={{ color: "#555566", fontSize: "11px" }}>TAO</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
        <button onClick={function() { setSortBy("take"); }} style={{ background: sortBy === "take" ? "#00d4aa" : "#1e1e2e", color: sortBy === "take" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 10px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Lowest Fee</button>
        <button onClick={function() { setSortBy("stake"); }} style={{ background: sortBy === "stake" ? "#4488ff" : "#1e1e2e", color: sortBy === "stake" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 10px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Most Staked</button>
        <button onClick={function() { setSortBy("noms"); }} style={{ background: sortBy === "noms" ? "#ffaa00" : "#1e1e2e", color: sortBy === "noms" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 10px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Most Popular</button>
      </div>

      {loading && <div style={{ textAlign: "center", padding: "40px", color: "#555566" }}>Loading validator data...</div>}

      {!loading && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e2e" }}>
                <th style={{ padding: "8px 12px", textAlign: "left", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>#</th>
                <th style={{ padding: "8px 12px", textAlign: "left", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Validator</th>
                <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Take %</th>
                <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Your Annual Cost</th>
                <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Your Net Yield</th>
                <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Total Stake</th>
                <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Noms</th>
              </tr>
            </thead>
            <tbody>
              {sorted.slice(0, 25).map(function(v, i) {
                var annualCost = baseAnnualYield * (v.take / 100);
                var netYield = baseAnnualYield - annualCost;
                var takeColor = v.take <= 5 ? "#00d4aa" : v.take <= 10 ? "#4488ff" : v.take <= 15 ? "#ffaa00" : "#ff4466";
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #1e1e2e" }}>
                    <td style={{ padding: "10px 12px", color: "#555566", fontSize: "13px" }}>{i + 1}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ color: "#e8e8f0", fontWeight: 600, fontSize: "13px" }}>{v.name}</div>
                      <div style={{ color: "#555566", fontSize: "10px", fontFamily: "monospace" }}>{v.hotkey.slice(0, 8)}...{v.hotkey.slice(-6)}</div>
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "right" }}>
                      <span style={{ color: takeColor, fontSize: "15px", fontWeight: 700 }}>{v.take.toFixed(1)}%</span>
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "#ff4466", fontSize: "12px" }}>-{annualCost.toFixed(2)} τ (${(annualCost * taoPrice).toFixed(0)})</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "#00d4aa", fontSize: "12px", fontWeight: 600 }}>{netYield.toFixed(2)} τ (${(netYield * taoPrice).toFixed(0)})</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "#8888a0", fontSize: "12px" }}>{formatTAO(v.rootStake + v.alphaStake)} τ</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "#8888a0", fontSize: "12px" }}>{v.nominators}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: "12px", color: "#555566", fontSize: "10px", fontStyle: "italic" }}>* Annual cost and yield estimates based on current network emission rate (~3,600 TAO/day) and total staked (~7.33M TAO). Actual returns vary by subnet and validator performance.</div>
    </div>
  );
}