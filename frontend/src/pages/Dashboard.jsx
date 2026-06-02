import { useEffect, useState } from "react";
import { getDashboard } from "../api/client";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboard()
      .then((r) => setStats(r.data))
      .catch((e) => toast.error(e.message));
  }, []);

  if (!stats) return <p>Loading dashboard…</p>;

  const cards = [
    { label: "Total Products", value: stats.total_products, color: "#3b82f6" },
    { label: "Total Customers", value: stats.total_customers, color: "#10b981" },
    { label: "Total Orders", value: stats.total_orders, color: "#f59e0b" },
    { label: "Low Stock Items", value: stats.low_stock_products.length, color: "#ef4444" },
  ];

  return (
    <div>
      <h1 style={styles.h1}>Dashboard</h1>
      <div style={styles.grid}>
        {cards.map((c) => (
          <div key={c.label} style={{ ...styles.card, borderTop: `4px solid ${c.color}` }}>
            <div style={{ ...styles.cardValue, color: c.color }}>{c.value}</div>
            <div style={styles.cardLabel}>{c.label}</div>
          </div>
        ))}
      </div>

      {stats.low_stock_products.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.h2}>⚠️ Low Stock Products (≤ 10 units)</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Name", "SKU", "Price", "Stock"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.low_stock_products.map((p) => (
                <tr key={p.id}>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}><code>{p.sku}</code></td>
                  <td style={styles.td}>${p.price.toFixed(2)}</td>
                  <td style={{ ...styles.td, color: "#ef4444", fontWeight: 600 }}>{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

const styles = {
  h1: { margin: "0 0 1.5rem", fontSize: "1.75rem", color: "#1e293b" },
  h2: { margin: "0 0 1rem", fontSize: "1.25rem", color: "#334155" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" },
  card: { background: "#fff", borderRadius: 10, padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  cardValue: { fontSize: "2.25rem", fontWeight: 700 },
  cardLabel: { fontSize: "0.9rem", color: "#64748b", marginTop: 4 },
  section: { background: "#fff", borderRadius: 10, padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "0.6rem 0.75rem", borderBottom: "2px solid #e2e8f0", color: "#475569", fontSize: "0.85rem" },
  td: { padding: "0.6rem 0.75rem", borderBottom: "1px solid #f1f5f9", color: "#334155", fontSize: "0.9rem" },
};
