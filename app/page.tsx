import PriceChart from "./PriceChart";
import { headers } from "next/headers";

const SUBNET_NAMES: Record<number, string> = {
  0: "Root Network",
  1: "Apex (Macrocosmos)",
  2: "Omron",
  3: "MyShell",
  4: "Targon (Manifold)",
  5: "OpenKaito",
  6: "Nous Research",
  7: "Subvortex",
  8: "Taoshi",
  9: "Pretrain (Macrocosmos)",
  10: "Sturdy (DeFi)",
  11: "Dippy",
  12: "Horde",
  13: "Dataverse",
  14: "Palaidn",
  15: "de_val",
  16: "BitAgent",
  17: "Flavia (3Gen)",
  18: "Cortex.t",
  19: "Nineteen (Rayon)",
  20: "BitAgent Rizzo",
  21: "FileTAO",
  22: "Datura (Meta Search)",
  23: "NicheImage",
  24: "Omega Labs",
  25: "Protein Folding",
  26: "Intent (Alchemy)",
  27: "Compute (Neural Internet)",
  28: "Foundry S&P",
  29: "Coldint (3Gen)",
  30: "Bettensor",
  31: "NAS Chain",
  32: "It's AI",
  33: "Agentic",
  34: "Bitagent",
  35: "LogicNet",
  37: "Finetuning (Macrocosmos)",
  40: "Chunking",
  41: "Sportstensor",
  42: "Masa",
  44: "Score Vision",
  45: "Gen42",
  46: "Neural Condense",
  47: "Condense AI",
  52: "DOJO",
  56: "Gradients",
  64: "Chutes (Rayon)",
  75: "PatternX",
  119: "TaoTensor",
  120: "Hyperliquid TAO",
};

async function fetchTaostats(endpoint: string) {
  const url = `https://api.taostats.io/api/${endpoint}`;
  const res = await fetch(url, {
    headers: { Authorization: process.env.TAOSTATS_API_KEY || "" },
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

function formatTAO(raoString: string): string {
  const tao = Number(raoString) / 1e9;
  if (tao >= 1_000_000) return (tao / 1_000_000).toFixed(2) + "M";
  if (tao >= 1_000) return (tao / 1_000).toFixed(1) + "K";
  return tao.toFixed(2);
}

function formatUSD(value: number): string {
  if (value >= 1_000_000_000) return "$" + (value / 1_000_000_000).toFixed(2) + "B";
  if (value >= 1_000_000) return "$" + (value / 1_000_000).toFixed(2) + "M";
  if (value >= 1_000) return "$" + (value / 1_000).toFixed(1) + "K";
  return "$" + value.toFixed(2);
}

function KPICard({
  label,
  value,
  sub,
  color = "green",
}: {
  label: string;
  value: string;
  sub?: string;
  color?: "green" | "blue" | "yellow" | "red" | "white";
}) {
  const colorMap = {
    green: "#00d4aa",
    blue: "#4488ff",
    yellow: "#ffaa00",
    red: "#ff4466",
    white: "#e8e8f0",
  };
  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", flex: "1 1 200px", minWidth: "180px" }}>
      <div style={{ color: "#8888a0", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>{label}</div>
      <div style={{ color: colorMap[color], fontSize: "28px", fontWeight: 700, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ color: "#555566", fontSize: "12px", marginTop: "6px" }}>{sub}</div>}
    </div>
  );
}

function EmissionBar({ name, netuid, percent, maxPercent }: { name: string; netuid: number; percent: number; maxPercent: number }) {
  const width = maxPercent > 0 ? (percent / maxPercent) * 100 : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 0" }}>
      <div style={{ width: "160px", flexShrink: 0, fontSize: "12px", color: "#8888a0", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {name || `SN${netuid}`}
      </div>
      <div style={{ flex: 1, background: "#1e1e2e", borderRadius: "4px", height: "20px", overflow: "hidden" }}>
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            background: "linear-gradient(90deg, #00d4aa, #4488ff)",
            borderRadius: "4px",
            transition: "width 0.3s",
          }}
        />
      </div>
      <div style={{ width: "60px", flexShrink: 0, fontSize: "12px", color: "#00d4aa", fontWeight: 600, textAlign: "right" }}>
        {percent.toFixed(2)}%
      </div>
    </div>
  );
}

export default async function Dashboard() {
  const [statsRes, priceRes, subnetRes] = await Promise.all([
    fetchTaostats("stats/latest/v1"),
    fetchTaostats("price/latest/v1?asset=tao"),
    fetchTaostats("subnet/latest/v1?per_page=200"),
  ]);

  const stats = statsRes?.data?.[0];
  const price = priceRes?.data?.[0];
  const subnets = subnetRes?.data || [];

  const taoPrice = price ? parseFloat(price.close || price.price || "0") : 0;
  const totalIssued = stats ? Number(stats.issued) / 1e9 : 0;
  const totalStaked = stats ? Number(stats.staked) / 1e9 : 0;
  const marketCap = taoPrice * totalIssued;
  const stakePercent = totalIssued > 0 ? ((totalStaked / totalIssued) * 100).toFixed(1) : "0";
  const subnetCount = stats?.subnets || "—";
  const regCost = stats?.subnet_registration_cost ? (Number(stats.subnet_registration_cost) / 1e9).toFixed(1) : "—";

  const sortedSubnets = [...subnets]
    .filter((s: any) => s.netuid !== 0 && parseFloat(s.emission || "0") > 0)
    .sort((a: any, b: any) => parseFloat(b.emission || "0") - parseFloat(a.emission || "0"));

  const top15 = sortedSubnets.slice(0, 15);
  const top30 = sortedSubnets.slice(0, 30);
  const maxEmission = top15.length > 0 ? parseFloat(top15[0].emission) / 1e7 : 1;

  const totalMiners = subnets.reduce((sum: number, s: any) => sum + (s.active_miners || 0), 0);
  const totalValidators = subnets.reduce((sum: number, s: any) => sum + (s.active_validators || 0), 0);

  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#e8e8f0", margin: 0 }}>
            <span style={{ color: "#00d4aa" }}>◆</span> BITTENSOR SUBNET INTELLIGENCE
          </h1>
          <p style={{ color: "#555566", fontSize: "12px", marginTop: "4px" }}>Real-time network analytics • Powered by Taostats API</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Last Updated</div>
          <div style={{ color: "#8888a0", fontSize: "13px" }}>{now}</div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
        <KPICard label="TAO Price" value={taoPrice > 0 ? `$${taoPrice.toFixed(2)}` : "—"} sub={`Market Cap: ${marketCap > 0 ? formatUSD(marketCap) : "—"}`} color="green" />
        <KPICard label="Active Subnets" value={String(subnetCount)} sub="/ 128 max capacity" color="blue" />
        <KPICard label="Total Staked" value={totalStaked > 0 ? formatTAO(stats.staked) + " τ" : "—"} sub={`${stakePercent}% of supply`} color="yellow" />
        <KPICard label="Registration Cost" value={regCost !== "—" ? `${regCost} τ` : "—"} sub={regCost !== "—" ? `≈ $${(parseFloat(regCost) * taoPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : ""} color="red" />
      </div>

      {/* Secondary Stats */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
        <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px 20px", flex: "1 1 150px" }}>
          <span style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Circulating</span>
          <div style={{ color: "#e8e8f0", fontSize: "16px", fontWeight: 600, marginTop: "4px" }}>{totalIssued > 0 ? (totalIssued / 1e6).toFixed(2) + "M" : "—"} τ</div>
        </div>
        <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px 20px", flex: "1 1 150px" }}>
          <span style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Max Supply</span>
          <div style={{ color: "#e8e8f0", fontSize: "16px", fontWeight: 600, marginTop: "4px" }}>21.00M τ</div>
        </div>
        <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px 20px", flex: "1 1 150px" }}>
          <span style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Active Miners</span>
          <div style={{ color: "#00d4aa", fontSize: "16px", fontWeight: 600, marginTop: "4px" }}>{totalMiners.toLocaleString()}</div>
        </div>
        <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px 20px", flex: "1 1 150px" }}>
          <span style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Active Validators</span>
          <div style={{ color: "#4488ff", fontSize: "16px", fontWeight: 600, marginTop: "4px" }}>{totalValidators.toLocaleString()}</div>
        </div>
        <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px 20px", flex: "1 1 150px" }}>
          <span style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Accounts</span>
          <div style={{ color: "#e8e8f0", fontSize: "16px", fontWeight: 600, marginTop: "4px" }}>{stats?.accounts ? Number(stats.accounts).toLocaleString() : "—"}</div>
        </div>
        <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px 20px", flex: "1 1 150px" }}>
          <span style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Block</span>
          <div style={{ color: "#e8e8f0", fontSize: "16px", fontWeight: 600, marginTop: "4px" }}>#{stats?.block_number ? Number(stats.block_number).toLocaleString() : "—"}</div>
        </div>
      </div>

      <PriceChart />{/* Emission Chart */}
      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 16px 0" }}>Emission Distribution — Top 15 Subnets</h2>
        {top15.map((s: any) => (
          <EmissionBar
            key={s.netuid}
            name={SUBNET_NAMES[s.netuid] || `Subnet ${s.netuid}`}
            netuid={s.netuid}
            percent={parseFloat(s.emission) / 1e7}
            maxPercent={maxEmission}
          />
        ))}
      </div>

      {/* Subnet Table */}
      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e1e2e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: 0 }}>All Active Subnets</h2>
          <span style={{ color: "#555566", fontSize: "12px" }}>Showing top {top30.length} of {subnetCount}</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e1e2e" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>#</th>
                <th style={{ padding: "10px 16px", textAlign: "left", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>Subnet</th>
                <th style={{ padding: "10px 16px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>Emission</th>
                <th style={{ padding: "10px 16px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>Miners</th>
                <th style={{ padding: "10px 16px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>Validators</th>
                <th style={{ padding: "10px 16px", textAlign: "right", color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>Neurons</th>
              </tr>
            </thead>
            <tbody>
              {top30.map((s: any, i: number) => (
                <tr key={s.netuid} style={{ borderBottom: "1px solid #1e1e2e" }}>
                  <td style={{ padding: "12px 16px", color: "#555566", fontSize: "13px" }}>{i + 1}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ color: "#e8e8f0", fontWeight: 600 }}>{SUBNET_NAMES[s.netuid] || `Subnet ${s.netuid}`}</span>
                    <span style={{ color: "#555566", marginLeft: "8px", fontSize: "12px" }}>SN{s.netuid}</span>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#00d4aa", textAlign: "right", fontWeight: 600 }}>
                    {(parseFloat(s.emission) / 1e7).toFixed(2)}%
                  </td>
                  <td style={{ padding: "12px 16px", color: "#8888a0", textAlign: "right" }}>{s.active_miners || 0}</td>
                  <td style={{ padding: "12px 16px", color: "#8888a0", textAlign: "right" }}>{s.active_validators || 0}</td>
                  <td style={{ padding: "12px 16px", color: "#e8e8f0", textAlign: "right" }}>{s.active_keys || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "32px 0 16px", color: "#555566", fontSize: "11px" }}>
        Bittensor Subnet Intelligence Dashboard • Data from Taostats API • Built with Next.js
      </div>
    </div>
  );
}
