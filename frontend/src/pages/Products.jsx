import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/client";

const EMPTY = { name: "", sku: "", price: "", quantity: "", description: "" };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => getProducts().then((r) => setProducts(r.data)).catch((e) => toast.error(e.message));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity, 10) };
    try {
      if (editId) {
        await updateProduct(editId, payload);
        toast.success("Product updated.");
      } else {
        await createProduct(payload);
        toast.success("Product created.");
      }
      setForm(EMPTY); setEditId(null); setShowForm(false); load();
    } catch (e) { toast.error(e.message); }
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, sku: p.sku, price: p.price, quantity: p.quantity, description: p.description || "" });
    setEditId(p.id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try { await deleteProduct(id); toast.success("Deleted."); load(); }
    catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.h1}>Products</h1>
        <button style={styles.btn} onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(!showForm); }}>
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.h2}>{editId ? "Edit Product" : "New Product"}</h2>
          <div style={styles.formGrid}>
            {[
              { label: "Name *", key: "name", type: "text", required: true },
              { label: "SKU *", key: "sku", type: "text", required: true, disabled: !!editId },
              { label: "Price *", key: "price", type: "number", required: true, min: "0", step: "0.01" },
              { label: "Quantity *", key: "quantity", type: "number", required: true, min: "0" },
            ].map(({ label, key, ...rest }) => (
              <label key={key} style={styles.label}>
                {label}
                <input
                  style={styles.input}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  {...rest}
                />
              </label>
            ))}
          </div>
          <label style={styles.label}>
            Description
            <textarea
              style={{ ...styles.input, height: 70, resize: "vertical" }}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>
          <button type="submit" style={styles.btn}>{editId ? "Update" : "Create"}</button>
        </form>
      )}

      <table style={styles.table}>
        <thead>
          <tr>{["Name", "SKU", "Price", "Stock", "Actions"].map((h) => <th key={h} style={styles.th}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr><td colSpan={5} style={{ ...styles.td, textAlign: "center", color: "#94a3b8" }}>No products yet.</td></tr>
          )}
          {products.map((p) => (
            <tr key={p.id}>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}><code>{p.sku}</code></td>
              <td style={styles.td}>${p.price.toFixed(2)}</td>
              <td style={{ ...styles.td, color: p.quantity <= 10 ? "#ef4444" : "#10b981", fontWeight: 600 }}>{p.quantity}</td>
              <td style={styles.td}>
                <button style={styles.btnSm} onClick={() => handleEdit(p)}>Edit</button>
                <button style={{ ...styles.btnSm, ...styles.btnDanger }} onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
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
  form: { background: "#fff", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" },
  label: { display: "flex", flexDirection: "column", gap: 4, fontSize: "0.875rem", color: "#475569" },
  input: { padding: "0.5rem 0.75rem", borderRadius: 6, border: "1px solid #e2e8f0", fontSize: "0.95rem", marginTop: 2 },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  th: { textAlign: "left", padding: "0.75rem 1rem", borderBottom: "2px solid #e2e8f0", color: "#475569", fontSize: "0.85rem", background: "#f8fafc" },
  td: { padding: "0.75rem 1rem", borderBottom: "1px solid #f1f5f9", color: "#334155", fontSize: "0.9rem" },
  btn: { padding: "0.55rem 1.25rem", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" },
  btnSm: { padding: "0.3rem 0.75rem", marginRight: 6, background: "#e2e8f0", border: "none", borderRadius: 5, cursor: "pointer", fontSize: "0.82rem", fontWeight: 500 },
  btnDanger: { background: "#fee2e2", color: "#dc2626" },
};
