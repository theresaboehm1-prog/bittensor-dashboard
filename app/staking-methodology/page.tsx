import Link from "next/link";

export default function StakingMethodologyPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px", color: "#e8e8f0" }}>
      <Link href="/" style={{ color: "#00d4aa", fontSize: "12px", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>← Back to Dashboard</Link>

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#e8e8f0", margin: "0 0 8px 0" }}>
          <span style={{ color: "#4488ff" }}>◆</span> TAO Staking Calculator
        </h1>
        <p style={{ color: "#8888a0", fontSize: "14px", margin: 0 }}>How I built a yield projection tool for TAO stakers</p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>The Origin</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The most basic question any TAO holder asks is also the hardest to answer: <em style={{ color: "#00d4aa" }}>"If I stake X TAO, how much will I actually earn?"</em> Not the theoretical yield. Not the pre-fee number. The real, after-validator-take, spendable return.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          When I tried to figure this out for my own Ridges AI position, I found myself doing math on paper — pulling emission rates from Taostats, subtracting validator take fees, converting to USD at the current TAO price, projecting across different timeframes. It took me 20 minutes every time I wanted to model a new scenario.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          So I built a calculator that does it instantly. Drag the TAO amount, set the validator take percentage, and see projected returns across daily, weekly, monthly, and yearly timeframes — all displayed in both TAO and USD using the current live price.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 16px 0" }}>What TAO Staking Actually Is</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          When you stake TAO, you delegate it to a validator who runs nodes on subnets and scores miner work. In exchange for providing stake-weighted voting power, you receive a share of the validator's emission rewards. The validator takes a cut (called the "take" or "take rate") — typically between 0% and 18% — and you get the rest.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          This is similar to Ethereum staking through Lido, but with a crucial difference: Bittensor validators can set their own take rates, and they vary widely. A 5% difference on 100 TAO compounds into hundreds of dollars over a year. This is why validator choice matters, and why the calculator shows you the impact of different take rates instantly.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffaa00", margin: "0 0 12px 0" }}>The Math Behind the Calculator</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The calculation starts with the network-wide emission rate and works down to your specific position:
        </p>
        <div style={{ background: "#0a0a14", borderRadius: "6px", padding: "16px", fontFamily: "Consolas, monospace", fontSize: "13px", lineHeight: 1.9, color: "#4488ff", marginBottom: "12px" }}>
          <div style={{ color: "#555566" }}>// Daily TAO emission post-halving</div>
          <div>const networkDaily = 3600 TAO;</div>
          <br />
          <div style={{ color: "#555566" }}>// Your stake as a fraction of total staked TAO</div>
          <div>const yourShare = yourStake / totalStaked;</div>
          <br />
          <div style={{ color: "#555566" }}>// Gross daily rewards (before validator fee)</div>
          <div>const dailyGross = networkDaily * yourShare;</div>
          <br />
          <div style={{ color: "#555566" }}>// Validator takes their cut</div>
          <div>const dailyNet = dailyGross * (1 - validatorTake);</div>
          <br />
          <div style={{ color: "#555566" }}>// Project across timeframes</div>
          <div>const weekly = dailyNet * 7;</div>
          <div>const monthly = dailyNet * 30;</div>
          <div>const yearly = dailyNet * 365;</div>
          <br />
          <div style={{ color: "#555566" }}>// Convert to USD using live TAO price</div>
          <div>const yearlyUSD = yearly * taoPrice;</div>
          <br />
          <div style={{ color: "#555566" }}>// Effective APR</div>
          <div>const apr = (yearly / yourStake) * 100;</div>
        </div>
        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          The APR is the most important number because it's comparable across investments. If TAO staking yields 12% APR and Treasury bonds yield 4%, the risk-adjusted question becomes: is that 8% spread worth the volatility?
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff6b9d", margin: "0 0 12px 0" }}>Worked Example: 100 TAO at 5% Validator Take</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 16px 0" }}>
          Let's say you stake 100 TAO with a validator charging 5% take, at current TAO price of $267:
        </p>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "10px", fontSize: "13px", lineHeight: 1.8, alignItems: "center" }}>
            <div style={{ color: "#8888a0" }}>Your stake</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>100 TAO</div>
            <div style={{ color: "#555566", fontFamily: "Consolas" }}>= $26,700</div>
            <div style={{ color: "#8888a0" }}>Validator take</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>5%</div>
            <div style={{ color: "#555566" }}></div>
            <div style={{ color: "#8888a0" }}>Gross daily reward</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>~0.033 TAO</div>
            <div style={{ color: "#555566", fontFamily: "Consolas" }}>= $8.81</div>
            <div style={{ color: "#8888a0" }}>Net daily (after 5% take)</div>
            <div style={{ color: "#00d4aa", fontFamily: "Consolas" }}>~0.031 TAO</div>
            <div style={{ color: "#555566", fontFamily: "Consolas" }}>= $8.37</div>
            <div style={{ color: "#8888a0" }}>Weekly</div>
            <div style={{ color: "#00d4aa", fontFamily: "Consolas" }}>~0.22 TAO</div>
            <div style={{ color: "#555566", fontFamily: "Consolas" }}>= $58.57</div>
            <div style={{ color: "#8888a0" }}>Monthly</div>
            <div style={{ color: "#00d4aa", fontFamily: "Consolas" }}>~0.94 TAO</div>
            <div style={{ color: "#555566", fontFamily: "Consolas" }}>= $251.00</div>
            <div style={{ color: "#8888a0" }}>Yearly</div>
            <div style={{ color: "#00d4aa", fontFamily: "Consolas", fontWeight: 700 }}>~11.4 TAO</div>
            <div style={{ color: "#555566", fontFamily: "Consolas", fontWeight: 700 }}>= $3,053</div>
          </div>
          <div style={{ borderTop: "1px solid #1e1e2e", marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#e8e8f0", fontSize: "14px", fontWeight: 700 }}>Effective APR</span>
            <span style={{ color: "#4488ff", fontSize: "20px", fontWeight: 700 }}>~11.4%</span>
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          Now consider if you picked a validator charging 15% take instead of 5%. Your yearly return drops from ~11.4 TAO to ~10.2 TAO. <span style={{ color: "#e8e8f0" }}>That's a $320 difference per year on just 100 TAO.</span> The calculator makes this comparison instant, which is why I also built the Validator Fee Comparison tool to pair with it.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#aa66ff", margin: "0 0 12px 0" }}>What the Calculator Shows</h2>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>TAO Amount Input</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Type any amount. The calculator handles small positions (1 TAO) through whale-sized stakes (10,000+ TAO) using the same math.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Validator Take Slider</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Adjust the validator's fee percentage from 0% to 18% and watch returns update in real time. Shows you instantly how much each percentage point matters.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Multi-Timeframe Returns</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Daily, weekly, monthly, and yearly returns displayed simultaneously. Shows both TAO amounts and USD equivalents using the live TAO price.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ff6b9d" }}>
          <div style={{ color: "#ff6b9d", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Effective APR</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            The headline number that lets you compare TAO staking against other investments — Treasury bonds, Ethereum staking, DeFi yields, savings accounts.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", borderLeft: "3px solid #aa66ff" }}>
          <div style={{ color: "#aa66ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Year-End Portfolio Projection</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Shows what your total stack would be worth after one year if you reinvested nothing — just your original TAO plus compound rewards at current prices.
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>Why I Built This</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Most crypto "calculators" out there are actually misleading. They show you gross yields without accounting for validator take, or they use outdated TAO prices, or they don't tell you the effective APR. I wanted a tool that gave me the actual number I'd see in my wallet.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          As someone making real staking decisions with my Ridges AI TAO, I needed transparency. How much am I giving up in validator fees? What's my real risk-adjusted return? Is it worth picking a cheaper validator even if they have less reputation? The calculator gives me — and anyone using my dashboard — instant answers to these questions.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          It also pairs naturally with the Validator Fee Comparison tool and the Portfolio Simulator. Together, they form a complete staking decision workflow: calculate your potential yield, pick the right validator to minimize fees, then model your full portfolio allocation across multiple subnets. That's how real investors think about capital deployment.
        </p>
      </div>

      <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: "#e8e8f0" }}>Disclaimer:</strong> Yield projections assume current emission rates and validator takes remain constant. Actual returns vary based on network activity, validator performance, TAO price volatility, and changes in the network-wide stake distribution. Past performance does not guarantee future results. This is a research tool, not financial advice.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Link href="/" style={{ color: "#00d4aa", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>← Back to Dashboard</Link>
      </div>
    </div>
  );
}