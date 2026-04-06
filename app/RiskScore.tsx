"use client";

import { useState } from "react";

type SubnetRisk = {
  netuid: number;
  name: string;
  emission: number;
  miners: number;
  validators: number;
  neurons: number;
  maxNeurons: number;
  taoFlow: number;
  regAllowed: boolean;
};

type RiskBreakdown = {
  overall: number;
  minerDiversity: number;
  validatorCoverage: number;
  emissionStrength: number;
  flowMomentum: number;
  capacityUtilization: number;
  label: string;
  color: string;
};

function calculateRisk(s: SubnetRisk): RiskBreakdown {
  var minerScore = 0;
  if (s.miners >= 50) { minerScore = 95; }
  else if (s.miners >= 20) { minerScore = 80; }
  else if (s.miners >= 10) { minerScore = 65; }
  else if (s.miners >= 5) { minerScore = 45; }
  else if (s.miners >= 2) { minerScore = 25; }
  else { minerScore = 10; }

  var valScore = 0;
  if (s.validators >= 15) { valScore = 95; }
  else if (s.validators >= 10) { valScore = 80; }
  else if (s.validators >= 5) { valScore = 65; }
  else if (s.validators >= 3) { valScore = 45; }
  else { valScore = 20; }

  var emissionScore = 0;
  if (s.emission >= 2.0) { emissionScore = 95; }
  else if (s.emission >= 1.0) { emissionScore = 80; }
  else if (s.emission >= 0.5) { emissionScore = 60; }
  else if (s.emission >= 0.2) { emissionScore = 40; }
  else { emissionScore = 15; }

  var flowScore = 50;
  if (s.taoFlow > 1000000) { flowScore = 95; }
  else if (s.taoFlow > 100000) { flowScore = 80; }
  else if (s.taoFlow > 0) { flowScore = 65; }
  else if (s.taoFlow > -100000) { flowScore = 40; }
  else if (s.taoFlow > -1000000) { flowScore = 25; }
  else { flowScore = 10; }

  var capacityScore = 0;
  var utilization = s.maxNeurons > 0 ? s.neurons / s.maxNeurons : 0;
  if (utilization >= 0.8) { capacityScore = 90; }
  else if (utilization >= 0.5) { capacityScore = 70; }
  else if (utilization >= 0.3) { capacityScore = 50; }
  else { capacityScore = 25; }

  var overall = Math.round(
    minerScore * 0.25 +
    valScore * 0.20 +
    emissionScore * 0.25 +
    flowScore * 0.20 +
    capacityScore * 0.10
  );

  var label = "";
  var color = "";
  if (overall >= 80) { label = "Low Risk"; color = "#00d4aa"; }
  else if (overall >= 60) { label = "Moderate"; color = "#4488ff"; }
  else if (overall >= 40) { label = "Elevated"; color = "#ffaa00"; }
  else if (overall >= 20) { label = "High Risk"; color = "#ff8844"; }
  else { label = "Critical"; color = "#ff4466"; }


  return {
    overall: overall,
    minerDiversity: minerScore,
    validatorCoverage: valScore,
    emissionStrength: emissionScore,
    flowMomentum: flowScore,
    capacityUtilization: capacityScore,
    label: label,
    color: color,
  };
}

function ScoreBar({ label, score, weight }: { label: string; score: number; weight: string }) {
  var color = score >= 80 ? "#00d4aa" : score >= 60 ? "#4488ff" : score >= 40 ? "#ffaa00" : "#ff4466";
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
        <span style={{ color: "#8888a0", fontSize: "11px" }}>{label}</span>
        <span style={{ color: color, fontSize: "11px", fontWeight: 600 }}>{score}/100 <span style={{ color: "#555566", fontWeight: 400 }}>({weight})</span></span>
      </div>
      <div style={{ background: "#1e1e2e", borderRadius: "3px", height: "6px", overflow: "hidden" }}>
        <div style={{ width: score + "%", height: "100%", background: color, borderRadius: "3px" }} />
      </div>
    </div>
  );
}

function RiskGauge({ score, color, label }: { score: number; color: string; label: string }) {
  var rotation = (score / 100) * 180 - 90;
  return (
    <div style={{ textAlign: "center", position: "relative", width: "120px", height: "70px" }}>
      <svg viewBox="0 0 120 70" style={{ width: "120px", height: "70px" }}>
        <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="#1e1e2e" strokeWidth="8" strokeLinecap="round" />
        <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={String(157 * score / 100) + " 157"} />
      </svg>
      <div style={{ position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)", color: color, fontSize: "22px", fontWeight: 700 }}>{score}</div>
    </div>
  );
}

export default function RiskScore({ subnets }: { subnets: SubnetRisk[] }) {
  var [selectedSubnet, setSelectedSubnet] = useState<number | null>(null);
  var [sortBy, setSortBy] = useState<"score" | "risk">("score");

  var scored = subnets.map(function(s) {
    return { subnet: s, risk: calculateRisk(s) };
  }).sort(function(a, b) {
    if (sortBy === "score") return b.risk.overall - a.risk.overall;
    return a.risk.overall - b.risk.overall;
  });

  var selected = selectedSubnet !== null ? scored.find(function(s) { return s.subnet.netuid === selectedSubnet; }) : null;

  var avgScore = scored.length > 0 ? Math.round(scored.reduce(function(sum, s) { return sum + s.risk.overall; }, 0) / scored.length) : 0;
  var lowRisk = scored.filter(function(s) { return s.risk.overall >= 80; }).length;
  var moderate = scored.filter(function(s) { return s.risk.overall >= 60 && s.risk.overall < 80; }).length;
  var elevated = scored.filter(function(s) { return s.risk.overall >= 40 && s.risk.overall < 60; }).length;
  var highRisk = scored.filter(function(s) { return s.risk.overall < 40; }).length;
  if (typeof window !== "undefined") {
    (window as any).__riskScores = scored.map(function(item) { return { netuid: item.subnet.netuid, name: item.subnet.name, score: item.risk.overall, label: item.risk.label, minerScore: item.risk.minerDiversity, emissionScore: item.risk.emissionStrength, valScore: item.risk.validatorCoverage, flowScore: item.risk.flowMomentum }; });
  }
  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Subnet Risk Score</h2>
        <p style={{ color: "#555566", fontSize: "11px" }}>Investment risk rating: should you stake here? Miner Diversity (25%), Emission Strength (25%), Validator Coverage (20%), Flow Momentum (20%), Capacity Utilization (10%). Higher = safer.</p>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "14px 20px", textAlign: "center" }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Network Avg</div>
          <div style={{ color: avgScore >= 60 ? "#00d4aa" : "#ffaa00", fontSize: "28px", fontWeight: 700 }}>{avgScore}</div>
        </div>
        <div style={{ background: "#00d4aa10", border: "1px solid #00d4aa30", borderRadius: "8px", padding: "14px 20px", textAlign: "center" }}>
          <div style={{ color: "#00d4aa", fontSize: "20px", fontWeight: 700 }}>{lowRisk}</div>
          <div style={{ color: "#555566", fontSize: "10px" }}>Low Risk</div>
        </div>
        <div style={{ background: "#4488ff10", border: "1px solid #4488ff30", borderRadius: "8px", padding: "14px 20px", textAlign: "center" }}>
          <div style={{ color: "#4488ff", fontSize: "20px", fontWeight: 700 }}>{moderate}</div>
          <div style={{ color: "#555566", fontSize: "10px" }}>Moderate</div>
        </div>
        <div style={{ background: "#ffaa0010", border: "1px solid #ffaa0030", borderRadius: "8px", padding: "14px 20px", textAlign: "center" }}>
          <div style={{ color: "#ffaa00", fontSize: "20px", fontWeight: 700 }}>{elevated}</div>
          <div style={{ color: "#555566", fontSize: "10px" }}>Elevated</div>
        </div>
        <div style={{ background: "#ff446610", border: "1px solid #ff446630", borderRadius: "8px", padding: "14px 20px", textAlign: "center" }}>
          <div style={{ color: "#ff4466", fontSize: "20px", fontWeight: 700 }}>{highRisk}</div>
          <div style={{ color: "#555566", fontSize: "10px" }}>High Risk</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#8888a0", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>All Subnets</span>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={function() { setSortBy("score"); }} style={{ background: sortBy === "score" ? "#00d4aa" : "#1e1e2e", color: sortBy === "score" ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "3px 8px", fontSize: "10px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Safest First</button>
              <button onClick={function() { setSortBy("risk"); }} style={{ background: sortBy === "risk" ? "#ff4466" : "#1e1e2e", color: sortBy === "risk" ? "#ffffff" : "#8888a0", border: "none", borderRadius: "4px", padding: "3px 8px", fontSize: "10px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Riskiest First</button>
            </div>
          </div>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {scored.map(function(item) {
              var isSelected = selectedSubnet === item.subnet.netuid;
              return (
                <div key={item.subnet.netuid} onClick={function() { setSelectedSubnet(isSelected ? null : item.subnet.netuid); }} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderBottom: "1px solid #1e1e2e", cursor: "pointer", background: isSelected ? "#1a1a25" : "transparent", borderRadius: "4px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: item.risk.color + "20", border: "2px solid " + item.risk.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: item.risk.color, fontSize: "12px", fontWeight: 700 }}>{item.risk.overall}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#e8e8f0", fontSize: "12px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.subnet.name}</span>
                      <span style={{ color: item.risk.color, fontSize: "10px", fontWeight: 600, flexShrink: 0, marginLeft: "8px" }}>{item.risk.label}</span>
                    </div>
                    <div style={{ background: "#1e1e2e", borderRadius: "2px", height: "4px", marginTop: "4px", overflow: "hidden" }}>
                      <div style={{ width: item.risk.overall + "%", height: "100%", background: item.risk.color, borderRadius: "2px" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selected && (
          <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <div style={{ color: "#e8e8f0", fontSize: "18px", fontWeight: 700 }}>{selected.subnet.name}</div>
                <div style={{ color: "#555566", fontSize: "11px" }}>SN{selected.subnet.netuid}</div>
              </div>
              <RiskGauge score={selected.risk.overall} color={selected.risk.color} label={selected.risk.label} />
            </div>
            <div style={{ color: selected.risk.color, fontSize: "14px", fontWeight: 700, marginBottom: "16px", padding: "8px 12px", background: selected.risk.color + "15", borderRadius: "6px", textAlign: "center" }}>{selected.risk.label} — Score {selected.risk.overall}/100</div>
            <ScoreBar label="Miner Diversity" score={selected.risk.minerDiversity} weight="25%" />
            <ScoreBar label="Emission Strength" score={selected.risk.emissionStrength} weight="25%" />
            <ScoreBar label="Validator Coverage" score={selected.risk.validatorCoverage} weight="20%" />
            <ScoreBar label="Flow Momentum" score={selected.risk.flowMomentum} weight="20%" />
            <ScoreBar label="Capacity Utilization" score={selected.risk.capacityUtilization} weight="10%" />
            <div style={{ marginTop: "12px", padding: "10px", background: "#12121a", borderRadius: "4px" }}>
              <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Quick Stats</div>
              <div style={{ color: "#8888a0", fontSize: "11px", lineHeight: 1.8 }}>
                Miners: {selected.subnet.miners} | Validators: {selected.subnet.validators} | Emission: {selected.subnet.emission.toFixed(2)}% | Flow: {selected.subnet.taoFlow > 0 ? "+" : ""}{(selected.subnet.taoFlow / 1000).toFixed(0)}K TAO | Capacity: {selected.subnet.maxNeurons > 0 ? Math.round(selected.subnet.neurons / selected.subnet.maxNeurons * 100) : 0}%
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "16px", padding: "12px", background: "#1a1a25", borderRadius: "6px" }}>
        <div style={{ color: "#8888a0", fontSize: "11px", fontWeight: 600, marginBottom: "6px" }}>Methodology</div>
        <div style={{ color: "#555566", fontSize: "11px", lineHeight: 1.6 }}>
          The composite score weights five factors: Miner Diversity (25%) measures decentralization of AI work production. Emission Strength (25%) reflects the subnet's share of network rewards. Validator Coverage (20%) evaluates consensus reliability. Flow Momentum (20%) tracks whether smart money is entering or exiting. Capacity Utilization (10%) shows how full the subnet is relative to its maximum neuron slots. Higher scores indicate lower investment risk. This is not financial advice.
        </div>
      </div>
    </div>
  );
}