import Link from "next/link";

export default function AIMethodologyPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px", color: "#e8e8f0" }}>
      <Link href="/" style={{ color: "#00d4aa", fontSize: "12px", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>← Back to Dashboard</Link>

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#e8e8f0", margin: "0 0 8px 0" }}>
          <span style={{ color: "#00d4aa" }}>◆</span> AI Network Analyst Methodology
        </h1>
        <p style={{ color: "#8888a0", fontSize: "14px", margin: 0 }}>How I built an AI analyst that cross-references 6 live data sources</p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>The Origin</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          A professional crypto analyst covering Bittensor would need to check all 129 subnets, compare emission shares, read flow data, cross-reference risk scores, track whale positions, and synthesize it all into a recommendation. That's 3-4 hours of work. I wanted to compress that into 30 seconds using AI.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          But generic AI chatbots don't know current Bittensor data — they only know what was in their training set months ago. So I built a system that injects live dashboard data AND live web search results into Claude before it writes the analysis. The result is like having a Bloomberg Terminal that actually tells you what to do, not just shows you data.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 16px 0" }}>The 6 Data Sources I Connected</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#8888a0", marginBottom: "20px" }}>
          Every time you click "Run AI Analysis," the system gathers these 6 data sources and feeds them all into Claude's context window simultaneously:
        </p>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>1. Subnet Emission Data</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 6px 0", lineHeight: 1.6 }}>
            Live emission percentages for every active subnet — e.g. MyShell 3.43%, Targon 2.44%, PatternX 1.82%.
          </p>
          <p style={{ fontSize: "12px", color: "#555566", margin: 0, lineHeight: 1.5 }}>
            <strong>Source:</strong> Taostats API (<code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>subnet/latest/v1</code>)
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>2. My Proprietary Risk Scores</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 6px 0", lineHeight: 1.6 }}>
            Every subnet's 0-100 risk score plus the individual factor breakdowns (miner diversity, emission strength, validator coverage, flow momentum, capacity utilization).
          </p>
          <p style={{ fontSize: "12px", color: "#555566", margin: 0, lineHeight: 1.5 }}>
            <strong>Source:</strong> Calculated on the client, shared via <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>window.__riskScores</code>
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>3. 24-Hour Money Flow</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 6px 0", lineHeight: 1.6 }}>
            Net TAO flowing in/out of every subnet pool in the last 24 hours. Tells the AI which subnets are seeing real investor demand right now.
          </p>
          <p style={{ fontSize: "12px", color: "#555566", margin: 0, lineHeight: 1.5 }}>
            <strong>Source:</strong> Taostats API (<code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>dtao/tao_flow/v1</code>), shared via <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>window.__flowData</code>
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>4. Top Whale Positions</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 6px 0", lineHeight: 1.6 }}>
            The top 10 largest TAO stakers with entity names, amounts, and USD values. Kraken, Polychain, Yuma/DCG, and other institutions.
          </p>
          <p style={{ fontSize: "12px", color: "#555566", margin: 0, lineHeight: 1.5 }}>
            <strong>Source:</strong> Taostats Accounts API, shared via <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>window.__whaleData</code>
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>5. Fundamental Context (Hand-Written)</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 6px 0", lineHeight: 1.6 }}>
            I manually researched and wrote fundamental context for each major subnet directly into the prompt. The API doesn't provide this — I had to gather it myself from news, funding announcements, and VC research.
          </p>
          <div style={{ fontSize: "12px", color: "#8888a0", lineHeight: 1.7, marginTop: "8px", padding: "10px", background: "#0a0a14", borderRadius: "4px" }}>
            • MyShell: millions of consumer users, VC-backed, App Store presence<br />
            • Targon: powers Dippy (4M+ users), $10.5M Series A, $10.4M projected revenue<br />
            • Chutes: 9.1 trillion tokens processed, $5.5M+ annual revenue<br />
            • Pretrain: produced Covenant 72B model (67.1 MMLU, competitive with Llama 2 70B)<br />
            • Grayscale filed for TAO ETF (April 2026)<br />
            • Jensen Huang and Chamath endorsed Bittensor<br />
            • First halving Dec 2025 cut emissions from 7,200 to 3,600 TAO/day
          </div>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ff6b9d" }}>
          <div style={{ color: "#ff6b9d", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>6. Live Web Search Results</div>
          <p style={{ fontSize: "13px", color: "#e8e8f0", margin: "0 0 6px 0", lineHeight: 1.6 }}>
            Claude searches the web for the latest Bittensor news, TAO price movements, subnet announcements, and partnerships from the past 7 days — THEN incorporates what it finds into the analysis alongside the dashboard data.
          </p>
          <p style={{ fontSize: "12px", color: "#555566", margin: 0, lineHeight: 1.5 }}>
            <strong>Source:</strong> Anthropic's web search tool (<code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>web_search_20250305</code>)
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffaa00", margin: "0 0 12px 0" }}>Prompt Engineering</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Raw data isn't enough — the AI needs direction. I engineered the prompt to position Claude as a specific type of analyst with specific priorities:
        </p>
        <div style={{ background: "#0a0a14", borderRadius: "6px", padding: "16px", fontSize: "12px", color: "#8888a0", lineHeight: 1.7, marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <em style={{ color: "#e8e8f0" }}>"You are a senior crypto venture analyst at a top-tier fund like Dragonfly Capital. Produce a thorough investment briefing. Focus on three pillars: TRACTION (user growth, revenue, adoption), PRACTICAL USE CASES (real-world applications beyond token speculation), and TEAM QUALITY (track record of delivering)."</em>
        </div>
        <p style={{ fontSize: "13px", color: "#8888a0", lineHeight: 1.6, margin: 0 }}>
          This framing came from feedback I received — a Dragonfly Capital analyst told me real VCs evaluate early-stage crypto projects on traction, use cases, and team, not just tokenomics. I baked that framework directly into the system prompt so every analysis reflects how real investors think.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff6b9d", margin: "0 0 12px 0" }}>The Technical Flow</h2>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", fontFamily: "Consolas, monospace", fontSize: "12px", lineHeight: 1.9 }}>
          <div style={{ color: "#e8e8f0" }}>1. User clicks "Run AI Analysis"</div>
          <div style={{ color: "#555566" }}>     ↓</div>
          <div style={{ color: "#00d4aa" }}>2. Browser collects all 5 dashboard data sources</div>
          <div style={{ color: "#555566" }}>     ↓</div>
          <div style={{ color: "#4488ff" }}>3. POST request to my server route (/api/analyze)</div>
          <div style={{ color: "#555566" }}>     ↓</div>
          <div style={{ color: "#ffaa00" }}>4. Server builds the master prompt with all data</div>
          <div style={{ color: "#555566" }}>     ↓</div>
          <div style={{ color: "#ff6b9d" }}>5. Server calls Anthropic API with web_search tool</div>
          <div style={{ color: "#555566" }}>     ↓</div>
          <div style={{ color: "#aa66ff" }}>6. Claude searches web + reads all context</div>
          <div style={{ color: "#555566" }}>     ↓</div>
          <div style={{ color: "#00d4aa" }}>7. Claude writes 5-6 VC-grade insights</div>
          <div style={{ color: "#555566" }}>     ↓</div>
          <div style={{ color: "#e8e8f0" }}>8. Server cleans citations, sends text to browser</div>
          <div style={{ color: "#555566" }}>     ↓</div>
          <div style={{ color: "#e8e8f0" }}>9. Browser renders each insight as a colored card</div>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#aa66ff", margin: "0 0 12px 0" }}>Security: The API Proxy Pattern</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The Anthropic API key is stored as an environment variable on my server — never in the browser. If I put it in client-side code, anyone could open Chrome DevTools, steal it, and drain my credits.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          Instead, the browser calls MY server at <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>/api/analyze</code>, my server attaches the API key and forwards the request to Anthropic. The key never reaches the browser. This is the same pattern production apps like Stripe and Vercel use.
        </p>
      </div>
      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ff6b9d", margin: "0 0 12px 0" }}>Setting Up the Anthropic API</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The AI analyst doesn't come for free. Using Claude through the API required real setup steps and actual money out of pocket — here's exactly what I did:
        </p>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #00d4aa" }}>
          <div style={{ color: "#00d4aa", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>1. Created an Anthropic Developer Account</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Signed up at console.anthropic.com to get access to Claude's API. This is separate from the consumer Claude.ai account — developer access unlocks programmatic use through API endpoints.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #4488ff" }}>
          <div style={{ color: "#4488ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>2. Generated an API Key</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Created a secret API key that authenticates every request to Anthropic's servers. This key starts with <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>sk-ant-api03-...</code> and is treated like a password — if it leaks, someone can drain your credits.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ffaa00" }}>
          <div style={{ color: "#ffaa00", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>3. Purchased $5 in API Credits</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            The Anthropic API is pay-as-you-go — no free tier for production use. I bought $5 worth of credits with a credit card. This is enough for roughly 150 full analyses, more than enough for the semester and the live demo.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #ff6b9d" }}>
          <div style={{ color: "#ff6b9d", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>4. Stored the Key as an Environment Variable</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Added the key to a <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>.env.local</code> file locally and to Vercel's environment variable settings for production. Environment variables are never committed to GitHub and never exposed to the browser — they only exist on the server where the API call happens.
          </p>
        </div>

        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "16px", marginBottom: "12px", borderLeft: "3px solid #aa66ff" }}>
          <div style={{ color: "#aa66ff", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>5. Wrote a Server-Side API Route</div>
          <p style={{ fontSize: "13px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
            Created <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#00d4aa" }}>app/api/analyze/route.ts</code> — a Next.js serverless function that receives requests from my browser, attaches the API key, forwards the request to Anthropic, and returns the response. The key never leaves my server.
          </p>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 12px 0" }}>Adding Live Web Search</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          The first version of my AI analyst only saw dashboard data. It was good, but it couldn't reference news. If Grayscale just filed for a TAO ETF yesterday, Claude wouldn't know about it because that event happened after its training cutoff.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Then I discovered Anthropic had just released a web search tool for the API. By adding a single parameter to my API call, Claude gains the ability to search the internet BEFORE writing its response. I added it to the request body like this:
        </p>
        <div style={{ background: "#0a0a14", borderRadius: "6px", padding: "16px", fontFamily: "Consolas, monospace", fontSize: "12px", lineHeight: 1.7, color: "#00d4aa", marginBottom: "12px", overflowX: "auto" }}>
          <div>tools: [&#123;</div>
          <div>{"  "}type: "web_search_20250305",</div>
          <div>{"  "}name: "web_search"</div>
          <div>&#125;],</div>
        </div>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          I also updated my prompt to explicitly instruct Claude: <em style={{ color: "#00d4aa" }}>"BEFORE writing your analysis, search the web for the latest Bittensor news, TAO price movements, subnet announcements, and any recent partnerships or catalysts from the past 7 days. Incorporate what you find into your analysis alongside the live data above."</em>
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          The result: every analysis now combines live dashboard data, hand-written fundamental context, AND real-time web news. No other Bittensor tool does this — and the whole upgrade cost me nothing beyond what I was already paying per analysis.
        </p>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffaa00", margin: "0 0 12px 0" }}>Debugging the Output</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Adding web search introduced a new problem I didn't expect: the response format changed. Without web search, Claude returns one clean text block. WITH web search, the response contains multiple content blocks — search results, citations, and the final text all mixed together. When I first deployed it, the output had weird mid-sentence line breaks and citation markers like <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#ff4466" }}>[1]</code> and <code style={{ background: "#0a0a14", padding: "2px 6px", borderRadius: "3px", color: "#ff4466" }}>【2】</code> inserted randomly.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          I had to write a cleanup function that strips these artifacts before displaying the analysis. The fix involved:
        </p>
        <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "12px", fontSize: "13px", color: "#8888a0", lineHeight: 1.7 }}>
          • Filtering for only text blocks in the response<br />
          • Joining them with spaces instead of newlines<br />
          • Stripping Unicode and ASCII citation brackets with regex<br />
          • Removing orphaned commas and "while" fragments<br />
          • Normalizing paragraph spacing
        </div>
      </div>
      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#00d4aa", margin: "0 0 12px 0" }}>Cost Economics</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          Each analysis uses approximately:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "14px" }}>
            <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", marginBottom: "4px" }}>Input Tokens</div>
            <div style={{ color: "#00d4aa", fontSize: "20px", fontWeight: 700 }}>~2,500</div>
            <div style={{ color: "#555566", fontSize: "11px" }}>dashboard data + prompt</div>
          </div>
          <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "14px" }}>
            <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", marginBottom: "4px" }}>Output Tokens</div>
            <div style={{ color: "#4488ff", fontSize: "20px", fontWeight: 700 }}>~1,500</div>
            <div style={{ color: "#555566", fontSize: "11px" }}>the VC briefing</div>
          </div>
          <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "14px" }}>
            <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", marginBottom: "4px" }}>Cost Per Run</div>
            <div style={{ color: "#ffaa00", fontSize: "20px", fontWeight: 700 }}>~$0.03</div>
            <div style={{ color: "#555566", fontSize: "11px" }}>includes web search</div>
          </div>
          <div style={{ background: "#1a1a25", borderRadius: "6px", padding: "14px" }}>
            <div style={{ color: "#555566", fontSize: "11px", textTransform: "uppercase", marginBottom: "4px" }}>Total Runs on $5</div>
            <div style={{ color: "#ff6b9d", fontSize: "20px", fontWeight: 700 }}>~150</div>
            <div style={{ color: "#555566", fontSize: "11px" }}>plenty for the demo</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#4488ff", margin: "0 0 12px 0" }}>Why This Is Unique</h2>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: "0 0 12px 0" }}>
          No other Bittensor tool does this. Taostats shows raw data. CoinGecko shows prices. SubnetAlpha shows scoring. None of them combine live on-chain data with live web news and AI synthesis in a single click.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#e8e8f0", margin: 0 }}>
          A professional VC analyst would need 3-4 hours to produce equivalent analysis. My system does it in 30 seconds for 3 cents. That's the power of combining live APIs, AI, and thoughtful prompt engineering.
        </p>
      </div>

      <div style={{ background: "#1a1a25", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", color: "#8888a0", margin: 0, lineHeight: 1.6 }}>
          <strong style={{ color: "#e8e8f0" }}>Disclaimer:</strong> The AI Network Analyst is a research tool, not financial advice. AI can make mistakes. Always verify insights against primary sources before making investment decisions.
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Link href="/" style={{ color: "#00d4aa", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>← Back to Dashboard</Link>
      </div>
    </div>
  );
}