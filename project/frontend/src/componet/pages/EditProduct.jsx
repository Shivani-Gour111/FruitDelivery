import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null); // ⭐ modal control
  const [form, setForm] = useState({
  name: "",
  price: "",
  category: "",
  image: "",
  text: "",
});
 // ⭐ edit form

  const loadProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openEditModal = (product) => {
  setEditingProduct(product);
  setForm({
    name: product.name || "",
    price: product.price || "",
    category: product.category || "",
    image: product.image || "",
    text: product.text || "",
  });
};
  const closeModal = () => {
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/api/products/update/${editingProduct._id}`,
      form
    );
    closeModal();
    loadProducts();
    alert("Product Updated Successfully!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Products</h2>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/admin/add-product"
            className="bg-green-600 text-white px-4 py-2 rounded shadow-md"
          >
            + Add Product
          </Link>
        </motion.div>
      </div>

      {/* Table */}
      <table className="w-full border shadow-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, index) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="border p-2">
                <img src={p.image} className="h-12 mx-auto rounded shadow-sm" />
              </td>

              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">₹{p.price}</td>

              <td className="border p-2 flex gap-2 justify-center">

                {/* ⭐ EDIT opens modal */}
                <motion.button
                  onClick={() => openEditModal(p)}
                  className="px-3 py-1 bg-blue-600 text-white rounded shadow"
                  whileHover={{ scale: 1.1 }}
                >
                  Edit
                </motion.button>

                {/* Delete */}
                <motion.button
                  onClick={() => deleteProduct(p._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded shadow"
                >
                  Delete
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ⭐ MODAL POPUP */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4">
              Edit Product – {editingProduct.name}
            </h2>

            <form onSubmit={updateProduct} className="space-y-3">
              <input
                name="name"
                className="border p-2 w-full"
                value={form.name}
                onChange={handleChange}
              />

              <input
                name="price"
                className="border p-2 w-full"
                value={form.price}
                onChange={handleChange}
              />

              <input
                name="category"
                className="border p-2 w-full"
                value={form.category}
                onChange={handleChange}
              />

              <input
                name="image"
                className="border p-2 w-full"
                value={form.image}
                onChange={handleChange}
              />

              <textarea
                name="text"
                className="border p-2 w-full"
                value={form.text}
                onChange={handleChange}
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Update
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductsPage;
