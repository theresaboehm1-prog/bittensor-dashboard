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

type PricePoint = { date: string; price: number };

export default function PriceChart() {
  const [data, setData] = useState<PricePoint[]>([]);
  const [range, setRange] = useState("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/taostats/price/history/v1?asset=tao&range=${range}`)
      .then((r) => r.json())
      .then((res) => {
        const points = (res.data || [])
          .map((d: any) => ({
            date: new Date(d.timestamp || d.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "2-digit",
            }),
            price: parseFloat(d.close || d.price || "0"),
          }))
          .reverse();
        setData(points);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [range]);

  const minPrice = data.length > 0 ? Math.floor(Math.min(...data.map((d) => d.price)) * 0.95) : 0;
  const maxPrice = data.length > 0 ? Math.ceil(Math.max(...data.map((d) => d.price)) * 1.05) : 500;

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: 0 }}>
          TAO Price History
        </h2>
        <div style={{ display: "flex", gap: "8px" }}>
          {["7d", "30d", "90d", "365d"].map((r) => (
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
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: "#555566", fontSize: 11 }}
              axisLine={{ stroke: "#1e1e2e" }}
              tickLine={false}
              interval="preserveStartEnd"
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
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00d4aa"
              strokeWidth={2}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
