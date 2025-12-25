import React from "react";
import { TrendingUp, Users, ShoppingCart, Truck } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Header */}
      <h1 className="text-3xl font-bold text-green-300">Dashboard Overview</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-[#0C2A24] shadow-lg hover:shadow-green-800/25 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300">Total Orders</p>
              <h2 className="text-2xl font-bold text-green-400">1,245</h2>
            </div>
            <ShoppingCart size={34} className="text-green-400" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C2A24] shadow-lg hover:shadow-green-800/25 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300">Active Users</p>
              <h2 className="text-2xl font-bold text-green-400">530</h2>
            </div>
            <Users size={34} className="text-green-400" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C2A24] shadow-lg hover:shadow-green-800/25 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300">Revenue</p>
              <h2 className="text-2xl font-bold text-green-400">₹84,500</h2>
            </div>
            <TrendingUp size={34} className="text-green-400" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C2A24] shadow-lg hover:shadow-green-800/25 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300">Pending Deliveries</p>
              <h2 className="text-2xl font-bold text-green-400">23</h2>
            </div>
            <Truck size={34} className="text-green-400" />
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="p-6 bg-[#0C2A24] rounded-2xl shadow-lg border border-[#10352E]">
        <h2 className="text-xl font-bold mb-3">Sales Overview</h2>
        <div className="h-64 w-full flex items-center justify-center text-gray-400">
          📊 Chart Coming Soon…
        </div>
      </div>

      {/* Recent Orders */}
      <div className="p-6 bg-[#0C2A24] rounded-2xl shadow-lg border border-[#10352E]">
        <h2 className="text-xl font-bold mb-3">Recent Orders</h2>

        <table className="w-full text-left">
          <thead className="text-gray-300 border-b border-[#1A3A33]">
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-[#1A3A33]">
              <td className="py-3">#1023</td>
              <td>Rohit</td>
              <td>₹450</td>
              <td className="text-green-400">Delivered</td>
            </tr>

            <tr className="border-b border-[#1A3A33]">
              <td className="py-3">#1024</td>
              <td>Asha</td>
              <td>₹320</td>
              <td className="text-yellow-400">Pending</td>
            </tr>

            <tr>
              <td className="py-3">#1025</td>
              <td>Manish</td>
              <td>₹780</td>
              <td className="text-red-400">Cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
