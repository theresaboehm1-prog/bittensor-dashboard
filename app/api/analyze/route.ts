import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { subnetData, taoPrice, networkStats, riskScores, flowData, whaleData } = await request.json();

  const prompt = `You are a senior crypto venture analyst at a top-tier fund like Dragonfly Capital. You have access to comprehensive, real-time Bittensor network data. Produce a thorough investment briefing.

=== MARKET DATA ===
TAO Price: $${taoPrice}
Network: ${JSON.stringify(networkStats)}

=== TOP SUBNETS BY EMISSION ===
${(subnetData || []).map((s: any) => `- SN${s.netuid} (${s.name}): ${s.emission}% emission, ${s.miners} miners, ${s.validators} validators`).join("\n")}

=== RISK SCORES (0-100, higher = safer) ===
${(riskScores || []).slice(0, 15).map((r: any) => `- SN${r.netuid} (${r.name}): Score ${r.score}/100 [${r.label}] — Miner Diversity: ${r.minerScore}, Emission: ${r.emissionScore}, Validators: ${r.valScore}, Flow: ${r.flowScore}`).join("\n")}

=== MONEY FLOW (24H) ===
${(flowData || []).filter((f: any) => f.flow !== 0).slice(0, 20).map((f: any) => `- SN${f.netuid} (${f.name}): ${f.flow > 0 ? "+" : ""}${f.flow.toFixed(1)} TAO (${f.flow > 0 ? "INFLOW" : "OUTFLOW"})`).join("\n")}

=== TOP WHALE POSITIONS ===
${(whaleData || []).slice(0, 10).map((w: any) => `- ${w.name}: ${w.balance} TAO ($${w.usd})`).join("\n")}

=== FUNDAMENTAL CONTEXT ON KEY SUBNETS ===
- SN3 (MyShell): Voice/agent platform, millions of consumer users, backed by major VCs. Real product with App Store presence.
- SN4 (Targon/Manifold): GPU compute marketplace, powers Dippy app (4M+ users), $10.5M Series A, projected $10.4M annual revenue.
- SN8 (Taoshi): Quantitative trading predictions, revenue-generating with paying customers.
- SN9 (Pretrain/Macrocosmos): Produced Covenant 72B model (67.1 MMLU score, competitive with Meta Llama 2 70B). Trained by 70+ distributed contributors.
- SN64 (Chutes/Rayon Labs): Serverless AI compute, processed 9.1 trillion tokens, $5.5M+ annual revenue, claims 85% cheaper than AWS.
- SN19 (Nineteen/Rayon Labs): High-speed inference APIs, production-grade workloads.
- SN25 (Protein Folding): Drug discovery application — demonstrates Bittensor beyond crypto/AI.
- SN5 (OpenKaito): Web3-native semantic search, real product used by researchers and traders.

=== MARKET CONTEXT ===
- Grayscale filed for TAO spot ETF (April 2026)
- Jensen Huang and Chamath Palihapitiya endorsed Bittensor on All-In Podcast (March 2026)
- TAO surged 90% in March 2026, driven by Covenant 72B model success
- Subnet token ecosystem reached $1.5B combined market cap
- Network expanding from 128 to 256 subnets later in 2026
- First halving Dec 2025 cut daily emissions from 7,200 to 3,600 TAO
- Yuma (DCG subsidiary) is contributing to 14 different subnets

=== YOUR TASK ===
Write 5-6 insights as a VC analyst would. For each insight:
1. Start with a topic in caps like "TRACTION SIGNAL:" or "RISK ALERT:" or "FLOW DIVERGENCE:" or "WHALE MOVEMENT:" or "ALLOCATION STRATEGY:"
2. Cross-reference multiple data sources (combine risk scores with flow data, emission with whale positions)
3. Be specific — use exact numbers from the data above
4. Give an investment-grade assessment (bullish/bearish/neutral with reasoning)
5. Keep each insight to 2-3 sentences max

Focus on actionable intelligence — what should a TAO holder DO based on this data? Do NOT use bullet points.`;

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
        max_tokens: 1500,
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