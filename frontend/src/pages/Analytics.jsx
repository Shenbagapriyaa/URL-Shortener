import { useEffect } from "react";
import API from "../services/api";

const Analytics = () => {
  const checkAccess = async () => {
    try {
      const res = await API.get("/protected");
      console.log("Analytics Access:", res.data);
    } catch (error) {
      console.log("Access denied");
    }
  };

  useEffect(() => {
    checkAccess();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Analytics 📊</h2>
      <p>Protected analytics page</p>
    </div>
  );
};

export default Analytics;