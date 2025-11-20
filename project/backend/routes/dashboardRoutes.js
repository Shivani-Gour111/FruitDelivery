import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

const router = express.Router();

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalRevenueAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const newOrders = await Order.countDocuments({ createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } });
    const customersToday = await User.countDocuments({ createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } });
    const outOfStock = await Product.countDocuments({ stock: 0 });

    res.json({ totalRevenue, newOrders, customersToday, outOfStock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sales trend for last 7 days
router.get('/sales-trend', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const trend = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, total: { $sum: "$total" } } },
      { $sort: { _id: 1 } }
    ]);

    res.json(trend);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
