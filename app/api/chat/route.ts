import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  var body = await request.json();
  var { message, history, subnetData, taoPrice, networkStats } = body;

  var systemPrompt = "You are a Bittensor network expert embedded in a live analytics dashboard. You have access to real-time network data. Be concise, specific, and use actual numbers from the data provided. Answer in 2-4 short paragraphs max. Never use bullet points or markdown formatting - just plain text paragraphs.\n\nCURRENT LIVE DATA:\nTAO Price: $" + taoPrice + "\nNetwork: " + JSON.stringify(networkStats) + "\n\nTop Subnets by Emission:\n" + (subnetData || []).map(function(s: any) { return "SN" + s.netuid + " (" + s.name + "): " + s.emission + "% emission, " + s.miners + " miners, " + s.validators + " validators"; }).join("\n") + "\n\nKey facts about Bittensor:\n- Bittensor is a decentralized AI network with 128+ subnets\n- TAO is the native token with a 21M max supply\n- The first halving occurred Dec 14, 2025, cutting rewards to 0.5 TAO/block\n- Each subnet has miners (produce AI work) and validators (score miners)\n- Dynamic TAO (dTAO) launched Feb 2025, giving each subnet an alpha token\n- Subnets compete for emission share based on staking flows\n- Notable subnets: MyShell (voice/agents), Targon (GPU compute), Taoshi (trading), Pretrain (model training)\n\nIf asked about staking advice or investment decisions, always include a disclaimer that this is not financial advice.";

  var messages = (history || []).map(function(m: any) {
    return { role: m.role, content: m.content };
  });

  if (messages.length === 0 || messages[messages.length - 1].content !== message) {
    messages.push({ role: "user", content: message });
  }

  try {
    var response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 512,
        system: systemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      var err = await response.text();
      console.error("Chat API error:", err);
      return NextResponse.json({ error: "Chat failed" }, { status: 500 });
    }

    var data = await response.json();
    var text = data.content[0]?.text || "I couldn't generate a response.";
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}