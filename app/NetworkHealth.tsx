"use client";

type SubnetHealth = {
  netuid: number;
  name: string;
  emission: number;
  miners: number;
  validators: number;
  regAllowed: boolean;
};

function getHealthStatus(s: SubnetHealth): { status: string; color: string } {
  var score = 0;
  if (s.miners > 10) { score += 2; } else if (s.miners > 2) { score += 1; }
  if (s.validators > 3) { score += 2; } else if (s.validators > 1) { score += 1; }
  if (s.emission > 0.5) { score += 2; } else if (s.emission > 0.1) { score += 1; }
  if (s.regAllowed) { score += 1; }
  if (score >= 6) { return { status: "Healthy", color: "#00d4aa" }; }
  if (score >= 4) { return { status: "Warning", color: "#ffaa00" }; }
  return { status: "Critical", color: "#ff4466" };
}

export default function NetworkHealth({ subnets }: { subnets: SubnetHealth[] }) {
  var healthy = subnets.filter(function(s) { return getHealthStatus(s).status === "Healthy"; }).length;
  var warning = subnets.filter(function(s) { return getHealthStatus(s).status === "Warning"; }).length;
  var critical = subnets.filter(function(s) { return getHealthStatus(s).status === "Critical"; }).length;

  return (
    <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "8px", padding: "20px", marginBottom: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#e8e8f0", margin: "0 0 4px 0" }}>Network Health Monitor</h2>
          <p style={{ color: "#555566", fontSize: "11px" }}>Real-time subnet status based on miner activity, validator count, and emission share</p>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#00d4aa", fontSize: "24px", fontWeight: 700 }}>{healthy}</div>
            <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase" }}>Healthy</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#ffaa00", fontSize: "24px", fontWeight: 700 }}>{warning}</div>
            <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase" }}>Warning</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#ff4466", fontSize: "24px", fontWeight: 700 }}>{critical}</div>
            <div style={{ color: "#555566", fontSize: "10px", textTransform: "uppercase" }}>Critical</div>
          </div>
        </div>
      </div>
      <div style={{ background: "#1a1a25", borderRadius: "6px", height: "8px", overflow: "hidden", marginBottom: "20px", display: "flex" }}>
        <div style={{ width: (healthy / subnets.length * 100) + "%", background: "#00d4aa", height: "100%" }} />
        <div style={{ width: (warning / subnets.length * 100) + "%", background: "#ffaa00", height: "100%" }} />
        <div style={{ width: (critical / subnets.length * 100) + "%", background: "#ff4466", height: "100%" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px", maxHeight: "400px", overflowY: "auto" }}>
        {subnets.map(function(s) {
          var health = getHealthStatus(s);
          return (
            <a key={s.netuid} href={"/subnet/" + s.netuid} style={{ textDecoration: "none" }}>
              <div style={{ background: "#12121a", border: "1px solid #1e1e2e", borderRadius: "6px", padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: health.color, flexShrink: 0, boxShadow: "0 0 6px " + health.color + "60" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#e8e8f0", fontSize: "13px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</span>
                    <span style={{ color: health.color, fontSize: "10px", fontWeight: 700, flexShrink: 0, marginLeft: "8px" }}>{health.status.toUpperCase()}</span>
                  </div>
                  <div style={{ color: "#555566", fontSize: "10px", marginTop: "2px" }}>{s.miners}m / {s.validators}v / {s.emission.toFixed(2)}% em</div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}