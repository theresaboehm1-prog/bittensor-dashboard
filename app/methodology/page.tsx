import Link from "next/link";

export default function MethodologyPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px", color: "#e8e8f0" }}>
      <Link href="/" style={{ color: "#00d4aa", fontSize: "12px", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>← Back to Dashboard</Link>

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#e8e8f0", margin: "0 0 8px 0" }}>
          <span style={{ color: "#00d4aa" }}>◆</span> Subnet Risk Score Methodology
        </h1>
        <p style={{ color: "#8888a0", fontSize: "14px", margin: 0 }}>How I designed a composite scoring system for Bittensor subnets</p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>The Origin of the Score</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          When I started investing in TAO through Ridges AI, I kept asking the same question: <em style={{ color: "#00d4aa" }}>"Is this subnet actually risky?"</em> Every other tool — Taostats, CoinGecko, even SubnetAlpha — showed me individual metrics in isolation. Miners here. Validators there. Emissions on a different page. Flow data buried in API responses.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          I had to manually cross-reference 5+ data sources just to evaluate a single subnet. Multiply that by 129 subnets and I was spending hours making investment decisions that should take minutes. So I designed a composite scoring system that aggregates all the critical signals into one actionable number.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          The result is a 0-100 risk score where higher = safer. It's not perfect — no single number can capture everything — but it gives investors a starting point that didn't exist before in the Bittensor ecosystem.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 16px 0" }}>The Five Factors</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#8888a0", marginBottom: "20px" }}>
          I researched what professional crypto investors actually look at when evaluating decentralized networks. Then I distilled those signals into five quantifiable factors and weighted them based on importance.
        </p>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700 }}>1. Miner Diversity</span>
            <span style={{ color: "#00d4aa", fontSize: "12px", fontWeight: 600, background: "#00d4aa20", padding: "3px 10px", borderRadius: "4px" }}>25% weight</span>
          </div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            <strong>The question it answers:</strong> If some miners leave, can this subnet survive?
          </p>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            More miners = more decentralized = harder to disrupt. A subnet with 100 miners can lose 20 and keep functioning. A subnet with 3 miners is one defection away from collapse.
          </p>
          <div style={{ fontSize: "12px", color: "#555566", lineHeight: 1.7 }}>
            50+ miners → 95 • 20-49 → 80 • 10-19 → 65 • 5-9 → 45 • 2-4 → 25 • 0-1 → 10
          </div>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700 }}>2. Emission Strength</span>
            <span style={{ color: "#00d4aa", fontSize: "12px", fontWeight: 600, background: "#00d4aa20", padding: "3px 10px", borderRadius: "4px" }}>25% weight</span>
          </div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            <strong>The question it answers:</strong> Is the economic incentive strong enough to keep participants engaged?
          </p>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            Higher emission share = more TAO rewards = stronger incentive for miners and validators to stay. Low-emission subnets risk losing participants to better-paying ones, eventually leading to deregistration.
          </p>
          <div style={{ fontSize: "12px", color: "#555566", lineHeight: 1.7 }}>
            2.0%+ → 95 • 1.0-1.99% → 80 • 0.5-0.99% → 60 • 0.2-0.49% → 40 • Below 0.2% → 15
          </div>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700 }}>3. Validator Coverage</span>
            <span style={{ color: "#4488ff", fontSize: "12px", fontWeight: 600, background: "#4488ff20", padding: "3px 10px", borderRadius: "4px" }}>20% weight</span>
          </div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            <strong>The question it answers:</strong> Are there enough validators to maintain reliable consensus?
          </p>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            Validators score miner work and reach consensus on payouts. Too few validators means consensus can break down or be manipulated. Most subnets have 5-15 validators in practice.
          </p>
          <div style={{ fontSize: "12px", color: "#555566", lineHeight: 1.7 }}>
            15+ validators → 95 • 10-14 → 80 • 5-9 → 65 • 3-4 → 45 • 0-2 → 20
          </div>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700 }}>4. Flow Momentum</span>
            <span style={{ color: "#4488ff", fontSize: "12px", fontWeight: 600, background: "#4488ff20", padding: "3px 10px", borderRadius: "4px" }}>20% weight</span>
          </div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            <strong>The question it answers:</strong> Is smart money entering or exiting this subnet?
          </p>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            Net TAO flow shows real-time investor sentiment. Positive flow = bullish (people staking in). Negative flow = bearish (people unstaking out). This is the most dynamic factor and reflects the market's current opinion.
          </p>
          <div style={{ fontSize: "12px", color: "#555566", lineHeight: 1.7 }}>
            +1M+ TAO → 95 • +100K to +1M → 80 • +1 to +100K → 65 • -1 to -100K → 40 • -100K to -1M → 25 • Below -1M → 10
          </div>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700 }}>5. Capacity Utilization</span>
            <span style={{ color: "#ffaa00", fontSize: "12px", fontWeight: 600, background: "#ffaa0020", padding: "3px 10px", borderRadius: "4px" }}>10% weight</span>
          </div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            <strong>The question it answers:</strong> How full is this subnet relative to its maximum slots?
          </p>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            Each subnet caps at 256 neurons. A packed subnet means high demand to participate. An empty subnet is a warning sign. I gave this the lowest weight (10%) because capacity alone doesn't determine quality.
          </p>
          <div style={{ fontSize: "12px", color: "#555566", lineHeight: 1.7 }}>
            80%+ → 90 • 50-79% → 70 • 30-49% → 50 • Below 30% → 25
          </div>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffaa00", margin: "0 0 12px 0" }}>The Math</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 16px 0" }}>
          The composite score is a weighted average where each factor contributes proportional to its importance:
        </p>
        <div style={{ background: "#0a0a14", borderRadius: "6px", padding: "16px", fontFamily: "Consolas, monospace", fontSize: "13px", color: "#00d4aa", marginBottom: "16px" }}>
          overall = minerScore × 0.25<br />
          {"     "}+ emissionScore × 0.25<br />
          {"     "}+ valScore × 0.20<br />
          {"     "}+ flowScore × 0.20<br />
          {"     "}+ capacityScore × 0.10
        </div>
        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          The weights add up to exactly 100%, and each factor produces a score between 0 and 100, so the final result is also bounded between 0 and 100.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff6b9d", margin: "0 0 12px 0" }}>Worked Example: MyShell (SN3)</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 16px 0" }}>
          MyShell is the #1 subnet by emission share, so you'd expect it to be safe. Let's actually run it through the model:
        </p>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "10px", fontSize: "13px", alignItems: "center" }}>
            <div style={{ color: "#8888a0" }}>Miner Diversity</div>
            <div style={{ color: "#e8e8f0" }}>2 miners</div>
            <div style={{ color: "#ff4466" }}>→ 25</div>
            <div style={{ color: "#555566" }}>× 0.25 = 6.25</div>
            <div style={{ color: "#8888a0" }}>Emission Strength</div>
            <div style={{ color: "#e8e8f0" }}>3.43%</div>
            <div style={{ color: "#00d4aa" }}>→ 95</div>
            <div style={{ color: "#555566" }}>× 0.25 = 23.75</div>
            <div style={{ color: "#8888a0" }}>Validator Coverage</div>
            <div style={{ color: "#e8e8f0" }}>3 validators</div>
            <div style={{ color: "#ffaa00" }}>→ 45</div>
            <div style={{ color: "#555566" }}>× 0.20 = 9.00</div>
            <div style={{ color: "#8888a0" }}>Flow Momentum</div>
            <div style={{ color: "#e8e8f0" }}>+50K TAO</div>
            <div style={{ color: "#4488ff" }}>→ 65</div>
            <div style={{ color: "#555566" }}>× 0.20 = 13.00</div>
            <div style={{ color: "#8888a0" }}>Capacity Utilization</div>
            <div style={{ color: "#e8e8f0" }}>~60%</div>
            <div style={{ color: "#4488ff" }}>→ 70</div>
            <div style={{ color: "#555566" }}>× 0.10 = 7.00</div>
          </div>
          <div style={{ borderTop: "1px solid #1e1e2e", marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#e8e8f0", fontSize: "14px", fontWeight: 700 }}>Final Score</span>
            <span style={{ color: "#ffaa00", fontSize: "20px", fontWeight: 700 }}>59 / 100 — Elevated Risk</span>
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          This is the insight my scoring system reveals: <span style={{ color: "#e8e8f0" }}>MyShell is #1 in emission but actually risky because it's run by only 2 miners and 3 validators.</span> If those handful of operators leave, the entire subnet collapses. Without my scoring system, an investor would see "3.43% emission, top subnet" and assume it's safe. The composite score exposes the hidden concentration risk.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#aa66ff", margin: "0 0 12px 0" }}>Risk Labels</h2>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: "12px", fontSize: "13px", alignItems: "center" }}>
          <div style={{ color: "#00d4aa", fontWeight: 700, padding: "8px 12px", background: "#00d4aa20", borderRadius: "4px", textAlign: "center" }}>80-100</div>
          <div style={{ color: "#00d4aa", fontWeight: 700 }}>Low Risk</div>
          <div style={{ color: "#8888a0" }}>Strong across all factors. Safe to stake.</div>
          <div style={{ color: "#4488ff", fontWeight: 700, padding: "8px 12px", background: "#4488ff20", borderRadius: "4px", textAlign: "center" }}>60-79</div>
          <div style={{ color: "#4488ff", fontWeight: 700 }}>Moderate</div>
          <div style={{ color: "#8888a0" }}>Reasonable investment with some weak areas.</div>
          <div style={{ color: "#ffaa00", fontWeight: 700, padding: "8px 12px", background: "#ffaa0020", borderRadius: "4px", textAlign: "center" }}>40-59</div>
          <div style={{ color: "#ffaa00", fontWeight: 700 }}>Elevated</div>
          <div style={{ color: "#8888a0" }}>Proceed with caution. Notable weaknesses.</div>
          <div style={{ color: "#ff8844", fontWeight: 700, padding: "8px 12px", background: "#ff884420", borderRadius: "4px", textAlign: "center" }}>20-39</div>
          <div style={{ color: "#ff8844", fontWeight: 700 }}>High Risk</div>
          <div style={{ color: "#8888a0" }}>Significant risk. Aggressive investors only.</div>
          <div style={{ color: "#ff4466", fontWeight: 700, padding: "8px 12px", background: "#ff446620", borderRadius: "4px", textAlign: "center" }}>0-19</div>
          <div style={{ color: "#ff4466", fontWeight: 700 }}>Critical</div>
          <div style={{ color: "#8888a0" }}>Avoid. Subnet may face deregistration.</div>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>Why I Chose These Weights</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The weights aren't arbitrary. I tied <strong>Miner Diversity</strong> and <strong>Emission Strength</strong> at 25% each because they represent the two most fundamental aspects of a subnet: <em>can it produce AI work</em> (miners) and <em>is there economic incentive to keep doing it</em> (emission). Without both, nothing else matters.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          I tied <strong>Validator Coverage</strong> and <strong>Flow Momentum</strong> at 20% each because validators ensure quality control and flow tells you what the market thinks <em>right now</em>. These are critical but slightly less foundational than the first two.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          <strong>Capacity Utilization</strong> gets only 10% because it's a supporting signal, not a primary driver. A subnet can be excellent at 60% capacity or terrible at 90%. It's useful context but doesn't determine quality on its own.
        </p>
      </div>

      <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: "#e8e8f0" }}>Disclaimer:</strong> This risk score is a research tool, not financial advice. It aggregates on-chain metrics into a single number for convenience, but no model can capture every factor. Always do your own research before staking TAO.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Link href="/" style={{ color: "#00d4aa", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>← Back to Dashboard</Link>
      </div>
    </div>
  );
}