import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getOrders, getCustomers, getProducts, createOrder, deleteOrder } from "../api/client";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([{ product_id: "", quantity: 1 }]);
  const [expanded, setExpanded] = useState(null);

  const load = () => getOrders().then((r) => setOrders(r.data)).catch((e) => toast.error(e.message));

  useEffect(() => {
    load();
    getCustomers().then((r) => setCustomers(r.data));
    getProducts().then((r) => setProducts(r.data));
  }, []);

  const addItem = () => setItems([...items, { product_id: "", quantity: 1 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, value) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) return toast.error("Select a customer.");
    if (items.some((it) => !it.product_id)) return toast.error("Select a product for each line.");
    try {
      await createOrder({
        customer_id: parseInt(customerId),
        items: items.map((it) => ({ product_id: parseInt(it.product_id), quantity: parseInt(it.quantity) })),
      });
      toast.success("Order created.");
      setShowForm(false); setCustomerId(""); setItems([{ product_id: "", quantity: 1 }]);
      load();
    } catch (e) { toast.error(e.message); }
  };

  const handleCancel = async (id) => {
    if (!confirm("Cancel this order and restore stock?")) return;
    try { await deleteOrder(id); toast.success("Order cancelled."); load(); }
    catch (e) { toast.error(e.message); }
  };

  // Live total preview
  const previewTotal = items.reduce((sum, it) => {
    const p = products.find((p) => p.id === parseInt(it.product_id));
    return sum + (p ? p.price * (parseInt(it.quantity) || 0) : 0);
  }, 0);

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.h1}>Orders</h1>
        <button style={styles.btn} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New Order"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.h2}>Create Order</h2>
          <label style={styles.label}>
            Customer *
            <select style={styles.input} value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
              <option value="">— Select customer —</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.full_name} ({c.email})</option>)}
            </select>
          </label>

          <div style={{ margin: "1rem 0 0.5rem", fontWeight: 600, color: "#475569" }}>Order Items</div>
          {items.map((it, i) => (
            <div key={i} style={styles.itemRow}>
              <select
                style={{ ...styles.input, flex: 2 }}
                value={it.product_id}
                onChange={(e) => updateItem(i, "product_id", e.target.value)}
                required
              >
                <option value="">— Select product —</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} (stock: {p.quantity}) — ${p.price.toFixed(2)}</option>
                ))}
              </select>
              <input
                style={{ ...styles.input, width: 80 }}
                type="number" min="1" value={it.quantity}
                onChange={(e) => updateItem(i, "quantity", e.target.value)}
                required
              />
              {items.length > 1 && (
                <button type="button" style={styles.btnRemove} onClick={() => removeItem(i)}>✕</button>
              )}
            </div>
          ))}

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginTop: "0.5rem" }}>
            <button type="button" style={{ ...styles.btnSm }} onClick={addItem}>+ Add Item</button>
            <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Estimated total: <strong>${previewTotal.toFixed(2)}</strong>
            </span>
          </div>
          <button type="submit" style={{ ...styles.btn, marginTop: "1rem" }}>Place Order</button>
        </form>
      )}

      <table style={styles.table}>
        <thead>
          <tr>{["Order #", "Customer", "Total", "Status", "Date", "Actions"].map((h) => <th key={h} style={styles.th}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr><td colSpan={6} style={{ ...styles.td, textAlign: "center", color: "#94a3b8" }}>No orders yet.</td></tr>
          )}
          {orders.map((o) => (
            <>
              <tr key={o.id} style={{ cursor: "pointer" }} onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
                <td style={styles.td}>#{o.id}</td>
                <td style={styles.td}>{o.customer?.full_name || "—"}</td>
                <td style={styles.td}>${o.total_amount.toFixed(2)}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, background: o.status === "pending" ? "#fef9c3" : "#dcfce7", color: o.status === "pending" ? "#854d0e" : "#166534" }}>
                    {o.status}
                  </span>
                </td>
                <td style={styles.td}>{new Date(o.created_at).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <button style={{ ...styles.btnSm, ...styles.btnDanger }} onClick={(e) => { e.stopPropagation(); handleCancel(o.id); }}>
                    Cancel
                  </button>
                </td>
              </tr>
              {expanded === o.id && (
                <tr key={`${o.id}-detail`}>
                  <td colSpan={6} style={{ ...styles.td, background: "#f8fafc" }}>
                    <strong>Items:</strong>
                    <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
                      {o.items.map((it) => (
                        <li key={it.id} style={{ fontSize: "0.875rem", color: "#475569" }}>
                          {it.product?.name || `Product #${it.product_id}`} — qty: {it.quantity} × ${it.unit_price.toFixed(2)} = ${(it.quantity * it.unit_price).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  h1: { margin: 0, fontSize: "1.75rem", color: "#1e293b" },
  h2: { margin: "0 0 1rem", fontSize: "1.15rem", color: "#334155" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
  form: { background: "#fff", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: "0.75rem" },
  label: { display: "flex", flexDirection: "column", gap: 4, fontSize: "0.875rem", color: "#475569" },
  input: { padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid #e2e8f0", fontSize: "0.95rem" },
  itemRow: { display: "flex", gap: "0.5rem", alignItems: "center" },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  th: { textAlign: "left", padding: "0.75rem 1rem", borderBottom: "2px solid #e2e8f0", color: "#475569", fontSize: "0.85rem", background: "#f8fafc" },
  td: { padding: "0.75rem 1rem", borderBottom: "1px solid #f1f5f9", color: "#334155", fontSize: "0.9rem" },
  btn: { padding: "0.55rem 1.25rem", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", alignSelf: "flex-start" },
  btnSm: { padding: "0.3rem 0.75rem", background: "#e2e8f0", border: "none", borderRadius: 5, cursor: "pointer", fontSize: "0.82rem", fontWeight: 500 },
  btnDanger: { background: "#fee2e2", color: "#dc2626" },
  btnRemove: { background: "none", border: "none", cursor: "pointer", color: "#dc2626", fontWeight: 700, fontSize: "1rem" },
  badge: { padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 },
};
