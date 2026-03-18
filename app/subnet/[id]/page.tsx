import Link from "next/link";

const SUBNET_NAMES: Record<number, string> = {
  0: "Root Network", 1: "Apex (Macrocosmos)", 2: "Omron", 3: "MyShell",
  4: "Targon (Manifold)", 5: "OpenKaito", 6: "Nous Research", 7: "Subvortex",
  8: "Taoshi", 9: "Pretrain (Macrocosmos)", 10: "Sturdy (DeFi)", 11: "Dippy",
  12: "Horde", 13: "Dataverse", 19: "Nineteen (Rayon)", 22: "Datura (Meta Search)",
  25: "Protein Folding", 27: "Compute (Neural Internet)", 37: "Finetuning (Macrocosmos)",
  44: "Score Vision", 64: "Chutes (Rayon)", 75: "PatternX", 120: "Hyperliquid TAO",
};

const SUBNET_DESCRIPTIONS: Record<number, string> = {
  1: "LLM inference and agentic workflows powering decentralized text generation.",
  3: "Voice and AI agent platform with millions of users building on decentralized compute.",
  4: "Decentralized GPU compute marketplace powering AI inference at scale.",
  8: "Quantitative trading predictions using advanced AI/ML models.",
  9: "Decentralized foundation model training — produced the 72B-parameter Covenant model.",
  19: "High-frequency AI inference for text and image generation tasks.",
  64: "Serverless AI compute claimed to be 85% cheaper than AWS.",
  75: "Pattern recognition and anomaly detection across data streams.",
  120: "Bridging Bittensor subnet intelligence with Hyperliquid DeFi protocols.",
};

async function fetchTaostats(endpoint: string) {
  const res = await fetch(`https://api.taostats.io/api/${endpoint}`, {
    headers: { Authorization: process.env.TAOSTATS_API_KEY || "" },
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

function StatBox({ label, value, color = "#e8e8f0" }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px" }}>
      <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{label}</div>
      <div style={{ color, fontSize: "20px", fontWeight: 700 }}>{value}</div>
    </div>
  );
}

export default async function SubnetDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const netuid = parseInt(id);

  const [subnetRes, priceRes] = await Promise.all([
    fetchTaostats(`subnet/latest/v1?netuid=${netuid}`),
    fetchTaostats("price/latest/v1?asset=tao"),
  ]);

  const subnet = subnetRes?.data?.[0];
  const taoPrice = priceRes?.data?.[0] ? parseFloat(priceRes.data[0].close || priceRes.data[0].price || "0") : 0;

  if (!subnet) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
        <Link href="/" style={{ color: "#00d4aa", textDecoration: "none", fontSize: "14px" }}>← Back to Dashboard</Link>
        <h1 style={{ color: "#e8e8f0", marginTop: "24px" }}>Subnet {netuid} not found</h1>
      </div>
    );
  }

  const name = SUBNET_NAMES[netuid] || `Subnet ${netuid}`;
  const description = SUBNET_DESCRIPTIONS[netuid] || "A specialized competition marketplace on the Bittensor decentralized AI network.";
  const emission = parseFloat(subnet.emission || "0") / 1e7;
  const regCost = subnet.neuron_registration_cost ? (Number(subnet.neuron_registration_cost) / 1e9).toFixed(4) : "—";

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <Link href="/" style={{ color: "#00d4aa", textDecoration: "none", fontSize: "14px", display: "inline-block", marginBottom: "24px" }}>
        ← Back to Dashboard
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#e8e8f0", margin: 0 }}>{name}</h1>
            <span style={{ background: "#1e1e2e", color: "#8888a0", padding: "4px 12px", borderRadius: "12px", fontSize: "13px" }}>SN{netuid}</span>
          </div>
          <p style={{ color: "#8888a0", fontSize: "14px", maxWidth: "600px", lineHeight: 1.5 }}>{description}</p>
        </div>
        <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px 24px", textAlign: "center" }}>
          <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Emission Share</div>
          <div style={{ color: "#00d4aa", fontSize: "36px", fontWeight: 700, marginTop: "4px" }}>{emission.toFixed(2)}%</div>
          <div style={{ color: "#555566", fontSize: "11px" }}>of total network</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "32px" }}>
        <StatBox label="Active Miners" value={String(subnet.active_miners || 0)} color="#00d4aa" />
        <StatBox label="Active Validators" value={String(subnet.active_validators || 0)} color="#4488ff" />
        <StatBox label="Total Neurons" value={String(subnet.active_keys || 0)} color="#e8e8f0" />
        <StatBox label="Max Neurons" value={String(subnet.max_neurons || 256)} />
        <StatBox label="Neuron Reg Cost" value={regCost + " τ"} color="#ffaa00" />
        <StatBox label="Tempo" value={(subnet.tempo || "—") + " blocks"} />
        <StatBox label="Immunity Period" value={(subnet.immunity_period || "—") + " blocks"} />
        <StatBox label="Registration" value={subnet.registration_allowed ? "Open" : "Closed"} color={subnet.registration_allowed ? "#00d4aa" : "#ff4466"} />
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 16px 0" }}>Network Parameters</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
          {[
            ["Kappa (κ)", String(subnet.kappa || "—")],
            ["Rho (ρ)", String(subnet.rho || "—")],
            ["Min Allowed Weights", String(subnet.min_allowed_weights || "—")],
            ["Max Weights Limit", String(subnet.max_weights_limit || "—")],
            ["Bonds Moving Avg", String(subnet.bonds_moving_avg || "—")],
            ["Activity Cutoff", subnet.activity_cutoff ? subnet.activity_cutoff + " blocks" : "—"],
            ["Target Regs/Interval", String(subnet.target_regs_per_interval || "—")],
            ["Adjustment Interval", String(subnet.adjustment_interval || "—")],
            ["Weights Rate Limit", String(subnet.weights_rate_limit || "—")],
            ["Max Regs/Block", String(subnet.max_regs_per_block || "—")],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1e1e2e" }}>
              <span style={{ color: "#8888a0", fontSize: "13px" }}>{label}</span>
              <span style={{ color: "#e8e8f0", fontSize: "13px", fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 12px 0" }}>Ownership</h2>
        <div style={{ marginBottom: "8px" }}>
          <span style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Owner Coldkey</span>
          <div style={{ color: "#8888a0", fontSize: "12px", marginTop: "4px", wordBreak: "break-all" }}>{subnet.owner?.ss58 || "—"}</div>
        </div>
        <div>
          <span style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>Registered</span>
          <div style={{ color: "#8888a0", fontSize: "12px", marginTop: "4px" }}>
            {subnet.registration_timestamp ? new Date(subnet.registration_timestamp).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "32px 0 16px", color: "#555566", fontSize: "11px" }}>
        Bittensor Subnet Intelligence Dashboard • Data from Taostats API
      </div>
    </div>
  );
}