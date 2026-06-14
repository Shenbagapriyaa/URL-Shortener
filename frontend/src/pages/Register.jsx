import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully 🚀");

      // go to login page
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
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
      {/* CARD */}
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
          📝 Create Account
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "13px",
            marginBottom: "20px",
          }}
        >
          Join to start managing your links
        </p>

        <form onSubmit={handleRegister}>
          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            Register
          </button>
        </form>

        {/* LOGIN LINK */}
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "12px",
            color: "#94a3b8",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;