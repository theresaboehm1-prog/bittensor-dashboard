import Link from "next/link";

export default function FlowMethodologyPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px", color: "#e8e8f0" }}>
      <Link href="/" style={{ color: "#00d4aa", fontSize: "12px", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>← Back to Dashboard</Link>

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#e8e8f0", margin: "0 0 8px 0" }}>
          <span style={{ color: "#00d4aa" }}>◆</span> Subnet Money Flow Radar
        </h1>
        <p style={{ color: "#8888a0", fontSize: "14px", margin: 0 }}>How I built the investor sentiment tracker that nobody else has</p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>The Origin</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          I was reading a CoinGecko deep-dive on Bittensor subnets and one sentence stopped me cold: <em style={{ color: "#00d4aa" }}>"The key metric to watch isn't emissions or miner count — it's net staking flow. Whether TAO is moving INTO or OUT of a subnet's pool is the most important signal in the entire ecosystem."</em>
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          That made immediate sense to me. Emission share tells you what rewards the subnet is getting. Miner count tells you how many people are working on it. But neither tells you what smart money is actually DOING right now. Flow data does — it captures real-time conviction because staking requires actual capital deployment.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          I immediately searched for a tool that visualized flow data. Nothing existed. Taostats has the API endpoint but doesn't visualize it in their main dashboard. CoinGecko mentioned it in articles but didn't track it. So I built it myself.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff4466", margin: "0 0 12px 0" }}>The First Version Failed</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          My first implementation used the <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>tao_flow</code> field from the standard subnet endpoint. It showed numbers, it was color-coded, and I was initially happy with it. Then a friend who actually invests in Bittensor looked at it and flagged a serious problem:
        </p>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ff4466" }}>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 8px 0", lineHeight: 1.6 }}>
            <em>"Only 4 subnets are showing any flow at all out of 129. Total inflows being exactly 0 while outflows are 32 is statistically unusual. It looks like your API call is only capturing a single block of data — 12 seconds of flow — rather than a rolling window like 1 hour or 24 hours."</em>
          </p>
          <p style={{ fontSize: "12px", color: "#8888a0", margin: 0 }}>— Feedback that changed my entire approach</p>
        </div>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          They were right. The <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>tao_flow</code> field was per-block data — it showed what happened in the last 12 seconds. For investment decisions, that's basically noise. A whale could stake 10,000 TAO one block and nothing the next. You'd see wild swings that meant nothing.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffaa00", margin: "0 0 12px 0" }}>The Fix: Rolling Window Data</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          I went back to the Taostats API documentation and discovered a dedicated endpoint I'd missed: <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>dtao/tao_flow/v1</code>. This one provides proper rolling window data — 1-hour, 24-hour, and 7-day net flows for every subnet. This is what professional traders actually look at.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          I rewrote the entire component to fetch from this endpoint and store all three timeframes simultaneously. Then I had to decide: which one do I show by default?
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 12px 0" }}>Why Three Timeframes Instead of One</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          I originally planned to show only 7-day flow. My thinking was: longer timeframes filter out noise and show real trends. But when I started testing it, I realized a single timeframe misses critical information that each one captures differently:
        </p>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>1 Hour — Real-Time Momentum</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 6px 0", lineHeight: 1.6 }}>
            Shows what's happening RIGHT NOW. If a subnet just announced a partnership or hit a milestone, the 1-hour flow captures the immediate market reaction before anyone else notices.
          </p>
          <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.5 }}>
            <strong>Use case:</strong> Spotting breaking news impact. Useful when you're actively trading.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>24 Hours — Daily Sentiment (default)</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 6px 0", lineHeight: 1.6 }}>
            The sweet spot for most investors. Smooths out intraday noise while still being current enough to reflect market opinion. This is what professional crypto traders look at for sentiment analysis.
          </p>
          <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.5 }}>
            <strong>Use case:</strong> Daily portfolio reviews, deciding where to stake for the week.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>7 Days — Medium-Term Trends</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 6px 0", lineHeight: 1.6 }}>
            The real trend filter. A subnet might have a great 1-hour bounce but a terrible 7-day trend — that's a dead cat bounce, not a buy signal. The 7-day view reveals underlying momentum.
          </p>
          <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.5 }}>
            <strong>Use case:</strong> Long-term conviction investments, avoiding traps.
          </p>
        </div>

        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          Having all three lets you detect divergences — the most powerful signal. A subnet showing 1h inflow but 7d outflow is a warning. Bulls are trying to rally it short-term, but smart money has been exiting for a week. That's not a buy, that's a trap.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff6b9d", margin: "0 0 12px 0" }}>The Design Decisions</h2>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Split-Screen Layout</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            I put inflows on the left (green) and outflows on the right (red). This mirrors how trading platforms show bids vs asks. Your eye instantly parses which side is bigger without reading numbers.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Summary Stat Cards</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Three cards at the top show Total Inflows, Total Outflows, and Net Flow — each with TAO amount, USD equivalent, and count of subnets in each direction. The Net Flow card gets a color-coded border: green if net bullish, red if net bearish.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Clickable Subnet Bars</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Every bar is a link to that subnet's detail page. See something interesting? Click it and drill down immediately without losing context.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", borderLeft: "3px solid #aa66ff" }}>
          <div style={{ color: "#aa66ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Timeframe + Sort Toggles</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Switch between 1h/24h/7d on the fly. Also toggle sort order — by flow magnitude (shows biggest movers first) or by emission (shows largest subnets first regardless of flow size).
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#aa66ff", margin: "0 0 12px 0" }}>How to Read the Data</h2>
        <div style={{ background: "#1a1a2530", border: "1px solid #00d4aa30", borderRadius: "6px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ color: "#00d4aa", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>BULLISH SIGNAL</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: 0, lineHeight: 1.6 }}>
            Large TAO inflow + high emission + positive across all three timeframes. This means investors are actively staking into the subnet pool, driving up the alpha token price, and the momentum is consistent. Strong buy signal.
          </p>
        </div>
        <div style={{ background: "#1a1a2530", border: "1px solid #ff446630", borderRadius: "6px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ color: "#ff4466", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>BEARISH SIGNAL</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: 0, lineHeight: 1.6 }}>
            Large TAO outflow across multiple timeframes despite high emission share. This means investors are unstaking and selling the alpha token even though the subnet is earning rewards. Could indicate a fundamental problem with AI output quality or loss of confidence in the team.
          </p>
        </div>
        <div style={{ background: "#1a1a2530", border: "1px solid #ffaa0030", borderRadius: "6px", padding: "16px" }}>
          <div style={{ color: "#ffaa00", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>DIVERGENCE WARNING</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: 0, lineHeight: 1.6 }}>
            1-hour inflow combined with 7-day outflow = dead cat bounce. Short-term buyers are trying to rally a subnet that has been hemorrhaging capital for a week. This is a trap, not an opportunity. The longer timeframe usually wins.
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>Why This Is Unique</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Taostats has the data but doesn't visualize it in their main UI. CoinGecko mentions flow in articles but doesn't track it. SubnetAlpha focuses on scoring, not flow. No other Bittensor dashboard combines rolling window flow data across multiple timeframes with a split-screen inflow/outflow visualization.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          This is the kind of tool that exists for Ethereum (Nansen, Arkham) and Bitcoin (Glassnode, CryptoQuant) — sophisticated on-chain flow analysis that professional traders pay hundreds of dollars per month to access. I built it for Bittensor because I needed it for my own staking decisions, and now anyone can use it for free.
        </p>
      </div>

      <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: "#e8e8f0" }}>Disclaimer:</strong> Flow data shows staking actions in the past window. It does NOT predict future price movements. Large whales can distort flow data with single transactions. Always cross-reference with risk scores and fundamental analysis. This is a research tool, not financial advice.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Link href="/" style={{ color: "#00d4aa", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>← Back to Dashboard</Link>
      </div>
    </div>
  );
}