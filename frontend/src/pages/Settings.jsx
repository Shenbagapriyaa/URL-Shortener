import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";

const Settings = () => {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // ✅ ONLY BACKGROUND CHANGE (NO TEXT GLOBAL CHANGE)
  useEffect(() => {
    document.body.style.background =
      theme === "dark" ? "#0f172a" : "#f8fafc";
  }, [theme]);

  // GET USER
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    loadUser();
  }, []);

  // PASSWORD UPDATE
  const handleUpdatePassword = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Password updated ✅");
      setShowPopup(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  const isDark = theme === "dark";

  return (
    <MainLayout>
      <div style={styles.page(theme)}>
        <h1>⚙ Settings</h1>

        <div style={styles.card(isDark)}>

          {/* USER INFO */}
          <div style={styles.block}>
            <p style={styles.label(isDark)}>Name</p>
            <p style={styles.value(isDark)}>{user?.name}</p>
          </div>

          <div style={styles.block}>
            <p style={styles.label(isDark)}>Email</p>
            <p style={styles.value(isDark)}>{user?.email}</p>
          </div>

          <div style={styles.block}>
            <p style={styles.label(isDark)}>Joined</p>
            <p style={styles.value(isDark)}>
              {user?.createdAt?.slice(0, 10)}
            </p>
          </div>

          <div style={styles.line(isDark)} />

          {/* BUTTONS */}
          <div style={styles.buttonRow}>
            <button onClick={toggleTheme} style={styles.themeBtn(isDark)}>
              {isDark ? "🌙 Dark" : "☀ Light"}
            </button>

            <button
              onClick={() => setShowPopup(true)}
              style={styles.passwordBtn}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div style={styles.popupBg}>
          <div style={styles.popup(isDark)}>
            <h3>Change Password</h3>

            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={styles.input(isDark)}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input(isDark)}
            />

            <button onClick={handleUpdatePassword} style={styles.saveBtn}>
              Update
            </button>

            <button onClick={() => setShowPopup(false)} style={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

const styles = {
  page: (theme) => ({
    padding: "40px",
    minHeight: "100vh",
    color: theme === "dark" ? "white" : "#111827",
  }),

  card: (isDark) => ({
    maxWidth: "600px",
    background: isDark ? "#151c34" : "#ffffff",
    padding: "25px",
    borderRadius: "15px",
    border: isDark ? "1px solid #2b3354" : "1px solid #ddd",
  }),

  block: {
    marginBottom: "15px",
  },

  label: (isDark) => ({
    fontSize: "13px",
    color: isDark ? "#94a3b8" : "#6b7280",
    marginBottom: "4px",
  }),

  value: (isDark) => ({
    fontSize: "16px",
    fontWeight: "500",
    color: isDark ? "white" : "#111827",
  }),

  line: (isDark) => ({
    height: "1px",
    background: isDark ? "#334155" : "#e5e7eb",
    margin: "15px 0",
  }),

  buttonRow: {
    display: "flex",
    gap: "10px",
  },

  themeBtn: (isDark) => ({
    background: isDark ? "#7c3aed" : "#111827",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
  }),

  passwordBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  popupBg: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: (isDark) => ({
    background: isDark ? "#1e293b" : "white",
    padding: "20px",
    borderRadius: "10px",
    width: "320px",
    color: isDark ? "white" : "#111827",
  }),

  input: (isDark) => ({
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: isDark ? "#0f172a" : "#f3f4f6",
    color: isDark ? "white" : "black",
    border: "1px solid #ccc",
  }),

  saveBtn: {
    width: "100%",
    background: "green",
    color: "white",
    padding: "10px",
    border: "none",
    marginTop: "10px",
  },

  closeBtn: {
    width: "100%",
    background: "red",
    color: "white",
    padding: "10px",
    border: "none",
    marginTop: "10px",
  },
};

export default Settings;