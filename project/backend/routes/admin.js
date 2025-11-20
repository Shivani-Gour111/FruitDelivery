import express from "express";
import Product from "../models/Product.js";
import Order from "../models/OrderModel.js";
import User from "../models/userModel.js";

const router = express.Router();

// 🔍 SEARCH API
router.get("/search", async (req, res) => {
  const q = req.query.q;

  try {
    const products = await Product.find({
      name: { $regex: q, $options: "i" }
    }).limit(5);

    const users = await User.find({
      name: { $regex: q, $options: "i" }
    }).limit(5);

    const ordersList = await Order.find().limit(20);
    const orders = ordersList.filter(o =>
      o._id.toString().includes(q)
    );

    res.json({
      products,
      users,
      orders
    });

  } catch (err) {
    res.status(500).json({ message: "Search error", error: err });
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: "Product updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
});


// 🔔 Notifications
router.get("/notifications", async (req, res) => {
  try {
    const notifications = [
      { msg: "New order received", time: "2 min ago" },
      { msg: "Low stock on Apple", time: "10 min ago" },
      { msg: "New user registered", time: "1 hour ago" }
    ];

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Notification error" });
  }
});

// 👤 Admin Profile API
router.get("/profile", (req, res) => {
  res.json({
    name: "Admin User",
    avatar: "/uploads/admin-default.png",
    email: "admin@gmail.com"
  });
});

router.post("/logout", (req, res) => {
  res.json({ success: true });
});


// 📊 REAL DASHBOARD API (FULLY WORKING)
router.get("/dashboard", async (req, res) => {
  try {
    // 1. Total Users
    const totalUsers = await User.countDocuments();

    // 2. Total Orders
    const totalOrders = await Order.countDocuments();

    // 3. Pending Orders
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    // 4. Delivered Orders
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });

    // 5. Total Revenue (from delivered orders)
    const delivered = await Order.find({ status: "Delivered" });
    const totalRevenue = delivered.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // 6. Low Stock Products (stock < 10)
    const lowInventory = await Product.countDocuments({ stock: { $lt: 10 } });

    res.json({
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalUsers,
      totalRevenue,
      lowInventory
    });

  } catch (error) {
    res.status(500).json({ message: "Dashboard load error", error });
  }
});
// 📦 Dummy Orders (No Database Needed)
router.get("/all-orders", (req, res) => {
  const demoOrders = [
    {
      _id: "ORD12345",
      userId: {
        name: "Rohit Sharma",
        email: "rohit@example.com",
      },
      totalAmount: 450,
      status: "Pending",
      items: [
        { productId: "P101", quantity: 2 },
        { productId: "P102", quantity: 1 },
      ],
    },
    {
      _id: "ORD54321",
      userId: {
        name: "Priya Verma",
        email: "priya@example.com",
      },
      totalAmount: 780,
      status: "Delivered",
      items: [
        { productId: "P103", quantity: 3 },
      ],
    },
    {
      _id: "ORD99999",
      userId: {
        name: "Amit Patel",
        email: "amit@example.com",
      },
      totalAmount: 320,
      status: "Processing",
      items: [
        { productId: "P104", quantity: 1 },
        { productId: "P105", quantity: 2 },
      ],
    },
  ];

  res.json({ orders: demoOrders });
});


export default router;
