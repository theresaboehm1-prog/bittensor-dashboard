import Link from "next/link";

export default function PortfolioMethodologyPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px", color: "#e8e8f0" }}>
      <Link href="/" style={{ color: "#00d4aa", fontSize: "12px", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>← Back to Dashboard</Link>

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#e8e8f0", margin: "0 0 8px 0" }}>
          <span style={{ color: "#aa66ff" }}>◆</span> Portfolio Simulator
        </h1>
        <p style={{ color: "#8888a0", fontSize: "14px", margin: 0 }}>How I built an allocation modeling tool for TAO investors</p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>The Origin</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The Staking Calculator answers "how much will 100 TAO earn me?" but it only handles one subnet at a time. As I started thinking about my own TAO allocation, I realized I needed to answer a bigger question: <em style={{ color: "#00d4aa" }}>"How should I split my total position across multiple subnets?"</em>
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Real investors don't stake everything in one place. They diversify — 30% here, 20% there, 15% in a speculative play. But modeling that on paper is painful. You have to calculate each position separately, sum them up, and figure out your blended APR across the whole portfolio. Every time you want to adjust allocations, you redo all the math.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          I built the Portfolio Simulator to make this instant. Drag sliders across multiple subnets, see your allocations update live, and watch your projected yields recalculate across all positions simultaneously. It's the difference between doing taxes on paper and using TurboTax.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 12px 0" }}>What Portfolio Construction Means for Crypto</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Modern portfolio theory says you shouldn't put all your money in one asset. The same logic applies to Bittensor staking. If you stake 100% into MyShell and MyShell's miners disappear overnight (they only have 2), your entire position is at risk. But if you split across 4-5 subnets with different risk profiles, a failure in one only affects a portion of your stack.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          The simulator forces you to think this way. You can't stake more than 100% of your position, and the tool visually shows you how much of your budget is allocated as you drag sliders. It's a decision support tool, not just a calculator.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffaa00", margin: "0 0 12px 0" }}>The Math Behind the Simulator</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The simulator takes your total TAO budget, splits it according to your slider allocations, calculates yield for each position, and sums them into a blended portfolio return:
        </p>
        <div style={{ background: "#0a0a14", borderRadius: "6px", padding: "16px", fontFamily: "Consolas, monospace", fontSize: "13px", lineHeight: 1.9, color: "#aa66ff", marginBottom: "12px" }}>
          <div style={{ color: "#555566" }}>// Your total TAO budget</div>
          <div>const totalBudget = 1000 TAO;</div>
          <br />
          <div style={{ color: "#555566" }}>// Each slider sets % allocation per subnet</div>
          <div>const allocations = &#123;</div>
          <div>{"  "}MyShell: 30,    // 30% = 300 TAO</div>
          <div>{"  "}Targon: 25,    // 25% = 250 TAO</div>
          <div>{"  "}Chutes: 20,    // 20% = 200 TAO</div>
          <div>{"  "}PatternX: 15,  // 15% = 150 TAO</div>
          <div>&#125;;</div>
          <br />
          <div style={{ color: "#555566" }}>// Calculate each position's yield independently</div>
          <div>const yields = allocations.map(a =&gt; &#123;</div>
          <div>{"  "}const positionSize = totalBudget * (a.pct / 100);</div>
          <div>{"  "}const yearly = positionSize * (networkAPR / 100);</div>
          <div>{"  "}return yearly;</div>
          <div>&#125;);</div>
          <br />
          <div style={{ color: "#555566" }}>// Sum across all positions</div>
          <div>const totalYearly = yields.reduce((sum, y) =&gt; sum + y);</div>
          <div>const portfolioAPR = (totalYearly / totalBudget) * 100;</div>
        </div>
        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          Since all subnets share the same network-wide APR for staking (each subnet pays validators proportionally to their stake weight), the blended yield is mostly about capital efficiency — how much of your budget is actually deployed and earning vs sitting idle.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff6b9d", margin: "0 0 12px 0" }}>Worked Example: 500 TAO Split 4 Ways</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 16px 0" }}>
          Let's say you have 500 TAO (~$133,500) and want to diversify across four subnets based on my Risk Score rankings:
        </p>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "10px", fontSize: "13px", lineHeight: 1.8, alignItems: "center" }}>
            <div style={{ color: "#e8e8f0", fontWeight: 600 }}>Subnet</div>
            <div style={{ color: "#e8e8f0", fontWeight: 600, textAlign: "right" }}>Alloc</div>
            <div style={{ color: "#e8e8f0", fontWeight: 600, textAlign: "right" }}>TAO</div>
            <div style={{ color: "#e8e8f0", fontWeight: 600, textAlign: "right" }}>Yearly Yield</div>

            <div style={{ color: "#8888a0" }}>Chutes (safest)</div>
            <div style={{ color: "#00d4aa", fontFamily: "Consolas" }}>35%</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>175</div>
            <div style={{ color: "#00d4aa", fontFamily: "Consolas" }}>~19.6 TAO</div>

            <div style={{ color: "#8888a0" }}>Targon</div>
            <div style={{ color: "#4488ff", fontFamily: "Consolas" }}>30%</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>150</div>
            <div style={{ color: "#4488ff", fontFamily: "Consolas" }}>~16.8 TAO</div>

            <div style={{ color: "#8888a0" }}>MyShell</div>
            <div style={{ color: "#ffaa00", fontFamily: "Consolas" }}>20%</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>100</div>
            <div style={{ color: "#ffaa00", fontFamily: "Consolas" }}>~11.2 TAO</div>

            <div style={{ color: "#8888a0" }}>PatternX (spec)</div>
            <div style={{ color: "#ff6b9d", fontFamily: "Consolas" }}>15%</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>75</div>
            <div style={{ color: "#ff6b9d", fontFamily: "Consolas" }}>~8.4 TAO</div>
          </div>
          <div style={{ borderTop: "1px solid #1e1e2e", marginTop: "12px", paddingTop: "12px", display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "10px", fontSize: "13px" }}>
            <div style={{ color: "#e8e8f0", fontWeight: 700 }}>Total Deployed</div>
            <div style={{ color: "#aa66ff", fontFamily: "Consolas", fontWeight: 700 }}>100%</div>
            <div style={{ color: "#aa66ff", fontFamily: "Consolas", fontWeight: 700 }}>500</div>
            <div style={{ color: "#aa66ff", fontFamily: "Consolas", fontWeight: 700 }}>~56.0 TAO</div>
          </div>
          <div style={{ marginTop: "8px", padding: "8px 12px", background: "#aa66ff15", borderRadius: "4px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#aa66ff", fontSize: "13px", fontWeight: 700 }}>Portfolio Year-End Value</span>
            <span style={{ color: "#aa66ff", fontSize: "13px", fontWeight: 700 }}>556 TAO (~$148,452)</span>
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          This is a balanced allocation: 65% in the two safest subnets (Chutes and Targon), 20% in a high-emission but concentrated position (MyShell), and 15% in a speculative play (PatternX). <span style={{ color: "#e8e8f0" }}>If MyShell collapses, you lose only 20% of your position, not everything.</span> That's the value of diversification — the simulator lets you model these tradeoffs before committing capital.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#aa66ff", margin: "0 0 12px 0" }}>What the Simulator Shows</h2>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Total TAO Budget Input</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Set your total capital — whether that's 10 TAO for a small test position or 10,000 TAO for institutional-scale planning. The math scales proportionally.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Multi-Subnet Sliders</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Individual sliders for each subnet let you set % allocation. Drag left and right to shift weight between positions. All values update in real time.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>100% Constraint Indicator</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            A progress bar shows your total allocation. Green when under 100%, red when you exceed it. You can't accidentally over-allocate without noticing.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ff6b9d" }}>
          <div style={{ color: "#ff6b9d", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Per-Position Yield Breakdown</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            For each subnet, you see TAO amount allocated, estimated yearly yield in TAO, and USD equivalent at the current live price. Makes tradeoffs between positions visible at a glance.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", borderLeft: "3px solid #aa66ff" }}>
          <div style={{ color: "#aa66ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Portfolio-Level Projection</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            The headline number: total yearly yield across your entire portfolio plus your projected year-end value in both TAO and USD. This is the final output — what would your stack look like in 12 months?
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>Why I Built This Specifically</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The Staking Calculator is a single-position tool. The Portfolio Simulator is a multi-position tool. Together they form two layers of the same decision: how much should I earn from this ONE bet (calculator), and how should I diversify across MANY bets (simulator)?
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Real portfolio managers don't think in isolation. They think in allocation percentages — "I'm 60% in large caps, 25% in mid caps, 15% in speculative plays." I wanted to bring that same mental model to Bittensor, where most people still think one subnet at a time because the tools force them to.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          When paired with my Risk Scores, the simulator becomes a real decision tool. See which subnets are Low Risk (80+), allocate more to those. See which are Critical (below 20), avoid them entirely or cap your exposure. This is exactly how VC funds construct portfolios — concentrate in conviction plays, diversify in everything else.
        </p>
      </div>

      <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: "#e8e8f0" }}>Disclaimer:</strong> Portfolio projections assume current emission rates and TAO prices remain constant. Real returns depend on market volatility, subnet performance, and changes in network-wide stake distribution. Diversification does not eliminate risk — it manages it. This is a research tool, not financial advice.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Link href="/" style={{ color: "#00d4aa", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>← Back to Dashboard</Link>
      </div>
    </div>
  );
}