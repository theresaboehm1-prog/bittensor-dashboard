"use client";
import React from "react";
import { useEffect, useState } from "react";

var SUBNET_SOCIALS = [
  { netuid: 1, name: "Apex (Macrocosmos)", twitter: "https://x.com/macrocosmos_ai", github: "https://github.com/macrocosm-os", website: "https://macrocosmos.ai", category: "LLM / Text" },
  { netuid: 3, name: "MyShell", twitter: "https://x.com/myshell_ai", github: "https://github.com/myshell-ai", website: "https://myshell.ai", category: "Voice / Agents" },
  { netuid: 4, name: "Targon (Manifold)", twitter: "https://x.com/manifaboroldlabs", github: "https://github.com/manifold-inc", website: "https://manifold.inc", category: "Compute" },
  { netuid: 5, name: "OpenKaito", twitter: "https://x.com/OpenKaito", github: null, website: "https://openkaito.com", category: "Search / Data" },
  { netuid: 8, name: "Taoshi", twitter: "https://x.com/taoshi_io", github: "https://github.com/taoshi-io", website: "https://taoshi.io", category: "Trading" },
  { netuid: 9, name: "Pretrain (Macrocosmos)", twitter: "https://x.com/macrocosmos_ai", github: "https://github.com/macrocosm-os", website: "https://macrocosmos.ai", category: "Model Training" },
  { netuid: 19, name: "Nineteen (Rayon Labs)", twitter: "https://x.com/RayonLabs", github: "https://github.com/namoray/nineteen", website: null, category: "Inference" },
  { netuid: 64, name: "Chutes (Rayon Labs)", twitter: "https://x.com/RayonLabs", github: null, website: "https://chutes.ai", category: "Serverless" },
  { netuid: 75, name: "PatternX", twitter: null, github: null, website: null, category: "Pattern Recognition" },
  { netuid: 120, name: "Hyperliquid TAO", twitter: null, github: null, website: null, category: "DeFi" },
];

var ECOSYSTEM_LINKS = [
  { name: "Bittensor Official", twitter: "https://x.com/bittensor_", website: "https://bittensor.com", description: "Official Bittensor protocol account" },
  { name: "Opentensor Foundation", twitter: "https://x.com/OpenTensor", website: "https://opentensor.ai", description: "Core development team" },
  { name: "Taostats", twitter: "https://x.com/taostats", website: "https://taostats.io", description: "Block explorer and analytics" },
  { name: "Siam Kidd", twitter: "https://x.com/SiamKidd", website: null, description: "Top Bittensor analyst and content creator" },
  { name: "Mark Jeffrey", twitter: "https://x.com/markjeffrey", website: null, description: "Subnet analysis and Bittensor commentary" },
  { name: "Bittensor Discord", twitter: null, website: "https://discord.gg/bittensor", description: "Community hub — 46K+ members" },
  { name: "SubnetAlpha", twitter: null, website: "https://subnetalpha.ai", description: "Subnet scoring and analytics platform" },
];

var TWITTER_FEEDS = [
  { handle: "SiamKidd", name: "Siam Kidd", description: "Top Bittensor analyst" },
  { handle: "markjeffrey", name: "Mark Jeffrey", description: "Subnet commentary" },
  { handle: "bittensor_", name: "Bittensor", description: "Official account" },
];

function TwitterEmbed({ handle }: { handle: string }) {
  useEffect(function() {
    var s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    document.body.appendChild(s);
  }, [handle]);

  var url = "https://twitter.com/" + handle;
  var text = "Loading @" + handle;

  return React.createElement("div", { style: { flex: "1 1 300px", minWidth: "280px" } },
    React.createElement("a", {
      className: "twitter-timeline",
      "data-theme": "dark",
      "data-height": "400",
      "data-chrome": "noheader nofooter noborders transparent",
      href: url
    }, text)
  );
}

export default function SubnetSocial() {
  var [showFeeds, setShowFeeds] = useState(false);

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Subnet Social & News Hub</h2>
        <p style={{ color: "#555566", fontSize: "11px" }}>Live feeds from top analysts and official channels — follow for alpha on upcoming catalysts</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ color: "#8888a0", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Live Feeds</div>
          <button onClick={function() { setShowFeeds(!showFeeds); }} style={{ background: showFeeds ? "#ff4466" : "linear-gradient(135deg, #00d4aa, #4488ff)", color: "#ffffff", border: "none", borderRadius: "6px", padding: "6px 14px", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            {showFeeds ? "Hide Feeds" : "Show Live Twitter Feeds"}
          </button>
        </div>

        {showFeeds && (
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
            {TWITTER_FEEDS.map(function(feed) {
              return (
                <div key={feed.handle} style={{ flex: "1 1 300px", background: "#1a1a25", borderRadius: "8px", padding: "12px", minWidth: "280px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <div>
                      <span style={{ color: "#e8e8f0", fontSize: "13px", fontWeight: 600 }}>{feed.name}</span>
                      <span style={{ color: "#4488ff", fontSize: "11px", marginLeft: "6px" }}>@{feed.handle}</span>
                    </div>
                    <span style={{ color: "#555566", fontSize: "10px" }}>{feed.description}</span>
                  </div>
                  <TwitterEmbed handle={feed.handle} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ color: "#8888a0", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Ecosystem</div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {ECOSYSTEM_LINKS.map(function(link) {
            return (
              <div key={link.name} style={{ background: "#1a1a25", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "12px", flex: "1 1 200px" }}>
                <div style={{ color: "#e8e8f0", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{link.name}</div>
                <div style={{ color: "#555566", fontSize: "10px", marginBottom: "8px" }}>{link.description}</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {link.twitter && <a href={link.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "#4488ff", fontSize: "11px", textDecoration: "none" }}>X/Twitter ↗</a>}
                  {link.website && <a href={link.website} target="_blank" rel="noopener noreferrer" style={{ color: "#00d4aa", fontSize: "11px", textDecoration: "none" }}>Website ↗</a>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ color: "#8888a0", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Subnet Teams</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px" }}>
          {SUBNET_SOCIALS.map(function(s) {
            var hasLinks = s.twitter || s.github || s.website;
            return (
              <div key={s.netuid} style={{ background: "#1a1a25", border: "1px solid #1e1e2e", borderRadius: "6px", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: "#e8e8f0", fontSize: "12px", fontWeight: 600 }}>{s.name}</span>
                  <span style={{ color: "#555566", fontSize: "10px", marginLeft: "6px" }}>SN{s.netuid}</span>
                  <div style={{ color: "#555566", fontSize: "10px", marginTop: "2px" }}>{s.category}</div>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  {s.twitter && <a href={s.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "#4488ff", fontSize: "10px", textDecoration: "none", background: "#4488ff15", padding: "3px 8px", borderRadius: "4px" }}>X</a>}
                  {s.github && <a href={s.github} target="_blank" rel="noopener noreferrer" style={{ color: "#e8e8f0", fontSize: "10px", textDecoration: "none", background: "#ffffff10", padding: "3px 8px", borderRadius: "4px" }}>Git</a>}
                  {s.website && <a href={s.website} target="_blank" rel="noopener noreferrer" style={{ color: "#00d4aa", fontSize: "10px", textDecoration: "none", background: "#00d4aa15", padding: "3px 8px", borderRadius: "4px" }}>Web</a>}
                  {!hasLinks && <span style={{ color: "#555566", fontSize: "10px" }}>No links</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: "16px", padding: "12px", background: "#1a1a25", borderRadius: "6px" }}>
        <div style={{ color: "#8888a0", fontSize: "11px", fontWeight: 600, marginBottom: "4px" }}>Pro Tip</div>
        <div style={{ color: "#555566", fontSize: "11px", lineHeight: 1.6 }}>Follow Siam Kidd and Mark Jeffrey for the best Bittensor alpha. Major subnet announcements often move alpha token prices 10-50% within hours. Click "Show Live Twitter Feeds" above to see their latest posts without leaving the dashboard.</div>
      </div>
    </div>
  );
}