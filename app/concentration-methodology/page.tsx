import Link from "next/link";

export default function ConcentrationMethodologyPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px", color: "#e8e8f0" }}>
      <Link href="/" style={{ color: "#00d4aa", fontSize: "12px", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>← Back to Dashboard</Link>

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#e8e8f0", margin: "0 0 8px 0" }}>
          <span style={{ color: "#ff4466" }}>◆</span> Large Holder Concentration Monitor
        </h1>
        <p style={{ color: "#8888a0", fontSize: "14px", margin: 0 }}>How I built a centralization risk tracker for the TAO network</p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>The Origin</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Bittensor markets itself as a decentralized AI network. But "decentralized" is a spectrum, not a binary. When I looked at the Whale Tracker data and started adding up the top holders, I realized something uncomfortable: <em style={{ color: "#ff4466" }}>a handful of institutions control a massive percentage of the entire TAO supply.</em>
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Kraken alone holds over 670,000 TAO across multiple wallets. Yuma (a Digital Currency Group subsidiary) holds nearly 19% of total supply. The Opentensor Foundation holds another significant chunk. Add in the other exchanges and institutions and you get something that looks very different from "decentralized."
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          As an investor, this matters. If Kraken decides to unstake everything tomorrow, it could crater the TAO price. If Yuma rebalances their position, alpha token prices across 14 subnets they're exposed to could move simultaneously. I needed a tool that tracked concentration risk and made these relationships visible.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff4466", margin: "0 0 12px 0" }}>Why Concentration Matters</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          There are three reasons a retail investor should care about TAO concentration:
        </p>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ff4466" }}>
          <div style={{ color: "#ff4466", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>1. Sudden Liquidation Risk</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            When a whale unstakes and dumps, the TAO price drops. A 100K TAO sell order hitting the market can cause 5-15% slippage. Knowing who holds how much tells you what's at risk.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>2. Subnet Dominance</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Large holders often stake across multiple subnets, creating correlated exposures. If Yuma is in 14 subnets and decides to exit one, the dump pressure spreads across their entire position.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>3. Centralization Attack Vectors</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            If a handful of entities control enough stake, they could theoretically coordinate validator decisions. This undermines the "decentralized AI" value proposition Bittensor is built on.
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 12px 0" }}>How I Built It</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The Taostats API gives me raw account data — wallet addresses, balances, and metadata. But it doesn't group wallets by entity, and it doesn't categorize them. I had to build the aggregation logic myself:
        </p>

        <div style={{ background: "#0a0a14", borderRadius: "6px", padding: "16px", fontFamily: "Consolas, monospace", fontSize: "13px", lineHeight: 1.9, color: "#4488ff", marginBottom: "12px" }}>
          <div style={{ color: "#555566" }}>// Fetch all large accounts from Taostats</div>
          <div>const accounts = await fetch("/api/taostats/accounts");</div>
          <br />
          <div style={{ color: "#555566" }}>// Group wallets by entity name</div>
          <div>const entityMap = &#123;&#125;;</div>
          <div>accounts.forEach(account =&gt; &#123;</div>
          <div>{"  "}const entity = account.hotkey_name || "Unknown";</div>
          <div>{"  "}if (!entityMap[entity]) entityMap[entity] = &#123; total: 0, wallets: 0 &#125;;</div>
          <div>{"  "}entityMap[entity].total += account.balance_tao;</div>
          <div>{"  "}entityMap[entity].wallets += 1;</div>
          <div>&#125;);</div>
          <br />
          <div style={{ color: "#555566" }}>// Tag each entity by category</div>
          <div>entities.forEach(e =&gt; &#123;</div>
          <div>{"  "}if (EXCHANGE_NAMES.includes(e.name)) e.type = "EXCHANGE";</div>
          <div>{"  "}else if (FOUNDATION_NAMES.includes(e.name)) e.type = "FOUNDATION";</div>
          <div>{"  "}else e.type = "INSTITUTION";</div>
          <div>&#125;);</div>
        </div>

        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          Entity tagging was critical because the same institution often holds TAO across multiple wallets. Kraken uses 6 different wallet addresses. Yuma uses 10. Without aggregation, they look like smaller holders in the raw data.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffaa00", margin: "0 0 12px 0" }}>The Threshold Toggle — A Design Decision</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          When I first built this tool, I used a fixed threshold: only show entities holding more than 50,000 TAO. It worked, but I quickly realized different users cared about different levels of concentration, and a single threshold hid important information either way.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          A retail investor might want to see any holder above 10K TAO — that's already ~$2.7M, a meaningful position. A regulator or researcher might only care about the mega-whales holding 100K+. A day trader might want to see everyone above 25K to track mid-tier movements. One threshold couldn't serve all these use cases.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          So I added a toggle with four tiers: <strong style={{ color: "#00d4aa" }}>10K</strong>, <strong style={{ color: "#4488ff" }}>25K</strong>, <strong style={{ color: "#ffaa00" }}>50K</strong>, and <strong style={{ color: "#ff4466" }}>100K</strong>. Click any of them and the table instantly filters to show only entities at or above that level.
        </p>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>10,000+ TAO (~$2.7M)</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            The widest view. Shows every serious holder including mid-tier institutions and large retail wallets. Good for understanding the broader distribution.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>25,000+ TAO (~$6.7M)</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Filters to the significant holders. Excludes smaller entities and focuses on the wallets that could move markets. This is my personal default view.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>50,000+ TAO (~$13.4M)</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Only the major players. Exchanges, institutions, foundations. If you're worried about sudden liquidation events, these are the entities whose movements actually matter.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", borderLeft: "3px solid #ff4466" }}>
          <div style={{ color: "#ff4466", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>100,000+ TAO (~$26.7M)</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            The mega-whales. The ones who single-handedly control large percentages of supply. At this level you're seeing Kraken, Yuma, and the Opentensor Foundation almost exclusively — the entities that define network centralization.
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff6b9d", margin: "0 0 12px 0" }}>Entity Categorization</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Raw wallet data is meaningless without context. "Kraken holds 670K TAO" is just a number until you understand that Kraken is a custodial exchange — meaning most of that TAO belongs to their customers, not to Kraken itself. I categorized entities into three types with color-coded tags:
        </p>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700 }}>EXCHANGE</div>
            <div style={{ color: "#4488ff", fontSize: "10px", background: "#4488ff20", padding: "3px 10px", borderRadius: "4px" }}>BLUE TAG</div>
          </div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Custodial platforms that hold customer TAO. Kraken, Binance, MEXC. Their large positions reflect customer deposits, not proprietary holdings. Lower systemic risk because the TAO is fragmented among many beneficial owners, even though it sits in a few wallets.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #aa66ff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <div style={{ color: "#aa66ff", fontSize: "14px", fontWeight: 700 }}>INSTITUTION</div>
            <div style={{ color: "#aa66ff", fontSize: "10px", background: "#aa66ff20", padding: "3px 10px", borderRadius: "4px" }}>PURPLE TAG</div>
          </div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Proprietary holders like Yuma (DCG subsidiary), Polychain Capital, and other crypto funds. These entities OWN their TAO directly. Their rebalancing decisions have the highest systemic risk because a single sell order represents real capital movement, not customer activity.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700 }}>FOUNDATION</div>
            <div style={{ color: "#ffaa00", fontSize: "10px", background: "#ffaa0020", padding: "3px 10px", borderRadius: "4px" }}>YELLOW TAG</div>
          </div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            The Opentensor Foundation and other nonprofit entities. These holdings typically fund development and ecosystem grants. Long-term oriented, low sell pressure, but significant supply influence because foundations often hold founder allocations.
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>What the Monitor Shows</h2>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Threshold Toggle</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Four buttons — 10K, 25K, 50K, 100K — filter the table by minimum TAO holding. Click to switch views instantly.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Entity Name + Type Tag</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Each row shows the entity name with a color-coded tag (EXCHANGE, INSTITUTION, or FOUNDATION). Immediate visual classification of what kind of holder it is.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>TAO + USD + Supply %</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Three different ways to measure each position: raw TAO amount, USD equivalent at current price, and percentage of circulating supply. Different metrics matter for different analyses.
          </p>
        </div>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", borderLeft: "3px solid #ff6b9d" }}>
          <div style={{ color: "#ff6b9d", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Wallet Count Per Entity</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Shows how many individual wallets are grouped under each entity. Kraken has 6, Yuma has 10. This reveals the operational sophistication of each holder.
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 12px 0" }}>Why I Built This Specifically</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The Whale Tracker shows individual wallets. The Concentration Monitor shows aggregated entities. Together they answer two different questions: "Who is the biggest single wallet?" (whale tracker) vs "Which institutions control the most supply?" (concentration monitor).
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          For investment decisions, the second question matters more. I don't care if Yuma's biggest wallet holds 80K or 120K TAO — I care that Yuma as an entity holds 19% of total supply. The concentration monitor makes that aggregation visible and lets me adjust the threshold to filter by whatever tier of holder I'm worried about that day.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          As a small retail investor with a Ridges AI position, this is the tool I use to sleep at night. If the concentration numbers start shifting dramatically — whales quietly exiting, institutions rebalancing — I can see it before the price moves. That's edge most retail investors don't have.
        </p>
      </div>

      <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: "#e8e8f0" }}>Disclaimer:</strong> Entity identification relies on publicly available labels from Taostats. Some large wallets remain unidentified or mislabeled. Exchange holdings represent customer deposits, not proprietary positions, and should be interpreted accordingly. This is a research tool, not financial advice.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Link href="/" style={{ color: "#00d4aa", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>← Back to Dashboard</Link>
      </div>
    </div>
  );
}