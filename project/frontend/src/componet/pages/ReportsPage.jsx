import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportsPage = () => {
  const [revenue, setRevenue] = useState(null);
  const [ordersSummary, setOrdersSummary] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const r1 = await axios.get("/api/admin/reports/revenue?period=7");
      const r2 = await axios.get("/api/admin/reports/orders-summary");
      const r3 = await axios.get("/api/admin/reports/products-top?limit=10");
      setRevenue(r1.data);
      setOrdersSummary(r2.data);
      setProducts(r3.data);   
    })();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-sm text-gray-500">Total Revenue (7d)</h4>
          <div className="text-2xl font-bold">₹{revenue?.totalRevenue ?? "—"}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-sm text-gray-500">Orders (7d)</h4>
          <div className="text-2xl font-bold">{revenue?.ordersCount ?? "—"}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-sm text-gray-500">Avg Order</h4>
          <div className="text-2xl font-bold">₹{revenue?.avgOrderValue ?? "—"}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Orders by Status</h3>
          {/* replace with chart component or simple list */}
          <pre>{JSON.stringify(ordersSummary?.byStatus ?? {}, null, 2)}</pre>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Top Products</h3>
          <ul>
            {products?.top?.map(p => (
              <li key={p.productId} className="py-1">
                {p.name} — {p.sold} items — ₹{p.revenue}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;
