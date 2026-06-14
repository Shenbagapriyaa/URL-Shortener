const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  register,
  login,
  getProfile,
  changePassword,
} = require("../controllers/authController");

// ======================
// AUTH ROUTES
// ======================

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// PROFILE (protected)
router.get("/profile", protect, getProfile);

// CHANGE PASSWORD (protected)
router.put("/change-password", protect, changePassword);

module.exports = router;