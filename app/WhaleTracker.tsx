"use client";

import { useState, useEffect } from "react";

type Whale = {
  rank: number;
  hotkey_name: string;
  coldkey: string;
  balance_tao: number;
  netuid: number;
};

export default function WhaleTracker({ taoPrice }: { taoPrice: number }) {
  var [whales, setWhales] = useState<Whale[]>([]);
  var [loading, setLoading] = useState(true);

  useEffect(function() {
    fetch("/api/taostats/dtao/stake_balance/latest/v1?per_page=25&netuid=0")
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var entries = (data.data || []).map(function(w: any, i: number) {
          return {
            rank: w.subnet_rank || i + 1,
            hotkey_name: w.hotkey_name || "Unknown",
            coldkey: w.coldkey?.ss58 || "Unknown",
            balance_tao: Number(w.balance_as_tao || "0") / 1e9,
            netuid: w.netuid,
          };
        });
        setWhales(entries);
                if (typeof window !== "undefined") {
          (window as any).__whaleData = entries.map(function(w: any) { return { name: w.hotkey_name, balance: w.balance_tao >= 1000 ? (w.balance_tao / 1000).toFixed(0) + "K" : w.balance_tao.toFixed(0), usd: (w.balance_tao * taoPrice / 1000).toFixed(0) + "K" }; });
        }
        setLoading(false);
      })
      .catch(function() {
        setLoading(false);
      });
  }, []);

  var totalWhaleStake = whales.reduce(function(sum, w) { return sum + w.balance_tao; }, 0);
  var maxBalance = whales.length > 0 ? whales[0].balance_tao : 1;

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Whale Tracker</h2>
          <p style={{ color: "#555566", fontSize: "11px" }}>Largest TAO stakers on the root network (SN0)</p>
        </div>
        {!loading && (
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Top 20 Combined</div>
            <div style={{ color: "#ffaa00", fontSize: "20px", fontWeight: 700 }}>{(totalWhaleStake / 1e6).toFixed(2)}M τ</div>
            <div style={{ color: "#555566", fontSize: "11px" }}>${(totalWhaleStake * taoPrice / 1e6).toFixed(0)}M USD</div>
          </div>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#555566" }}>Loading whale data...</div>
      )}

      {!loading && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e2e" }}>
                <th style={{ padding: "8px 12px", textAlign: "left", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>#</th>
                <th style={{ padding: "8px 12px", textAlign: "left", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Entity</th>
                <th style={{ padding: "8px 12px", textAlign: "left", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Wallet</th>
                <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Staked TAO</th>
                <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>USD Value</th>
                <th style={{ padding: "8px 12px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Share</th>
              </tr>
            </thead>
            <tbody>
              {whales.map(function(w, i) {
                var share = totalWhaleStake > 0 ? (w.balance_tao / totalWhaleStake * 100) : 0;
                var barWidth = maxBalance > 0 ? (w.balance_tao / maxBalance * 100) : 0;
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #1e1e2e" }}>
                    <td style={{ padding: "10px 12px", color: "#555566", fontSize: "13px" }}>
                      {i < 3 ? (
                        <span style={{ fontSize: "16px" }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                      ) : (
                        i + 1
                      )}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ color: "#e8e8f0", fontWeight: 600, fontSize: "13px" }}>{w.hotkey_name}</span>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ color: "#555566", fontSize: "11px", fontFamily: "monospace" }}>{w.coldkey.slice(0, 8)}...{w.coldkey.slice(-6)}</span>
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "right" }}>
                      <div style={{ color: "#00d4aa", fontWeight: 600, fontSize: "13px" }}>{w.balance_tao >= 1000000 ? (w.balance_tao / 1e6).toFixed(2) + "M" : w.balance_tao >= 1000 ? (w.balance_tao / 1e3).toFixed(1) + "K" : w.balance_tao.toFixed(1)} τ</div>
                      <div style={{ background: "#1e1e2e", borderRadius: "2px", height: "4px", marginTop: "4px", width: "100px", marginLeft: "auto" }}>
                        <div style={{ width: barWidth + "%", height: "100%", background: "#00d4aa", borderRadius: "2px" }} />
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "#8888a0", fontSize: "13px" }}>
                      ${(w.balance_tao * taoPrice >= 1000000) ? (w.balance_tao * taoPrice / 1e6).toFixed(1) + "M" : (w.balance_tao * taoPrice / 1e3).toFixed(0) + "K"}
                    </td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: "#ffaa00", fontSize: "12px", fontWeight: 600 }}>{share.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
