const Url = require("../models/Url");
const shortid = require("shortid");

// ============================
// CREATE SHORT URL (WITH CUSTOM ALIAS)
// ============================
const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required" });
    }

    let shortId;

    // ✅ If user gives custom alias, use it
    if (customAlias && customAlias.trim() !== "") {
      shortId = customAlias.trim();
    } else {
      shortId = shortid.generate();
    }

    // ❗ Check duplicate alias
    const existing = await Url.findOne({ shortId });
    if (existing) {
      return res.status(400).json({ message: "Alias already taken" });
    }

    const newUrl = await Url.create({
      originalUrl,
      shortId,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Short URL created successfully",
      shortUrl: `http://localhost:5000/${shortId}`,
      data: newUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating short URL" });
  }
};

// ============================
// REDIRECT + TRACK ANALYTICS
// ============================
const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    url.clicks += 1;
    url.lastVisitedAt = new Date();
    url.visits.push({ visitedAt: new Date() });

    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// GET USER URLS
// ============================
const getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching URLs" });
  }
};

// ============================
// DELETE URL
// ============================
const deleteUrl = async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting URL" });
  }
};

// ============================
// ANALYTICS
// ============================
const getUrlAnalytics = async (req, res) => {
  try {
    const url = await Url.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortId: url.shortId,
      clicks: url.clicks,
      lastVisitedAt: url.lastVisitedAt,
      visits: url.visits,
      createdAt: url.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics" });
  }
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getUserUrls,
  deleteUrl,
  getUrlAnalytics,
};