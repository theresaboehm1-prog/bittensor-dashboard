"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type PricePoint = { date: string; price: number; timestamp: number };

export default function PriceChart() {
  const [data, setData] = useState<PricePoint[]>([]);
  const [range, setRange] = useState<"7d" | "30d" | "90d" | "365d">("30d");
  const [loading, setLoading] = useState(true);

  const limitMap = { "7d": 7, "30d": 30, "90d": 90, "365d": 365 };

    useEffect(() => {
    setLoading(true);
    // API returns 15-min snapshots — need to fetch enough to cover the full window
    // Then downsample to ~30-60 visible points
    const pointsPerDay = 96; // 24h × 4 (15-min intervals)
    const days = limitMap[range];
    const fetchLimit = Math.min(days * pointsPerDay, 1000);

    fetch(`/api/taostats/price/history/v1?asset=tao&limit=${fetchLimit}`)
      .then((r) => r.json())
      .then((res) => {
        const rawPoints = res.data || [];
        const allPoints: PricePoint[] = rawPoints
          .map((d: any) => {
            const ts = new Date(d.created_at).getTime();
            return {
              date: new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              price: parseFloat(d.price || "0"),
              timestamp: ts,
            };
          })
          .filter((p: PricePoint) => p.price > 0 && !isNaN(p.timestamp))
          .sort((a: PricePoint, b: PricePoint) => a.timestamp - b.timestamp);

        // Downsample to ~60 points for clean chart
        const targetPoints = 60;
        const step = Math.max(1, Math.floor(allPoints.length / targetPoints));
        const sampled = allPoints.filter((_, i) => i % step === 0);

        // Always include the last point
        if (allPoints.length > 0 && sampled[sampled.length - 1] !== allPoints[allPoints.length - 1]) {
          sampled.push(allPoints[allPoints.length - 1]);
        }

        setData(sampled);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Price chart fetch error:", err);
        setLoading(false);
      });
  }, [range]);

  const prices = data.map((d) => d.price);
  const minPrice = prices.length > 0 ? Math.floor(Math.min(...prices) * 0.97) : 0;
  const maxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices) * 1.03) : 500;
  const firstPrice = prices.length > 0 ? prices[0] : 0;
  const lastPrice = prices.length > 0 ? prices[prices.length - 1] : 0;
  const change = firstPrice > 0 ? ((lastPrice - firstPrice) / firstPrice) * 100 : 0;
  const changeColor = change >= 0 ? "#00d4aa" : "#ff4466";

  return (
    <div
      style={{
        background: "#12121a",
        border: "1px solid #1e1e2e",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "32px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: 0 }}>
            TAO Price History
          </h2>
          {!loading && data.length > 0 && (
            <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#e8e8f0", fontSize: "20px", fontWeight: 700 }}>${lastPrice.toFixed(2)}</span>
              <span style={{ color: changeColor, fontSize: "13px", fontWeight: 600 }}>{change >= 0 ? "+" : ""}{change.toFixed(2)}% ({range})</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {(["7d", "30d", "90d", "365d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                background: range === r ? "#00d4aa" : "#1e1e2e",
                color: range === r ? "#0a0a0f" : "#8888a0",
                border: "none",
                borderRadius: "4px",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#555566" }}>
          Loading price data...
        </div>
      ) : data.length === 0 ? (
        <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#555566" }}>
          No price data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={changeColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={changeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: "#555566", fontSize: 11 }}
              axisLine={{ stroke: "#1e1e2e" }}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={60}
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              tick={{ fill: "#555566", fontSize: 11 }}
              axisLine={{ stroke: "#1e1e2e" }}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
              width={60}
            />
            <Tooltip
              contentStyle={{
                background: "#1a1a25",
                border: "1px solid #1e1e2e",
                borderRadius: "6px",
                color: "#e8e8f0",
                fontSize: "13px",
                fontFamily: "inherit",
              }}
              formatter={(value: any) => [`$${Number(value).toFixed(2)}`, "TAO"]}
              labelStyle={{ color: "#8888a0" }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={changeColor}
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}