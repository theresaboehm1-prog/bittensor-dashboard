"use client";

import { useState } from "react";

export default function StakingCalc({ taoPrice }: { taoPrice: number }) {
  var [stakeAmount, setStakeAmount] = useState(100);
  var [validatorTake, setValidatorTake] = useState(10);

  var dailyEmission = 3600;
  var totalStaked = 7330000;
  var stakeShare = stakeAmount / totalStaked;
  var dailyReward = dailyEmission * stakeShare * (1 - validatorTake / 100);
  var weeklyReward = dailyReward * 7;
  var monthlyReward = dailyReward * 30;
  var yearlyReward = dailyReward * 365;
  var apr = stakeAmount > 0 ? (yearlyReward / stakeAmount) * 100 : 0;

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>TAO Staking Calculator</h2>
      <p style={{ color: "#555566", fontSize: "11px", marginBottom: "20px" }}>Estimate your staking returns based on current network parameters</p>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "24px" }}>
        <div style={{ flex: "1 1 200px" }}>
          <label style={{ color: "#8888a0", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>Stake Amount (TAO)</label>
          <input type="number" value={stakeAmount} onChange={function(e) { setStakeAmount(Math.max(0, Number(e.target.value))); }} style={{ background: "#1e1e2e", border: "1px solid #2a2a3a", borderRadius: "6px", color: "#00d4aa", padding: "10px 14px", fontSize: "18px", fontWeight: 700, fontFamily: "inherit", width: "100%", textAlign: "right" }} />
          <div style={{ color: "#555566", fontSize: "11px", marginTop: "4px", textAlign: "right" }}>= ${(stakeAmount * taoPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>
        <div style={{ flex: "1 1 200px" }}>
          <label style={{ color: "#8888a0", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "6px" }}>Validator Take (%)</label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input type="range" min={0} max={20} value={validatorTake} onChange={function(e) { setValidatorTake(Number(e.target.value)); }} style={{ flex: 1, accentColor: "#4488ff" }} />
            <span style={{ color: "#4488ff", fontSize: "18px", fontWeight: 700, width: "50px", textAlign: "right" }}>{validatorTake}%</span>
          </div>
          <div style={{ color: "#555566", fontSize: "11px", marginTop: "4px" }}>Fee charged by validator for staking services</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "16px" }}>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", textAlign: "center" }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Daily</div>
          <div style={{ color: "#00d4aa", fontSize: "20px", fontWeight: 700 }}>{dailyReward.toFixed(4)} τ</div>
          <div style={{ color: "#555566", fontSize: "11px" }}>${(dailyReward * taoPrice).toFixed(2)}</div>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", textAlign: "center" }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Weekly</div>
          <div style={{ color: "#4488ff", fontSize: "20px", fontWeight: 700 }}>{weeklyReward.toFixed(3)} τ</div>
          <div style={{ color: "#555566", fontSize: "11px" }}>${(weeklyReward * taoPrice).toFixed(2)}</div>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", textAlign: "center" }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Monthly</div>
          <div style={{ color: "#ffaa00", fontSize: "20px", fontWeight: 700 }}>{monthlyReward.toFixed(2)} τ</div>
          <div style={{ color: "#555566", fontSize: "11px" }}>${(monthlyReward * taoPrice).toFixed(0)}</div>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", textAlign: "center" }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Yearly</div>
          <div style={{ color: "#ff6b9d", fontSize: "20px", fontWeight: 700 }}>{yearlyReward.toFixed(2)} τ</div>
          <div style={{ color: "#555566", fontSize: "11px" }}>${(yearlyReward * taoPrice).toFixed(0)}</div>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #00d4aa15, #4488ff15)", border: "1px solid #00d4aa30", borderRadius: "8px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Estimated APR</div>
          <div style={{ color: "#00d4aa", fontSize: "32px", fontWeight: 700 }}>{apr.toFixed(2)}%</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>After 1 Year</div>
          <div style={{ color: "#e8e8f0", fontSize: "18px", fontWeight: 700 }}>{(stakeAmount + yearlyReward).toFixed(2)} τ</div>
          <div style={{ color: "#555566", fontSize: "11px" }}>${((stakeAmount + yearlyReward) * taoPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>
      </div>

      <div style={{ marginTop: "12px", color: "#555566", fontSize: "10px", fontStyle: "italic" }}>* Estimates based on current daily emission of ~3,600 TAO (post-halving) and ~7.33M total staked TAO. Actual returns vary with network conditions.</div>
    </div>
  );
}
