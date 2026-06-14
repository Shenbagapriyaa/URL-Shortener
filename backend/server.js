const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// AUTH
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");

// URL SHORTENER
const urlRoutes = require("./routes/urlRoutes");
const { redirectUrl } = require("./controllers/urlController");

dotenv.config();

// Connect DB
connectDB();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ROUTES
// ======================

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// URL ROUTES
app.use("/api/url", urlRoutes);

// PROTECTED TEST ROUTE
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected data 🔐",
    user: req.user,
  });
});

// ======================
// QR / SHORT URL REDIRECT
// ======================
// IMPORTANT: This makes http://IP:5000/abc work
app.get("/:shortId", redirectUrl);

// ======================
// HOME ROUTE
// ======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ShortIQ URL Shortener Running 🚀",
  });
});

// ======================
// START SERVER (IMPORTANT FIX)
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});