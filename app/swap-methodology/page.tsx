import Link from "next/link";

export default function SwapMethodologyPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px", color: "#e8e8f0" }}>
      <Link href="/" style={{ color: "#00d4aa", fontSize: "12px", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>← Back to Dashboard</Link>

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#e8e8f0", margin: "0 0 8px 0" }}>
          <span style={{ color: "#ffaa00" }}>◆</span> Alpha Token Swap Simulator
        </h1>
        <p style={{ color: "#8888a0", fontSize: "14px", margin: 0 }}>How I built a DeFi-grade AMM simulator for Bittensor subnets</p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>The Origin</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          When Dynamic TAO launched in February 2025, it fundamentally changed how Bittensor works. Every subnet now has its own alpha token, traded against TAO through an Automated Market Maker (AMM). When you stake TAO into a subnet, you're not just locking it up — you're swapping TAO for that subnet's alpha token through a liquidity pool.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          As an investor with real money in Ridges AI, I quickly realized this changes the math entirely. A small swap into a small subnet pool can cause massive price impact — you might lose 5-10% just on slippage. Yet there was no tool that let me model this BEFORE committing real capital. I'd be flying blind every time I wanted to stake.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          So I built a swap simulator using the same constant-product AMM math that powers Uniswap — a $5B+ DeFi protocol. The result lets any investor model a swap before executing it, see the exact price impact, and avoid getting wrecked by slippage.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 16px 0" }}>What an AMM Actually Is</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          An Automated Market Maker is a smart contract that holds two tokens in a liquidity pool and lets anyone swap between them at an algorithmically determined price. Unlike traditional exchanges that match buyers and sellers, AMMs use a mathematical formula to set prices based on the ratio of tokens in the pool.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          For Bittensor, every subnet has a pool with TAO on one side and that subnet's alpha token on the other. When you stake, you're depositing TAO and receiving alpha tokens. The pool ratio determines the price. Larger swaps shift the ratio more dramatically, causing higher slippage.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffaa00", margin: "0 0 12px 0" }}>The Constant-Product Formula</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The core math is elegant — it's just one equation that must always hold true:
        </p>
        <div style={{ background: "#0a0a14", borderRadius: "6px", padding: "20px", fontFamily: "Consolas, monospace", fontSize: "18px", color: "#ffaa00", textAlign: "center", marginBottom: "16px" }}>
          TAO_reserve  ×  Alpha_reserve  =  k
        </div>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          This is the same formula Uniswap uses. The constant <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#ffaa00" }}>k</code> never changes during a swap. If you add TAO to the pool, the alpha reserve must decrease by exactly the right amount to keep <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#ffaa00" }}>k</code> the same. The amount of alpha you receive is whatever was removed from the pool.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          This creates a hyperbolic curve — small swaps barely move the price, but large swaps trigger exponentially worse rates. That's why whales can't dump positions without moving the market.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff6b9d", margin: "0 0 12px 0" }}>The Code I Wrote</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Implementing the swap math required four steps. Here's the core function from my SwapSimulator component:
        </p>
        <div style={{ background: "#0a0a14", borderRadius: "6px", padding: "16px", fontFamily: "Consolas, monospace", fontSize: "12px", lineHeight: 1.7, color: "#00d4aa", marginBottom: "12px", overflowX: "auto" }}>
          <div style={{ color: "#555566" }}>// Step 1: Calculate the constant k from current pool reserves</div>
          <div>const k = taoReserve * alphaReserve;</div>
          <br />
          <div style={{ color: "#555566" }}>// Step 2: Add user's TAO input to the pool</div>
          <div>const newTaoReserve = taoReserve + taoIn;</div>
          <br />
          <div style={{ color: "#555566" }}>// Step 3: Solve for new alpha reserve to keep k constant</div>
          <div>const newAlphaReserve = k / newTaoReserve;</div>
          <br />
          <div style={{ color: "#555566" }}>// Step 4: User receives the difference</div>
          <div>const alphaOut = alphaReserve - newAlphaReserve;</div>
          <br />
          <div style={{ color: "#555566" }}>// Calculate price impact percentage</div>
          <div>const oldPrice = taoReserve / alphaReserve;</div>
          <div>const newPrice = newTaoReserve / newAlphaReserve;</div>
          <div>const priceImpact = ((newPrice - oldPrice) / oldPrice) * 100;</div>
        </div>
        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          The price impact is the key insight investors care about. A 1% impact is acceptable. A 10% impact means you're getting wrecked — you should split the trade or pick a different subnet with deeper liquidity.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#aa66ff", margin: "0 0 12px 0" }}>What the Simulator Shows</h2>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Subnet Selector</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Pick any of the top subnets. Each has different pool depths — bigger subnets have deeper liquidity and lower slippage.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>TAO Input Slider</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Drag the slider to set how much TAO you want to swap. The simulator instantly updates the alpha received and price impact.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Color-Coded Price Impact</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Green if impact is below 1% (safe), yellow if 1-5% (caution), red if above 5% (warning — you're moving the market).
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ff6b9d" }}>
          <div style={{ color: "#ff6b9d", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Interactive Bonding Curve</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            A live chart shows the hyperbolic curve of the AMM. Your swap position is plotted on the curve so you can see visually how much you're shifting the price.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", borderLeft: "3px solid #aa66ff" }}>
          <div style={{ color: "#aa66ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Expandable Pool Math</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Click to expand and see the actual formula with your numbers plugged in. Educational for users who want to understand what's happening under the hood.
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffaa00", margin: "0 0 12px 0" }}>Worked Example: Swapping 100 TAO into a Small Pool</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 16px 0" }}>
          Imagine a subnet pool with 5,000 TAO and 50,000 alpha tokens. The current price is 0.1 TAO per alpha. Let's swap 100 TAO into it:
        </p>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "10px", fontSize: "13px", lineHeight: 1.8 }}>
            <div style={{ color: "#8888a0" }}>Starting TAO reserve</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>5,000</div>
            <div style={{ color: "#8888a0" }}>Starting alpha reserve</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>50,000</div>
            <div style={{ color: "#8888a0" }}>Constant k (5000 × 50000)</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>250,000,000</div>
            <div style={{ color: "#8888a0" }}>Old price (TAO per alpha)</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>0.10</div>
            <div style={{ color: "#8888a0" }}>You add 100 TAO</div>
            <div style={{ color: "#00d4aa", fontFamily: "Consolas" }}>+100</div>
            <div style={{ color: "#8888a0" }}>New TAO reserve</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>5,100</div>
            <div style={{ color: "#8888a0" }}>New alpha reserve (k ÷ 5,100)</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>49,019.6</div>
            <div style={{ color: "#8888a0" }}>You receive (50,000 - 49,019.6)</div>
            <div style={{ color: "#00d4aa", fontFamily: "Consolas" }}>980.4 alpha</div>
            <div style={{ color: "#8888a0" }}>New price</div>
            <div style={{ color: "#e8e8f0", fontFamily: "Consolas" }}>0.1040</div>
            <div style={{ color: "#8888a0" }}>Price impact</div>
            <div style={{ color: "#ffaa00", fontFamily: "Consolas", fontWeight: 700 }}>+4.0%</div>
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          Without the simulator, you might expect to receive 1,000 alpha tokens (100 ÷ 0.10 = 1,000). But the AMM math means you only get 980.4 — and you've moved the price up by 4%. That 19.6 alpha "missing" is the slippage cost. <span style={{ color: "#e8e8f0" }}>For a 1,000 TAO swap into the same pool, the price impact would be over 30%.</span> This is exactly the kind of insight the simulator reveals before you commit real money.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 12px 0" }}>Why I Built This Specifically</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Most Bittensor users don't know that staking is technically a swap. They think they're "depositing" TAO and getting yield. But the moment Dynamic TAO launched, every staking action became an AMM swap with all the slippage and price impact that DeFi traders have dealt with for years.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          I wanted to bring DeFi-grade tooling to Bittensor investors who might not have a DeFi background. The same math Uniswap traders take for granted — slippage warnings, price impact calculations, bonding curve visualizations — should be standard for anyone staking TAO into a subnet.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          As someone who actually has TAO at stake through Ridges AI, I needed this for my own decision-making. If I wouldn't trust my money to a tool, I wouldn't ask anyone else to either.
        </p>
      </div>

      <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: "#e8e8f0" }}>Disclaimer:</strong> The swap simulator uses estimated pool reserves derived from emission data. Actual on-chain pool reserves may differ. Always verify with the live Bittensor chain before executing real swaps. This is a research tool, not financial advice.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Link href="/" style={{ color: "#00d4aa", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>← Back to Dashboard</Link>
      </div>
    </div>
  );
}