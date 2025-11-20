import express from "express";
import Settings from "../models/Settings.js";
import User from "../models/userModel.js"; // for profile update / backup
import json2csv from "json2csv"; // optional: npm i json2csv
import fs from "fs";
import path from "path";

const router = express.Router();

// Helper: get or create settings doc (single document app)
async function getSettingsDoc() {
  let s = await Settings.findOne();
  if (!s) {
    s = new Settings();
    await s.save();
  }
  return s;
}

// GET settings
router.get("/", async (req, res) => {
  try {
    const s = await getSettingsDoc();
    res.json({ success: true, settings: s });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE settings (partial)
router.put("/", async (req, res) => {
  try {
    const updates = req.body;
    const s = await getSettingsDoc();
    Object.assign(s, updates);
    await s.save();
    res.json({ success: true, settings: s });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE admin profile
router.put("/profile", async (req, res) => {
  try {
    const { adminName, adminEmail, profileImage } = req.body;
    const s = await getSettingsDoc();
    if (adminName) s.adminName = adminName;
    if (adminEmail) s.adminEmail = adminEmail;
    if (profileImage) s.profileImage = profileImage;
    await s.save();
    res.json({ success: true, settings: s });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// EXPORT users (backup) - returns CSV
router.get("/export/users", async (req, res) => {
  try {
    const users = await User.find().lean();
    // remove sensitive info
    const exportUsers = users.map(u => ({
      name: u.name,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt
    }));

    const fields = ["name", "email", "role", "createdAt"];
    const { Parser } = json2csv;
    const parser = new Parser({ fields });
    const csv = parser.parse(exportUsers);

    res.header("Content-Type", "text/csv");
    res.attachment("users_export.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DANGER ZONE - reset data (example: delete non-admin users)
router.post("/danger/clear-users", async (req, res) => {
  try {
    // IMPORTANT: protect this route with admin auth and confirmation on frontend
    await User.deleteMany({ role: { $ne: "admin" } });
    res.json({ success: true, message: "Non-admin users removed" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DANGER ZONE - delete all orders (if you have Order model)
import Order from "../models/Order.js";
router.post("/danger/clear-orders", async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ success: true, message: "All orders deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
