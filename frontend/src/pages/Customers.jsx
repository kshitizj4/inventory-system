import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCustomers, createCustomer, deleteCustomer } from "../api/client";

const EMPTY = { full_name: "", email: "", phone: "" };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);

  const load = () => getCustomers().then((r) => setCustomers(r.data)).catch((e) => toast.error(e.message));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(form);
      toast.success("Customer added.");
      setForm(EMPTY); setShowForm(false); load();
    } catch (e) { toast.error(e.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;
    try { await deleteCustomer(id); toast.success("Deleted."); load(); }
    catch (e) { toast.error(e.message); }
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.h1}>Customers</h1>
        <button style={styles.btn} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Customer"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.h2}>New Customer</h2>
          <div style={styles.formGrid}>
            {[
              { label: "Full Name *", key: "full_name", type: "text", required: true },
              { label: "Email *", key: "email", type: "email", required: true },
              { label: "Phone", key: "phone", type: "tel" },
            ].map(({ label, key, ...rest }) => (
              <label key={key} style={styles.label}>
                {label}
                <input style={styles.input} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} {...rest} />
              </label>
            ))}
          </div>
          <button type="submit" style={styles.btn}>Create</button>
        </form>
      )}

      <table style={styles.table}>
        <thead>
          <tr>{["Name", "Email", "Phone", "Actions"].map((h) => <th key={h} style={styles.th}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {customers.length === 0 && (
            <tr><td colSpan={4} style={{ ...styles.td, textAlign: "center", color: "#94a3b8" }}>No customers yet.</td></tr>
          )}
          {customers.map((c) => (
            <tr key={c.id}>
              <td style={styles.td}>{c.full_name}</td>
              <td style={styles.td}>{c.email}</td>
              <td style={styles.td}>{c.phone || "—"}</td>
              <td style={styles.td}>
                <button style={{ ...styles.btnSm, ...styles.btnDanger }} onClick={() => handleDelete(c.id)}>Delete</button>
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
  btnSm: { padding: "0.3rem 0.75rem", background: "#e2e8f0", border: "none", borderRadius: 5, cursor: "pointer", fontSize: "0.82rem", fontWeight: 500 },
  btnDanger: { background: "#fee2e2", color: "#dc2626" },
};
