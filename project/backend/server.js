import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";
<<<<<<< HEAD
import cartRoutes from "./routes/cartRoutes.js";
=======
import productRoutes from "./routes/productRoutes.js";
>>>>>>> 0b55e1825c020bdce344e3bda9f42328034c299d

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/fruitapp")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ User/Admin Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // role admin/user

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "user", // default user
    });

    await user.save();
    res.json({ message: "Signup Successful" });

  } catch (error) {
    res.json({ message: "Signup Failed", error });
  }
});

// ✅ Login (User + Admin same route)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secret",
    { expiresIn: "7d" }
  );

  res.json({
    message: `${user.role} login successful`,
    user: { name: user.name, email: user.email, role: user.role },
    token
  });
});

<<<<<<< HEAD
app.use("/api/cart", cartRoutes);
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
=======
app.use("/api/products", productRoutes);

app.listen(5000, () => console.log("🚀 Server running on 5000"));
>>>>>>> 0b55e1825c020bdce344e3bda9f42328034c299d
