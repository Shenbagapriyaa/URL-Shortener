const mongoose = require("mongoose");

// VISIT TRACKING SCHEMA
const visitSchema = new mongoose.Schema({
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

// MAIN URL SCHEMA
const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },

    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    // 👤 OWNER USER
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📊 CLICK COUNT
    clicks: {
      type: Number,
      default: 0,
    },

    // 📈 VISIT HISTORY
    visits: [visitSchema],

    lastVisitedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Url", urlSchema);