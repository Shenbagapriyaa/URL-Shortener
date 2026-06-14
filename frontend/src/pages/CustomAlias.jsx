import { useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

const CustomAlias = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [result, setResult] = useState("");

  const createAlias = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/url/short",
        {
          originalUrl,
          customAlias: alias,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data.shortUrl);
      alert("Alias created successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating alias");
    }
  };

  return (
    <MainLayout>
      <div style={styles.page}>
        <h1 style={styles.title}>✏️ Custom Alias</h1>

        <div style={styles.card}>
          {/* ORIGINAL URL */}
          <div style={styles.row}>
            <label style={styles.label}>Original URL</label>
            <input
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://youtube.com/example"
              style={styles.input}
            />
          </div>

          {/* ALIAS */}
          <div style={styles.row}>
            <label style={styles.label}>Custom Alias</label>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="priya2026"
              style={styles.input}
            />
          </div>

          {/* RESULT */}
          {result && (
            <div style={styles.resultBox}>
              Result:{" "}
              <a
                href={result}
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                {result}
              </a>
            </div>
          )}

          {/* BUTTON */}
          <button onClick={createAlias} style={styles.button}>
            Create Alias
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomAlias;

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "30px",
    background: "#0b1020",
    minHeight: "100vh",
    color: "white",
  },

  title: {
    marginBottom: "20px",
  },

  card: {
    background: "#151c34",
    padding: "25px",
    borderRadius: "15px",
    maxWidth: "650px",

    /* ⭐ ROW LINE LOOK */
    border: "1px solid #2b3354",
  },

  row: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "15px",
    marginBottom: "15px",

    /* ⭐ THIS IS THE ROW LINE */
    borderBottom: "1px solid #2b3354",
  },

  label: {
    color: "#cbd5e1",
    marginBottom: "6px",
    fontSize: "14px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #2b3354",
    background: "#0f172a",
    color: "white",
    outline: "none",
  },

  resultBox: {
    background: "#1e293b",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  link: {
    color: "#60a5fa",
    fontWeight: "bold",
    textDecoration: "underline",
  },

  button: {
    background: "#7c3aed",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};