import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

const AllLinks = () => {
  const [urls, setUrls] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUrls = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/url/myurls",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUrls(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const copyToClipboard = async (shortId) => {
    const url = `http://localhost:5000/${shortId}`;
    await navigator.clipboard.writeText(url);
    alert("Copied!");
  };

  const deleteUrl = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/url/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchUrls();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const filtered = urls.filter((item) =>
    item.originalUrl.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div style={styles.page}>
        <h1 style={styles.heading}>🔗 All Links</h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search URLs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        {/* TABLE */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Original URL</th>
                <th style={styles.th}>Short Link</th>
                <th style={styles.th}>Clicks</th>
                <th style={styles.th}>Created</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item._id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.urlCell}>
                      {item.originalUrl}
                    </div>
                  </td>

                  <td style={styles.td}>
                    <a
                      href={`http://localhost:5000/${item.shortId}`}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.link}
                    >
                      short.ly/{item.shortId}
                    </a>
                  </td>

                  <td style={styles.td}>{item.clicks}</td>

                  <td style={styles.td}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td style={styles.td}>
                    <button
                      onClick={() => copyToClipboard(item.shortId)}
                      style={styles.copyBtn}
                    >
                      Copy
                    </button>

                    <button
                      onClick={() => deleteUrl(item._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" style={styles.noData}>
                    No URLs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default AllLinks;

/* ===================== STYLES ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050b1f",
    color: "white",
    padding: "35px",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  search: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #2b3354",
    background: "#111933",
    color: "white",
    outline: "none",
    marginBottom: "20px",
  },

  tableWrapper: {
    background: "linear-gradient(145deg,#141c38,#1b2445)",
    borderRadius: "16px",
    padding: "15px",
    overflowX: "auto",
    boxShadow: "0 10px 30px rgba(0,0,0,.35)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #2b3354",
    minWidth: "750px",
  },

  th: {
    textAlign: "left",
    padding: "14px",
    fontSize: "13px",
    color: "#cbd5e1",
    background: "#0f172a",
    borderBottom: "1px solid #2b3354",
    borderRight: "1px solid #2b3354",
    fontWeight: "600",
  },

  td: {
    padding: "14px",
    fontSize: "14px",
    color: "white",
    borderBottom: "1px solid #2b3354",
    borderRight: "1px solid #2b3354",
  },

  tr: {
    transition: "0.2s",
  },

  urlCell: {
    maxWidth: "280px",
    wordBreak: "break-word",
  },

  link: {
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "500",
  },

  copyBtn: {
    background: "#6366f1",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "white",
    marginRight: "8px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
    color: "#94a3b8",
  },
};