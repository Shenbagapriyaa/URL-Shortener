import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  FaLink,
  FaMousePointer,
  FaChartLine,
  FaCopy,
  FaTrash,
} from "react-icons/fa";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchUrls = async () => {
    try {
      const res = await API.get("/url/myurls");
      setUrls(res.data);
    } catch (err) {
      alert("Error loading URLs");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const shortenUrl = async () => {
    if (!url) return alert("Please enter a URL");

    try {
      setLoading(true);

      await API.post("/url/short", {
        originalUrl: url,
      });

      setUrl("");
      fetchUrls();

      alert("Short URL Created 🚀");
    } catch (err) {
      alert("Error shortening URL");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = (shortId) => {
    navigator.clipboard.writeText(
      `http://localhost:5000/${shortId}`
    );
    alert("Copied!");
  };

  const deleteUrl = async (id) => {
    try {
      await API.delete(`/url/${id}`);
      fetchUrls();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  const totalLinks = urls.length;

  const totalClicks = urls.reduce(
    (sum, item) => sum + item.clicks,
    0
  );

  return (
    <MainLayout>
      <div style={styles.page}>
        <h1 style={styles.heading}>
          🚀 Shorten your Long URLs
        </h1>

        {/* INPUT BOX */}
        <div style={styles.urlBox}>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            style={styles.input}
          />

          <button
            onClick={shortenUrl}
            disabled={loading}
            style={styles.shortenBtn}
          >
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </div>

        {/* STATS */}
        <div style={styles.statsContainer}>
          <div style={styles.card}>
            <FaLink size={28} />
            <h2>{totalLinks}</h2>
            <p>Total Links</p>
          </div>

          <div style={styles.card}>
            <FaMousePointer size={28} />
            <h2>{totalClicks}</h2>
            <p>Total Clicks</p>
          </div>

          <div style={styles.card}>
            <FaChartLine size={28} />
            <h2>
              {totalLinks
                ? (totalClicks / totalLinks).toFixed(1)
                : 0}
            </h2>
            <p>Avg Clicks</p>
          </div>
        </div>

        {/* TABLE */}
        <div style={styles.tableContainer}>
          <h2 style={{ marginBottom: "20px" }}>
            Recent Links
          </h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Original URL</th>
                <th style={styles.th}>Short URL</th>
                <th style={styles.th}>Clicks</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {urls.map((item) => (
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

                  {/* ✅ FIXED ALIGNMENT HERE */}
                  <td style={styles.td}>
                    <div style={styles.dateWrap}>
                      <div style={styles.dateText}>
                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                      </div>

                      <div style={styles.timeText}>
                        {new Date(item.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={styles.copyBtn}
                      onClick={() =>
                        copyUrl(item.shortId)
                      }
                    >
                      <FaCopy />
                    </button>

                    <button
                      style={styles.analyticsBtn}
                      onClick={() =>
                        navigate(
                          `/analytics/${item._id}`
                        )
                      }
                    >
                      Analytics
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() =>
                        deleteUrl(item._id)
                      }
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050b1f",
    color: "white",
    padding: "35px",
  },

  heading: {
    fontSize: "38px",
    fontWeight: "700",
    marginBottom: "30px",
  },

  urlBox: {
    display: "flex",
    gap: "15px",
    marginBottom: "35px",
  },

  input: {
    flex: 1,
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #2b3354",
    background: "#111933",
    color: "white",
    fontSize: "16px",
    outline: "none",
  },

  shortenBtn: {
    background: "linear-gradient(135deg,#7c3aed,#9333ea)",
    color: "white",
    border: "none",
    padding: "18px 30px",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  },

  card: {
    background: "linear-gradient(145deg,#141c38,#1b2445)",
    padding: "25px",
    borderRadius: "18px",
  },

  tableContainer: {
    background: "linear-gradient(145deg,#141c38,#1b2445)",
    padding: "25px",
    borderRadius: "18px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #2b3354",
  },

  th: {
    padding: "14px",
    textAlign: "left",
    background: "#0f172a",
    color: "#cbd5e1",
    borderBottom: "1px solid #2b3354",
    borderRight: "1px solid #2b3354",
    fontSize: "14px",
    fontWeight: "600",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #2b3354",
    borderRight: "1px solid #2b3354",
    fontSize: "14px",
    color: "white",
  },

  tr: {
    transition: "0.2s",
  },

  urlCell: {
    maxWidth: "350px",
    wordBreak: "break-word",
  },

  link: {
    color: "#8b5cf6",
    textDecoration: "none",
  },

  copyBtn: {
    background: "#3b82f6",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    color: "white",
    marginRight: "8px",
    cursor: "pointer",
  },

  analyticsBtn: {
    background: "#22c55e",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    color: "white",
    marginRight: "8px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  /* ✅ NEW ALIGNMENT STYLES */
  dateWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  dateText: {
    fontSize: "14px",
    fontWeight: "500",
  },

  timeText: {
    fontSize: "12px",
    color: "#aaa",
    paddingLeft: "6px",
  },
};

export default Dashboard;