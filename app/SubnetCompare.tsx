"use client";

import { useState } from "react";

type Subnet = {
  netuid: number;
  name: string;
  emission: number;
  miners: number;
  validators: number;
  neurons: number;
  regAllowed: boolean;
};

var COLORS = ["#00d4aa", "#4488ff", "#ffaa00"];

function MetricBar({ label, values, maxVal }: { label: string; values: { name: string; value: number; color: string }[]; maxVal: number }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ color: "#8888a0", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{label}</div>
      {values.map(function(v, i) {
        var width = maxVal > 0 ? (v.value / maxVal) * 100 : 0;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <div style={{ width: "120px", fontSize: "12px", color: v.color, fontWeight: 600, flexShrink: 0 }}>{v.name}</div>
            <div style={{ flex: 1, background: "#1e1e2e", borderRadius: "4px", height: "24px", overflow: "hidden" }}>
              <div style={{ width: width + "%", height: "100%", background: v.color, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "8px", minWidth: "40px" }}>
                <span style={{ color: "#0a0a0f", fontSize: "11px", fontWeight: 700 }}>{typeof v.value === "number" && v.value % 1 !== 0 ? v.value.toFixed(2) : v.value}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SubnetCompare({ subnets }: { subnets: Subnet[] }) {
  var [selected, setSelected] = useState<number[]>([]);

  function toggleSubnet(netuid: number) {
    if (selected.includes(netuid)) {
      setSelected(selected.filter(function(id) { return id !== netuid; }));
    } else if (selected.length < 3) {
      setSelected(selected.concat([netuid]));
    }
  }

  var selectedSubnets = selected.map(function(id) {
    return subnets.find(function(s) { return s.netuid === id; });
  }).filter(Boolean) as Subnet[];

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Subnet Comparison Tool</h2>
        <p style={{ color: "#555566", fontSize: "11px" }}>Select up to 3 subnets to compare side by side</p>
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
        {subnets.slice(0, 20).map(function(s) {
          var isSelected = selected.includes(s.netuid);
          var selIndex = selected.indexOf(s.netuid);
          return (
            <button key={s.netuid} onClick={function() { toggleSubnet(s.netuid); }} style={{ background: isSelected ? COLORS[selIndex] : "#1e1e2e", color: isSelected ? "#0a0a0f" : "#8888a0", border: isSelected ? "2px solid " + COLORS[selIndex] : "2px solid transparent", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: selected.length >= 3 && !isSelected ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: selected.length >= 3 && !isSelected ? 0.4 : 1 }}>{s.name}</button>
          );
        })}
      </div>
      {selectedSubnets.length === 0 && (
        <div style={{ textAlign: "center", padding: "30px", color: "#555566", fontSize: "13px" }}>Click subnet buttons above to start comparing</div>
      )}
      {selectedSubnets.length > 0 && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(" + selectedSubnets.length + ", 1fr)", gap: "12px", marginBottom: "24px" }}>
            {selectedSubnets.map(function(s, i) {
              return (
                <div key={s.netuid} style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", borderTop: "3px solid " + COLORS[i] }}>
                  <div style={{ color: COLORS[i], fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>{s.name}</div>
                  <div style={{ color: "#555566", fontSize: "11px" }}>SN{s.netuid}</div>
                  <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div>
                      <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase" }}>Emission</div>
                      <div style={{ color: "#e8e8f0", fontSize: "16px", fontWeight: 700 }}>{s.emission.toFixed(2)}%</div>
                    </div>
                    <div>
                      <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase" }}>Miners</div>
                      <div style={{ color: "#e8e8f0", fontSize: "16px", fontWeight: 700 }}>{s.miners}</div>
                    </div>
                    <div>
                      <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase" }}>Validators</div>
                      <div style={{ color: "#e8e8f0", fontSize: "16px", fontWeight: 700 }}>{s.validators}</div>
                    </div>
                    <div>
                      <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase" }}>Registration</div>
                      <div style={{ color: s.regAllowed ? "#00d4aa" : "#ff4466", fontSize: "16px", fontWeight: 700 }}>{s.regAllowed ? "Open" : "Closed"}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <MetricBar label="Emission Share (%)" values={selectedSubnets.map(function(s, i) { return { name: s.name, value: s.emission, color: COLORS[i] }; })} maxVal={Math.max.apply(null, selectedSubnets.map(function(s) { return s.emission; })) * 1.2} />
          <MetricBar label="Active Miners" values={selectedSubnets.map(function(s, i) { return { name: s.name, value: s.miners, color: COLORS[i] }; })} maxVal={Math.max.apply(null, selectedSubnets.map(function(s) { return s.miners; })) * 1.2} />
          <MetricBar label="Active Validators" values={selectedSubnets.map(function(s, i) { return { name: s.name, value: s.validators, color: COLORS[i] }; })} maxVal={Math.max.apply(null, selectedSubnets.map(function(s) { return s.validators; })) * 1.2} />
          <MetricBar label="Total Neurons" values={selectedSubnets.map(function(s, i) { return { name: s.name, value: s.neurons, color: COLORS[i] }; })} maxVal={Math.max.apply(null, selectedSubnets.map(function(s) { return s.neurons; })) * 1.2} />
        </div>
      )}
    </div>
  );
}
