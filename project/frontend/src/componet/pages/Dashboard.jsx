import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    lowInventory: 0,
  });

  const loadDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log("Dashboard Load Error", error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Reusable Card UI
  const Card = ({ title, value, color }) => (
    <div
      className="
        p-5 bg-white rounded-xl shadow 
        hover:shadow-xl transform hover:scale-[1.03] 
        transition-all duration-300 border border-transparent 
        hover:border-gray-200 cursor-pointer
      "
    >
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className={`text-3xl font-bold ${color} transition-all duration-300`}>
        {value}
      </p>
    </div>
  );

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <Card title="Total Orders" value={stats.totalOrders} color="text-blue-600" />

      <Card title="Pending Orders" value={stats.pendingOrders} color="text-orange-500" />

      <Card title="Delivered Orders" value={stats.deliveredOrders} color="text-green-600" />

      <Card title="Total Revenue" value={`₹${stats.totalRevenue}`} color="text-purple-600" />

      <Card title="Total Users" value={stats.totalUsers} color="text-teal-600" />

      <Card title="Low Inventory Items" value={stats.lowInventory} color="text-red-600" />

    </div>
  );
};

export default Dashboard;
