import { Outlet, NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "📊 Dashboard" },
  { to: "/products", label: "📦 Products" },
  { to: "/customers", label: "👥 Customers" },
  { to: "/orders", label: "🛒 Orders" },
];

export default function Layout() {
  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        <div style={styles.brand}>InventoryOS</div>
        <ul style={styles.navList}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={({ isActive }) => ({
                  ...styles.link,
                  ...(isActive ? styles.activeLink : {}),
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif" },
  nav: {
    width: 220, background: "#1e293b", color: "#f1f5f9",
    display: "flex", flexDirection: "column", padding: "1.5rem 1rem",
    gap: "2rem", flexShrink: 0,
  },
  brand: { fontSize: "1.25rem", fontWeight: 700, color: "#38bdf8", letterSpacing: 0.5 },
  navList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" },
  link: {
    display: "block", padding: "0.6rem 0.75rem", borderRadius: 6,
    color: "#cbd5e1", textDecoration: "none", fontSize: "0.95rem", transition: "background 0.15s",
  },
  activeLink: { background: "#334155", color: "#f8fafc", fontWeight: 600 },
  main: { flex: 1, padding: "2rem", background: "#f8fafc", overflowY: "auto" },
};
