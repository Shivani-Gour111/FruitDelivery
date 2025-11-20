import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const router = express.Router();


// --------------------------------------------------------
// GET USERS (ALL)
// --------------------------------------------------------
router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();   // all users (admin + user)
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// --------------------------------------------------------
// ADD USER (WITH HASHED PASSWORD + ROLE)
// --------------------------------------------------------
router.post("/add-user", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // admin or user → will come from frontend dropdown
    });

    await newUser.save();
    res.json({ success: true, message: "User added successfully!" });

  } catch (error) {
    console.log("ADD USER ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// --------------------------------------------------------
// DELETE USER
// --------------------------------------------------------
router.delete("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


export default router;
