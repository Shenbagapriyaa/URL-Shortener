import { Link } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaLink,
  FaQrcode,
  FaMagic,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      {/* Logo */}
      <div>
        <div style={styles.logoBox}>
          <FaLink size={35} color="#8b5cf6" />
          <div>
            <h2 style={styles.logo}>ShortIQ</h2>
            <p style={styles.subtitle}>
              Shorten • Track • Analyze
            </p>
          </div>
        </div>

        {/* MENU */}
        <div style={styles.menu}>
          <Link style={styles.link} to="/dashboard">
            <FaHome /> Dashboard
          </Link>

          <Link style={styles.link} to="/alllinks">
            <FaLink /> All Links
          </Link>

          <Link style={styles.link} to="/qrcodes">
            <FaQrcode /> QR Codes
          </Link>

          <Link style={styles.link} to="/customalias">
            <FaMagic /> Custom Alias
          </Link>

          <Link style={styles.link} to="/profile">
            <FaUser /> Profile
          </Link>

          <Link style={styles.link} to="/settings">
            <FaCog /> Settings
          </Link>
        </div>
      </div>

      {/* LOGOUT */}
      <button
        style={styles.logout}
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "260px",
    height: "100vh",
    background:
      "linear-gradient(180deg,#020617,#0f172a,#1e1b4b)",
    color: "white",
    padding: "25px",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 0 25px rgba(124,58,237,0.35)",
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
  },

  logo: {
    margin: 0,
    fontSize: "30px",
  },

  subtitle: {
    margin: 0,
    fontSize: "12px",
    color: "#94a3b8",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px",
    transition: "0.3s",
  },

  logout: {
    background:
      "linear-gradient(135deg,#7c3aed,#9333ea)",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default Sidebar;