import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { FaUser, FaLink, FaMousePointer, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userRes = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userRes.data.user);

        const urlRes = await axios.get(
          "http://localhost:5000/api/url/myurls",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUrls(urlRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, item) => sum + (item.clicks || 0), 0);

  return (
    <MainLayout>
      <div style={styles.page}>
        <h1 style={{ marginBottom: "25px" }}>👤 My Profile</h1>

        {/* PROFILE CARD */}
        <div style={styles.card}>
          <div style={styles.avatar}>
            <FaUser />
          </div>

          <div>
            <h2>{user?.name || "Loading..."}</h2>
            <p style={{ color: "#94a3b8" }}>
              URL Management & Analytics User
            </p>
          </div>
        </div>

        {/* STATS */}
        <div style={styles.grid}>
          <div style={styles.statCard}>
            <FaLink size={25} />
            <h2>{totalUrls}</h2>
            <p>Total URLs</p>
          </div>

          <div style={styles.statCard}>
            <FaMousePointer size={25} />
            <h2>{totalClicks}</h2>
            <p>Total Clicks</p>
          </div>

          <div style={styles.statCard}>
            <FaCalendarAlt size={25} />
            <h2>
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Loading..."}
            </h2>
            <p>Joined</p>
          </div>
        </div>

        {/* ACCOUNT INFO (TABLE STYLE FIXED) */}
        <div style={styles.tableBox}>
          <h2 style={{ marginBottom: "15px" }}>Account Information</h2>

          <table style={styles.table}>
            <tbody>
              <tr style={styles.row}>
                <td style={styles.label}>Name</td>
                <td style={styles.value}>{user?.name}</td>
              </tr>

              <tr style={styles.row}>
                <td style={styles.label}>Email</td>
                <td style={styles.value}>{user?.email}</td>
              </tr>

              <tr style={styles.row}>
                <td style={styles.label}>Role</td>
                <td style={styles.value}>User</td>
              </tr>

              <tr style={styles.row}>
                <td style={styles.label}>Status</td>
                <td style={styles.value}>Active</td>
              </tr>
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
    background: "#0b1020",
    color: "white",
    padding: "30px",
  },

  card: {
    background: "#151c34",
    borderRadius: "20px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#7c3aed,#9333ea)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "35px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "#151c34",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
  },

  tableBox: {
    background: "#151c34",
    padding: "20px",
    borderRadius: "15px",
    border: "1px solid #2b3354",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  row: {
    borderBottom: "1px solid #2b3354",
  },

  label: {
    padding: "12px",
    color: "#94a3b8",
    width: "120px",
  },

  value: {
    padding: "12px",
    color: "white",
    textAlign: "left",
  },
};

export default Profile;