import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { subnetData, taoPrice, networkStats } = await request.json();

  const prompt = `You are a Bittensor network analyst. Analyze this live data and provide 4-5 concise, specific insights. Use numbers and percentages. Be direct and analytical like a Bloomberg terminal analyst.

TAO Price: $${taoPrice}
Network Stats: ${JSON.stringify(networkStats)}

Top Subnets by Emission:
${subnetData.map((s: any) => `- SN${s.netuid} (${s.name}): ${s.emission}% emission, ${s.miners} miners, ${s.validators} validators`).join("\n")}

Write each insight as a short paragraph (2-3 sentences max). Focus on:
1. Which subnets dominate and why that matters
2. Concentration risk (how much emission goes to top 5 vs rest)
3. Miner/validator ratios and what they signal
4. Any notable patterns in the data
5. One actionable takeaway for someone allocating TAO

Do NOT use bullet points. Write in a professional, concise tone. Start each insight with a bold topic in caps like "EMISSION CONCENTRATION:" followed by the analysis.`;

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
