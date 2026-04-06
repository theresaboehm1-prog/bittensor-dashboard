import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { subnetData, taoPrice, networkStats } = await request.json();

  const prompt = `You are a senior crypto venture analyst at a top-tier fund like Dragonfly Capital. Analyze this live Bittensor data with a VC lens. Focus on three pillars: TRACTION (user growth, revenue, adoption metrics), PRACTICAL USE CASES (real-world applications beyond token speculation), and TEAM QUALITY (track record of delivering).

TAO Price: $${taoPrice}
Network Stats: ${JSON.stringify(networkStats)}

Top Subnets by Emission:
${subnetData.map((s: any) => `- SN${s.netuid} (${s.name}): ${s.emission}% emission, ${s.miners} miners, ${s.validators} validators`).join("\n")}

FUNDAMENTAL CONTEXT ON KEY SUBNETS:
- SN3 (MyShell): Voice/agent platform, millions of consumer users, backed by major VCs. Real product with App Store presence. Team previously built successful AI products.
- SN4 (Targon/Manifold): GPU compute marketplace, powers Dippy app (4M+ users), $10.5M Series A funding, projected $10.4M annual revenue.
- SN8 (Taoshi): Quantitative trading predictions, revenue-generating with paying customers using trading signals.
- SN9 (Pretrain/Macrocosmos): Produced Covenant 72B model (67.1 MMLU score, competitive with Meta Llama 2 70B). Trained by 70+ distributed contributors — proof that decentralized training works.
- SN64 (Chutes/Rayon Labs): Serverless AI compute, processed 9.1 trillion tokens, $5.5M+ annual revenue, claims 85% cheaper than AWS.
- SN19 (Nineteen/Rayon Labs): High-speed inference APIs, production-grade workloads.
- SN25 (Protein Folding): Drug discovery application — demonstrates Bittensor beyond crypto/AI speculation.
- SN5 (OpenKaito): Web3-native semantic search, real product used by researchers and traders.

MARKET CONTEXT:
- Grayscale filed for TAO spot ETF (April 2026) — institutional access catalyst
- Subnet token ecosystem reached $1.5B combined market cap (March 2026)
- TAO surged 90% in March 2026, driven by Covenant model success
- Jensen Huang and Chamath Palihapitiya endorsed Bittensor on All-In Podcast
- Network expanding from 128 to 256 subnets later in 2026
- First halving Dec 2025 cut daily emissions from 7,200 to 3,600 TAO

Write 5 insights as a VC analyst would. For each insight:
1. Start with a topic in caps like "TRACTION SIGNAL:" or "USE CASE VALIDATION:" or "TEAM ASSESSMENT:"
2. Reference specific numbers and subnet names
3. Give an investment-grade assessment (bullish/bearish/neutral with reasoning)
4. Keep each insight to 2-3 sentences max

Be direct, data-driven, and opinionated like a real VC analyst. Do NOT use bullet points.`;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
    }

    const data = await response.json();
    const text = data.content[0]?.text || "No analysis available.";
    return NextResponse.json({ analysis: text });
  } catch (error) {
    console.error("AI analyst error:", error);
    return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
  }
}
