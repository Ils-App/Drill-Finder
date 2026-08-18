import React from "react";

// EDIT THIS LIST — it's what coaches see before they pay
const FEATURES = [
  "Coaching points for every drill — what to watch for and call out",
  "Common mistakes, so you can spot them before they set in",
  "How to make each drill easier for players who are struggling",
  "How to make it harder for players who need more",
  "Tactical diagrams showing setup and movement",
  "Coaching tips from the drills that work",
];

export default function PremiumModal({ open, onClose, monthlyUrl, yearlyUrl }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(10,20,16,.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16, zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 10, maxWidth: 440, width: "100%",
          padding: 28, maxHeight: "90vh", overflowY: "auto",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h2 style={{ margin: "0 0 6px", fontSize: 24, color: "#12211C", opacity: 1 }}>Drill Finder Premium</h2>
        <p style={{ margin: "0 0 20px", color: "#5C6B64", fontSize: 15 }}>
          Here's everything you get.
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
          {FEATURES.map((f) => (
            <li key={f} style={{ display: "flex", gap: 10, padding: "9px 0", fontSize: 15, color: "#12211C", opacity: 1 }}>
              <span style={{ color: "#1B7A4B", fontWeight: 700 }}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <a href={yearlyUrl} style={btn(true)}>$64 / year · save 33%</a>
        <a href={monthlyUrl} style={btn(false)}>$8 / month</a>

        <button
          onClick={onClose}
          style={{
            width: "100%", marginTop: 14, padding: 10, background: "none",
            border: "none", color: "#6B7A73", fontSize: 14, cursor: "pointer",
          }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}

const btn = (primary) => ({
  display: "block", width: "100%", boxSizing: "border-box", textAlign: "center",
  padding: 15, marginBottom: 9, borderRadius: 6, fontSize: 16, fontWeight: 600,
  textDecoration: "none",
  background: primary ? "#12211C" : "#fff",
  color: primary ? "#fff" : "#12211C",
  border: primary ? "none" : "1px solid #D8D6CC",
});
