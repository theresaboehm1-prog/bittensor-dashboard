"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

type SubnetPool = {
  netuid: number;
  name: string;
  emission: number;
  taoReserve: number;
  alphaReserve: number;
  currentPrice: number;
};

function simulateSwap(taoIn: number, taoReserve: number, alphaReserve: number) {
  if (taoIn <= 0 || taoReserve <= 0 || alphaReserve <= 0) {
    return { alphaOut: 0, newPrice: taoReserve > 0 && alphaReserve > 0 ? taoReserve / alphaReserve : 0, priceImpact: 0, effectivePrice: 0 };
  }
  var k = taoReserve * alphaReserve;
  var newTaoReserve = taoReserve + taoIn;
  var newAlphaReserve = k / newTaoReserve;
  var alphaOut = alphaReserve - newAlphaReserve;
  var oldPrice = taoReserve / alphaReserve;
  var newPrice = newTaoReserve / newAlphaReserve;
  var priceImpact = ((newPrice - oldPrice) / oldPrice) * 100;
  var effectivePrice = taoIn / alphaOut;
  return { alphaOut: alphaOut, newPrice: newPrice, priceImpact: priceImpact, effectivePrice: effectivePrice };
}

function generateBondingCurve(taoReserve: number, alphaReserve: number, swapAmount: number) {
  var k = taoReserve * alphaReserve;
  var points: { taoIn: number; price: number }[] = [];
  var maxSwap = Math.max(taoReserve * 0.5, swapAmount * 3);
  for (var i = 0; i <= 50; i++) {
    var taoIn = (i / 50) * maxSwap;
    var newTao = taoReserve + taoIn;
    var newAlpha = k / newTao;
    var price = newTao / newAlpha;
    points.push({ taoIn: Math.round(taoIn * 100) / 100, price: Math.round(price * 10000) / 10000 });
  }
  return points;
}

export default function SwapSimulator({ subnets }: { subnets: SubnetPool[] }) {
  var [selectedNet, setSelectedNet] = useState(subnets.length > 0 ? subnets[0].netuid : 0);
  var [taoInput, setTaoInput] = useState(10);
  var [showAdvanced, setShowAdvanced] = useState(false);

  var pool = subnets.find(function(s) { return s.netuid === selectedNet; }) || subnets[0];

  var swap = useMemo(function() {
    if (!pool) return { alphaOut: 0, newPrice: 0, priceImpact: 0, effectivePrice: 0 };
    return simulateSwap(taoInput, pool.taoReserve, pool.alphaReserve);
  }, [taoInput, pool]);

  var curveData = useMemo(function() {
    if (!pool) return [];
    return generateBondingCurve(pool.taoReserve, pool.alphaReserve, taoInput);
  }, [pool, taoInput]);

  var impactColor = swap.priceImpact < 1 ? "#00d4aa" : swap.priceImpact < 5 ? "#ffaa00" : "#ff4466";
  var impactLabel = swap.priceImpact < 1 ? "Low Impact" : swap.priceImpact < 5 ? "Moderate Impact" : "High Impact";

  if (!pool) {
    return (
      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
        <div style={{ color: "#555566", textAlign: "center", padding: "40px" }}>No subnet data available</div>
      </div>
    );
  }

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Alpha Token Swap Simulator</h2>
        <p style={{ color: "#555566", fontSize: "11px" }}>Simulates constant-product AMM (x * y = k) used by Dynamic TAO for subnet alpha tokens</p>
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
        <div style={{ flex: "1 1 250px" }}>
          <label style={{ color: "#8888a0", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>Select Subnet</label>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {subnets.slice(0, 12).map(function(s) {
              var isActive = s.netuid === selectedNet;
              return (
                <button key={s.netuid} onClick={function() { setSelectedNet(s.netuid); }} style={{ background: isActive ? "#00d4aa" : "#1e1e2e", color: isActive ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 10px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{s.name}</button>
              );
            })}
          </div>
        </div>
        <div style={{ flex: "0 0 200px" }}>
          <label style={{ color: "#8888a0", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>TAO to Swap</label>
          <input type="number" value={taoInput} onChange={function(e) { setTaoInput(Math.max(0, Number(e.target.value))); }} style={{ background: "#1e1e2e", border: "1px solid #2a2a3a", borderRadius: "6px", color: "#00d4aa", padding: "10px 14px", fontSize: "18px", fontWeight: 700, fontFamily: "inherit", width: "100%", textAlign: "right" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", textAlign: "center", borderTop: "3px solid #00d4aa" }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>You Receive</div>
          <div style={{ color: "#00d4aa", fontSize: "24px", fontWeight: 700 }}>{swap.alphaOut.toFixed(2)}</div>
          <div style={{ color: "#555566", fontSize: "11px" }}>{pool.name} alpha tokens</div>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", textAlign: "center", borderTop: "3px solid #4488ff" }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Effective Price</div>
          <div style={{ color: "#4488ff", fontSize: "24px", fontWeight: 700 }}>{swap.effectivePrice > 0 ? swap.effectivePrice.toFixed(4) : "0"}</div>
          <div style={{ color: "#555566", fontSize: "11px" }}>TAO per alpha token</div>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", textAlign: "center", borderTop: "3px solid " + impactColor }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Price Impact</div>
          <div style={{ color: impactColor, fontSize: "24px", fontWeight: 700 }}>{swap.priceImpact.toFixed(2)}%</div>
          <div style={{ color: impactColor, fontSize: "11px" }}>{impactLabel}</div>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", textAlign: "center", borderTop: "3px solid #ffaa00" }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>New Pool Price</div>
          <div style={{ color: "#ffaa00", fontSize: "24px", fontWeight: 700 }}>{swap.newPrice.toFixed(4)}</div>
          <div style={{ color: "#555566", fontSize: "11px" }}>was {pool.currentPrice.toFixed(4)}</div>
        </div>
      </div>

      <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div style={{ color: "#8888a0", fontSize: "12px", fontWeight: 600 }}>Price Impact Curve — {pool.name}</div>
          <div style={{ color: "#555566", fontSize: "10px" }}>x * y = k (constant product)</div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={curveData}>
            <defs>
              <linearGradient id="swapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4488ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4488ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="taoIn" tick={{ fill: "#555566", fontSize: 10 }} axisLine={{ stroke: "#1e1e2e" }} tickLine={false} />
            <YAxis dataKey="price" tick={{ fill: "#555566", fontSize: 10 }} axisLine={{ stroke: "#1e1e2e" }} tickLine={false} width={55} domain={["dataMin", "dataMax"]} />
            <Tooltip contentStyle={{ background: "#1a1a25", border: "1px solid #1e1e2e", borderRadius: "6px", color: "#e8e8f0", fontSize: "12px", fontFamily: "inherit" }} formatter={function(value: any) { return [Number(value).toFixed(4), "Price"]; }} labelFormatter={function(label: any) { return "Swap: " + label + " TAO"; }} />
            <ReferenceLine x={taoInput} stroke="#00d4aa" strokeDasharray="3 3" />
            <Area type="monotone" dataKey="price" stroke="#4488ff" strokeWidth={2} fill="url(#swapGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button onClick={function() { setShowAdvanced(!showAdvanced); }} style={{ background: "#1e1e2e", border: "none", borderRadius: "4px", color: "#8888a0", padding: "6px 12px", fontSize: "11px", cursor: "pointer", fontFamily: "inherit", marginBottom: showAdvanced ? "12px" : "0" }}>
        {showAdvanced ? "Hide" : "Show"} Pool Mathematics
      </button>

      {showAdvanced && (
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginTop: "8px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
              <span style={{ color: "#8888a0", fontSize: "12px" }}>TAO Reserve</span>
              <span style={{ color: "#e8e8f0", fontSize: "12px", fontWeight: 600 }}>{pool.taoReserve.toFixed(2)} TAO</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
              <span style={{ color: "#8888a0", fontSize: "12px" }}>Alpha Reserve</span>
              <span style={{ color: "#e8e8f0", fontSize: "12px", fontWeight: 600 }}>{pool.alphaReserve.toFixed(2)} alpha</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
              <span style={{ color: "#8888a0", fontSize: "12px" }}>Constant Product (k)</span>
              <span style={{ color: "#e8e8f0", fontSize: "12px", fontWeight: 600 }}>{(pool.taoReserve * pool.alphaReserve).toExponential(4)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1e1e2e" }}>
              <span style={{ color: "#8888a0", fontSize: "12px" }}>Spot Price</span>
              <span style={{ color: "#e8e8f0", fontSize: "12px", fontWeight: 600 }}>{pool.currentPrice.toFixed(6)} TAO/alpha</span>
            </div>
          </div>
          <div style={{ marginTop: "12px", padding: "10px", background: "#12121a", borderRadius: "4px" }}>
            <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>AMM Formula</div>
            <div style={{ color: "#4488ff", fontSize: "13px", fontFamily: "monospace" }}>TAO_reserve * Alpha_reserve = k (constant)</div>
            <div style={{ color: "#8888a0", fontSize: "11px", marginTop: "4px" }}>Swap {taoInput} TAO: ({pool.taoReserve.toFixed(0)} + {taoInput}) * new_alpha = {(pool.taoReserve * pool.alphaReserve).toExponential(4)}</div>
            <div style={{ color: "#00d4aa", fontSize: "11px", marginTop: "2px" }}>Result: receive {swap.alphaOut.toFixed(2)} alpha, price moves {pool.currentPrice.toFixed(4)} to {swap.newPrice.toFixed(4)}</div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "12px", color: "#555566", fontSize: "10px", fontStyle: "italic" }}>* Pool reserves estimated from emission share. Demonstrates the constant-product bonding curve mechanism used by Dynamic TAO.</div>
    </div>
  );
}
