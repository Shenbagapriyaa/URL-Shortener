import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login successful 🚀");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #0b1020)",
        color: "white",
      }}
    >
      {/* LOGIN CARD */}
      <div
        style={{
          width: "380px",
          padding: "30px",
          borderRadius: "16px",
          background: "rgba(21, 28, 52, 0.9)",
          boxShadow: "0 0 25px rgba(124,58,237,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
          🔐 Welcome Back
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "13px",
            marginBottom: "20px",
          }}
        >
          Login to continue to your dashboard
        </p>

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white",
              outline: "none",
            }}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "18px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white",
              outline: "none",
            }}
          />

          {/* BUTTON */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #9333ea)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        {/* SIGNUP LINK (FIXED) */}
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "12px",
            color: "#94a3b8",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;