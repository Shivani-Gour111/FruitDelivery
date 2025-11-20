import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// 🔹 Get all orders
router.get("/orders/all-orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 🔹 Update order status
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true, message: "Order status updated!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
// 📦 Get All Orders
router.get("/all-orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Order fetch error", error: err });
  }
});
