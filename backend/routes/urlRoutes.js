const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createShortUrl,
  redirectUrl,
  getUserUrls,
  deleteUrl,
  getUrlAnalytics,
} = require("../controllers/urlController");

// =========================
// 🔐 AUTH PROTECTED ROUTES
// =========================

// Create short URL
router.post("/short", protect, createShortUrl);

// Get all user URLs (dashboard)
router.get("/myurls", protect, getUserUrls);

// Get analytics for one URL
router.get("/analytics/:id", protect, getUrlAnalytics);

// Delete URL
router.delete("/:id", protect, deleteUrl);

// =========================
// 🌐 PUBLIC ROUTE (IMPORTANT)
// =========================

// Redirect short URL (must be last)
router.get("/:shortId", redirectUrl);

module.exports = router;