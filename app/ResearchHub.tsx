"use client";

import { useState } from "react";

type SubnetInfo = {
  netuid: number;
  name: string;
  category: string;
  description: string;
  useCase: string;
  highlight?: string;
};

const SUBNET_DATABASE: SubnetInfo[] = [
  { netuid: 1, name: "Apex (Macrocosmos)", category: "LLM / Text", description: "Decentralized large language model inference and agentic workflows. One of the original Bittensor subnets.", useCase: "Powers decentralized text generation, chatbots, and AI agent pipelines.", highlight: "Original subnet — foundational to the Bittensor ecosystem" },
  { netuid: 3, name: "MyShell", category: "Voice / Agents", description: "AI agent and voice platform with millions of users. Builds on decentralized compute for scalable AI experiences.", useCase: "Consumer-facing AI voice assistants, character AI, and agent deployment.", highlight: "Currently #1 by emission — highest earning subnet on the network" },
  { netuid: 4, name: "Targon (Manifold)", category: "Compute", description: "Decentralized GPU compute marketplace. Provides inference infrastructure for AI models at scale.", useCase: "On-demand GPU compute for AI inference, powering apps like Dippy (4M+ users).", highlight: "#2 by emission — backbone compute infrastructure for the ecosystem" },
  { netuid: 8, name: "Taoshi", category: "Trading / Finance", description: "Quantitative trading predictions using AI/ML models. Miners compete to produce the most accurate financial forecasts.", useCase: "Algorithmic trading signals, market predictions, financial data analysis.", highlight: "Leading DeFi-oriented subnet — bridges AI and financial markets" },
  { netuid: 9, name: "Pretrain (Macrocosmos)", category: "Model Training", description: "Decentralized foundation model training. Produced the 72B-parameter Covenant model in collaboration with the community.", useCase: "Training large-scale AI models using distributed compute across the Bittensor network.", highlight: "Produced Covenant — a 72B parameter model trained entirely on Bittensor" },
  { netuid: 5, name: "OpenKaito", category: "Search / Data", description: "Decentralized AI-powered search across crypto and Web3 content. Indexes social media, research, and market data.", useCase: "Semantic search for crypto research, sentiment analysis, and trend discovery.", highlight: "AI-powered search engine purpose-built for Web3 intelligence" },
  { netuid: 19, name: "Nineteen (Rayon Labs)", category: "Inference", description: "High-frequency AI inference for text and image generation. Optimized for speed and throughput.", useCase: "Real-time AI inference APIs for applications needing fast text and image generation.", highlight: "Fastest inference subnet — optimized for production-grade API workloads" },
  { netuid: 64, name: "Chutes (Rayon Labs)", category: "Serverless Compute", description: "Serverless AI compute platform. Claims to provide compute at 85% lower cost than traditional cloud providers like AWS.", useCase: "Deploy AI models as serverless functions with automatic scaling and pay-per-use pricing.", highlight: "85% cheaper than AWS — strongest cost-efficiency pitch in the ecosystem" },
  { netuid: 75, name: "PatternX", category: "Pattern Recognition", description: "Pattern recognition and anomaly detection across data streams. Miners compete on detection accuracy.", useCase: "Fraud detection, network security monitoring, anomaly detection in financial and operational data.", highlight: "Top 3 by emission — rapid growth in pattern recognition applications" },
  { netuid: 120, name: "Hyperliquid TAO", category: "DeFi Bridge", description: "Bridges Bittensor subnet intelligence with Hyperliquid DeFi protocols. Connects AI predictions with on-chain trading.", useCase: "DeFi integration, AI-powered trading on Hyperliquid, cross-chain intelligence.", highlight: "Novel DeFi x AI bridge — one of the fastest-growing subnets" },
  { netuid: 25, name: "Protein Folding", category: "BioTech / Science", description: "Decentralized protein structure prediction. Miners compete to predict 3D protein structures from amino acid sequences.", useCase: "Drug discovery, molecular biology research, computational biochemistry.", highlight: "Science-focused subnet — demonstrates Bittensor beyond pure AI/crypto" },
  { netuid: 37, name: "Finetuning (Macrocosmos)", category: "Model Training", description: "Decentralized model fine-tuning. Enables the community to specialize foundation models for specific tasks.", useCase: "Custom model training, domain adaptation, task-specific AI model optimization.", highlight: "Complements SN9 (Pretrain) — together they cover the full training pipeline" },
];

const CATEGORIES = ["All", "LLM / Text", "Voice / Agents", "Compute", "Trading / Finance", "Model Training", "Search / Data", "Inference", "Serverless Compute", "Pattern Recognition", "DeFi Bridge", "BioTech / Science"];

const CATEGORY_COLORS: Record<string, string> = {
  "LLM / Text": "#00d4aa",
  "Voice / Agents": "#ff6b9d",
  "Compute": "#4488ff",
  "Trading / Finance": "#ffaa00",
  "Model Training": "#aa66ff",
  "Search / Data": "#ff8844",
  "Inference": "#00d4aa",
  "Serverless Compute": "#4488ff",
  "Pattern Recognition": "#ff4466",
  "DeFi Bridge": "#ffaa00",
  "BioTech / Science": "#66ddaa",
};

function SubnetCard({ subnet }: { subnet: SubnetInfo }) {
  const catColor = CATEGORY_COLORS[subnet.category] || "#555566";
  return (
    <a href={"/subnet/" + subnet.netuid} style={{ textDecoration: "none" }}>
      <div style={{ background: "#1a1a25", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "16px", cursor: "pointer", height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <div>
            <span style={{ color: "#e8e8f0", fontWeight: 700, fontSize: "15px" }}>{subnet.name}</span>
            <span style={{ color: "#555566", marginLeft: "8px", fontSize: "11px" }}>SN{subnet.netuid}</span>
          </div>
          <span style={{ background: catColor + "20", color: catColor, padding: "2px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: 600, whiteSpace: "nowrap" }}>{subnet.category}</span>
        </div>
        <p style={{ color: "#8888a0", fontSize: "12px", lineHeight: 1.5, marginBottom: "8px" }}>{subnet.description}</p>
        <div style={{ marginBottom: "8px" }}>
          <span style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Use Case</span>
          <p style={{ color: "#e8e8f0", fontSize: "11px", lineHeight: 1.4, marginTop: "2px" }}>{subnet.useCase}</p>
        </div>
        {subnet.highlight && (
          <div style={{ background: "#00d4aa10", border: "1px solid #00d4aa30", borderRadius: "4px", padding: "6px 10px" }}>
            <span style={{ color: "#00d4aa", fontSize: "11px" }}>{"◆ " + subnet.highlight}</span>
          </div>
        )}
      </div>
    </a>
  );
}

export default function ResearchHub() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = SUBNET_DATABASE.filter(function(s) {
    var matchCat = selectedCategory === "All" || s.category === selectedCategory;
    var matchSearch = searchQuery === "" || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: 0 }}>Subnet Research Hub</h2>
        <input type="text" placeholder="Search subnets..." value={searchQuery} onChange={function(e) { setSearchQuery(e.target.value); }} style={{ background: "#1e1e2e", border: "1px solid #2a2a3a", borderRadius: "4px", color: "#e8e8f0", padding: "6px 12px", fontSize: "13px", fontFamily: "inherit", width: "200px" }} />
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
        {CATEGORIES.map(function(cat) {
          return (
            <button key={cat} onClick={function() { setSelectedCategory(cat); }} style={{ background: selectedCategory === cat ? "#00d4aa" : "#1e1e2e", color: selectedCategory === cat ? "#0a0a0f" : "#8888a0", border: "none", borderRadius: "4px", padding: "4px 10px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{cat}</button>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "12px" }}>
        {filtered.map(function(subnet) {
          return <SubnetCard key={subnet.netuid} subnet={subnet} />;
        })}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#555566" }}>No subnets match your search.</div>
      )}
    </div>
  );
}
