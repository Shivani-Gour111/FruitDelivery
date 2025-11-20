import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const demoOrders = [
  {
    _id: "ORD001",
    userId: { name: "Rohit Sharma", email: "rohit@example.com" },
    totalAmount: 450,
    status: "Pending",
    items: [{ productId: "P1", quantity: 2 }, { productId: "P2", quantity: 1 }],
  },
  {
    _id: "ORD002",
    userId: { name: "Neha Verma", email: "neha@example.com" },
    totalAmount: 890,
    status: "Delivered",
    items: [{ productId: "P3", quantity: 3 }],
  },
  {
    _id: "ORD003",
    userId: { name: "Amit Patel", email: "amit@example.com" },
    totalAmount: 320,
    status: "Processing",
    items: [{ productId: "P4", quantity: 1 }, { productId: "P5", quantity: 2 }],
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load orders
  const loadOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/orders/all-orders", { timeout: 7000 });
      console.log("Orders API response:", res?.data);
      // Accept different shapes defensively
      const got = res?.data?.orders ?? res?.data ?? [];
      if (Array.isArray(got) && got.length === 0) {
        // empty array returned — fallback to demo
        setOrders(demoOrders);
        setError("No orders in DB — showing demo orders.");
      } else if (Array.isArray(got)) {
        setOrders(got);
      } else if (got && typeof got === "object" && got._id) {
        // single object returned
        setOrders([got]);
      } else {
        // unexpected shape: fallback
        setOrders(demoOrders);
        setError("Unexpected response shape — showing demo orders.");
      }
    } catch (err) {
      console.error("Load orders error:", err);
      setError("Could not fetch orders from server — showing demo orders.");
      setOrders(demoOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Update status (dummy-friendly)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/update-status/${id}`, { status });
      // If using dummy server which doesn't persist, we update UI locally:
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error("Update status error:", err);
      setError("Failed to update status (server error).");
    }
  };

  // Filter + Search Logic
  const filteredOrders = orders.filter((order) => {
    const matchStatus = filteredStatus === "All" || order.status === filteredStatus;
    const matchSearch = (order.userId?.name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">🧾 Orders Management</h2>

      {/* Info / Error */}
      {loading && <div className="mb-4 text-sm text-gray-600">Loading orders...</div>}
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search by customer name..."
          className="p-2 border w-60 rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded-lg"
          onChange={(e) => setFilteredStatus(e.target.value)}
          value={filteredStatus}
        >
          <option value="All">All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <button
          className="p-2 bg-gray-100 rounded-lg"
          onClick={() => {
            setSearch("");
            setFilteredStatus("All");
          }}
        >
          Reset
        </button>
      </div>

      {/* Empty state */}
      {!loading && filteredOrders.length === 0 && (
        <div className="text-center text-gray-600 py-12">
          No orders to show.
        </div>
      )}

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="p-5 shadow-lg bg-white rounded-xl border hover:scale-[1.02] transition"
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{order.userId?.name ?? "Unknown"}</h3>
              <span className={`px-3 py-1 text-sm rounded-lg ${statusColors[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                {order.status ?? "Unknown"}
              </span>
            </div>

            <p className="text-gray-600 mt-1">📧 {order.userId?.email ?? "-"}</p>
            <p className="text-gray-700 font-semibold mt-3">Total: ₹{order.totalAmount ?? 0}</p>

            <button
              onClick={() => setSelectedOrder(order)}
              className="mt-4 w-full bg-[#008080] text-white py-2 rounded-lg hover:bg-[#006666]"
            >
              View Details
            </button>

            {/* Status Dropdown */}
            <select
              className="mt-3 w-full p-2 border rounded-lg"
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </div>

      {/* Order Details Popup Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg relative">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl">×</button>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">Order Details</h3>

            <p className="text-gray-700"><b>Customer:</b> {selectedOrder.userId?.name}</p>
            <p className="text-gray-700"><b>Email:</b> {selectedOrder.userId?.email}</p>
            <p className="text-gray-700"><b>Total:</b> ₹{selectedOrder.totalAmount}</p>
            <p className="text-gray-700"><b>Status:</b> {selectedOrder.status}</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">Items:</h4>
            <ul className="list-disc ml-5 text-gray-700">
              {selectedOrder.items?.map((item, index) => (
                <li key={index}>
                  {item.productName ? item.productName + " - " : ""}Qty: {item.quantity}
                </li>
              )) ?? <li>No items</li>}
            </ul>

            <button onClick={() => setSelectedOrder(null)} className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
