import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import multer from "multer";
import User from "./models/userModel.js";
import productRoutes from "./routes/productRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import sendMailRoute from "./routes/sendMail.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/fruitapp")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Serve Static Uploads Folder
app.use("/uploads", express.static("uploads"));

// ✅ User/Admin Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exist = await User.findOne({ email: email.toLowerCase() });
    if (exist) return res.json({ message: "Email already exists ❌" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();
    res.json({ message: "Signup Successful ✅" });
  } catch (error) {
    res.json({ message: "Signup Failed", error });
  }
});

// ✅ Login (User + Admin same route)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.json({ message: "User not found ❌" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: "Wrong password ❌" });

  const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
    expiresIn: "7d",
  });

  res.json({
    message: `${user.role} login successful ✅`,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl || null,
    },
    token,
  });
});

// ✅ Upload Profile Image
app.post("/api/upload-avatar/:userId", upload.single("avatar"), async (req, res) => {
  try {
    const { userId } = req.params;
    const imagePath = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { avatarUrl: imagePath },
      { new: true }
    );

    res.json({ success: true, message: "Avatar uploaded ✅", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Remove Profile Image
app.delete("/api/remove-avatar/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.avatarUrl && fs.existsSync("." + user.avatarUrl)) {
      fs.unlinkSync("." + user.avatarUrl); // delete from folder
    }

    user.avatarUrl = null;
    await user.save();

    res.json({ success: true, message: "Avatar removed ✅", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// ✅ Get user details
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update user profile (name, email)
app.put("/api/update-user/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Save/Update address
app.put("/api/address/:id", async (req, res) => {
  try {
    const { address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { address },
      { new: true }
    );
    res.json({ message: "Address updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Other Routes
app.use("/api/products", productRoutes);
app.use("/api/like", likeRoutes);
app.use("/api", sendMailRoute);

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
