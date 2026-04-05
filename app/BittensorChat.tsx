"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type SubnetData = {
  netuid: number;
  name: string;
  emission: string;
  miners: number;
  validators: number;
};

export default function BittensorChat({ subnetData, taoPrice, networkStats }: { subnetData: SubnetData[]; taoPrice: number; networkStats: any }) {
  var [isOpen, setIsOpen] = useState(false);
  var [messages, setMessages] = useState<Message[]>([]);
  var [input, setInput] = useState("");
  var [loading, setLoading] = useState(false);
  var messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(function() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function sendMessage() {
    if (!input.trim() || loading) return;
    var userMsg = input.trim();
    setInput("");
    var newMessages = messages.concat([{ role: "user" as const, content: userMsg }]);
    setMessages(newMessages);
    setLoading(true);
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg, history: newMessages.slice(-10), subnetData: subnetData, taoPrice: taoPrice, networkStats: networkStats }),
    })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.response) {
          setMessages(newMessages.concat([{ role: "assistant" as const, content: data.response }]));
        } else {
          setMessages(newMessages.concat([{ role: "assistant" as const, content: "Sorry, I couldn't process that. Please try again." }]));
        }
        setLoading(false);
      })
      .catch(function() {
        setMessages(newMessages.concat([{ role: "assistant" as const, content: "Connection error. Please try again." }]));
        setLoading(false);
      });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!isOpen) {
    return (
      <button onClick={function() { setIsOpen(true); }} style={{ position: "fixed", bottom: "24px", right: "24px", width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg, #00d4aa, #4488ff)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0, 212, 170, 0.4)", zIndex: 1000, fontSize: "24px" }} title="Ask AI about Bittensor">
        <span style={{ color: "#ffffff", fontSize: "28px" }}>AI</span>
      </button>
    );
  }

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", width: "420px", height: "600px", background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "16px", display: "flex", flexDirection: "column", boxShadow: "0 8px 40px rgba(0, 0, 0, 0.6)", zIndex: 1000, overflow: "hidden" }}>
      <div style={{ background: "linear-gradient(135deg, #00d4aa, #4488ff)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#ffffff", fontSize: "15px", fontWeight: 700 }}>Bittensor AI Assistant</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>Ask anything about the network</div>
        </div>
        <button onClick={function() { setIsOpen(false); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", color: "#ffffff", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>x</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ color: "#555566", fontSize: "13px", marginBottom: "16px" }}>Try asking:</div>
            {["Which subnet earns the most TAO?", "What is Bittensor and how does it work?", "Compare MyShell vs Targon", "Where should I stake my TAO?", "What is the current TAO price?"].map(function(q) {
              return (
                <button key={q} onClick={function() { setInput(q); }} style={{ display: "block", width: "100%", background: "#1a1a25", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "10px 14px", color: "#8888a0", fontSize: "12px", cursor: "pointer", fontFamily: "inherit", textAlign: "left", marginBottom: "6px" }}>{q}</button>
              );
            })}
          </div>
        )}
        {messages.map(function(msg, i) {
          var isUser = msg.role === "user";
          return (
            <div key={i} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
              <div style={{ background: isUser ? "#00d4aa" : "#1a1a25", color: isUser ? "#0a0a0f" : "#e8e8f0", padding: "10px 14px", borderRadius: isUser ? "12px 12px 4px 12px" : "12px 12px 12px 4px", maxWidth: "85%", fontSize: "13px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{msg.content}</div>
            </div>
          );
        })}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#1a1a25", padding: "12px 16px", borderRadius: "12px 12px 12px 4px", color: "#00d4aa", fontSize: "13px" }}>Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid #1e1e2e", display: "flex", gap: "8px" }}>
        <input type="text" value={input} onChange={function(e) { setInput(e.target.value); }} onKeyDown={handleKeyDown} placeholder="Ask about Bittensor..." style={{ flex: 1, background: "#1a1a25", border: "1px solid #2a2a3a", borderRadius: "8px", color: "#e8e8f0", padding: "10px 14px", fontSize: "13px", fontFamily: "inherit", outline: "none" }} />
        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ background: loading || !input.trim() ? "#1e1e2e" : "linear-gradient(135deg, #00d4aa, #4488ff)", color: loading || !input.trim() ? "#555566" : "#ffffff", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", fontWeight: 700, cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontFamily: "inherit" }}>Send</button>
      </div>
    </div>
  );
}