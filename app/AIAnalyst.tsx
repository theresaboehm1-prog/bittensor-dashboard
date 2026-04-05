"use client";

import { useState } from "react";

type SubnetData = {
  netuid: number;
  name: string;
  emission: string;
  miners: number;
  validators: number;
};

export default function AIAnalyst({ subnetData, taoPrice, networkStats }: { subnetData: SubnetData[]; taoPrice: number; networkStats: any }) {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  function runAnalysis() {
    setLoading(true);
    setAnalysis("");
    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subnetData: subnetData, taoPrice: taoPrice, networkStats: networkStats }),
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.analysis) {
          setAnalysis(data.analysis);
        } else {
          setAnalysis("Analysis unavailable. Please try again.");
        }
        setLoading(false);
        setHasRun(true);
      })
      .catch(function() {
        setAnalysis("Failed to connect to AI. Please try again.");
        setLoading(false);
        setHasRun(true);
      });
  }

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: 0 }}>AI Network Analyst</h2>
          <p style={{ color: "#555566", fontSize: "11px", marginTop: "4px" }}>Powered by Claude — analyzes live Bittensor data</p>
        </div>
        <button
          onClick={runAnalysis}
          disabled={loading}
          style={{
            background: loading ? "#1e1e2e" : "linear-gradient(135deg, #00d4aa, #4488ff)",
            color: loading ? "#555566" : "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit",
          }}
        >
          {loading ? "Analyzing..." : hasRun ? "Re-analyze" : "Run AI Analysis"}
        </button>
      </div>

      {loading && (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", marginBottom: "8px" }}>Analyzing {subnetData.length} subnets...</div>
          <div style={{ color: "#555566", fontSize: "12px" }}>Claude is reviewing emission distributions, miner ratios, and network patterns</div>
        </div>
      )}

      {analysis && !loading && (
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span style={{ color: "#00d4aa", fontSize: "13px", fontWeight: 600 }}>Claude Analysis</span>
            <span style={{ color: "#555566", fontSize: "11px" }}>Based on live data</span>
          </div>
          {analysis.split("\n\n").map(function(paragraph, i) {
            return (
              <p key={i} style={{ color: "#e8e8f0", fontSize: "13px", lineHeight: 1.7, marginBottom: "12px" }}>
                {paragraph}
              </p>
            );
          })}
        </div>
      )}

      {!analysis && !loading && (
        <div style={{ padding: "30px", textAlign: "center", color: "#555566", fontSize: "13px" }}>
          Click "Run AI Analysis" to generate insights from live network data
        </div>
      )}
    </div>
  );
}
