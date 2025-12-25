import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    text: "",
  });

  // Load Products
  const loadProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
    setLoading(false);
  };

  // Delete
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
    loadProducts();
  };

  // Open modal
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

  const closeModal = () => setEditingProduct(null);

  // Form input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Update Product
  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/api/admin/update/${editingProduct._id}`,
      form
    );
    closeModal();
    loadProducts();
    alert("Product Updated Successfully!");
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading)
    return <p className="text-white p-6">Loading...</p>;

  return (
    <motion.div
      className="p-6 flex-1 overflow-y-auto bg-[#0B1F1A]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#00A86B]">All Products</h2>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/admin/add-product"
            className="bg-[#00A86B] text-white px-5 py-3 rounded-lg shadow-lg hover:brightness-110 transition"
          >
            + Add Product
          </Link>
        </motion.div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-700">
        <table className="w-full text-white">
          <thead>
            <tr className="bg-[#082A23] text-left">
              <th className="p-3 border border-gray-700">Image</th>
              <th className="p-3 border border-gray-700">Name</th>
              <th className="p-3 border border-gray-700">Category</th>
              <th className="p-3 border border-gray-700">Price</th>
              <th className="p-3 border border-gray-700 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-[#114c40] transition"
              >
                <td className="p-3 border border-gray-700">
                  <img
                    src={p.image}
                    className="h-12 mx-auto rounded shadow"
                    alt=""
                  />
                </td>

                <td className="p-3 border border-gray-700">{p.name}</td>
                <td className="p-3 border border-gray-700">{p.category}</td>
                <td className="p-3 border border-gray-700">₹{p.price}</td>

                <td className="p-3 border border-gray-700 flex justify-center gap-3">
                  {/* 🟢 Edit Button */}
                  <motion.button
                    onClick={() => openEditModal(p)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all hover:from-green-600 hover:to-green-700"
                  >
                    <FiEdit size={18} />
                    Edit
                  </motion.button>

                  {/* 🔴 Delete Button */}
                  <motion.button
                    onClick={() => deleteProduct(p._id)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition-all hover:from-red-600 hover:to-red-700"
                  >
                    <FiTrash2 size={18} />
                    Delete
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0B1F1A] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-[#008080] to-[#00a6a6] text-white p-5">
              <h2 className="text-xl font-bold">
                Edit Product – {editingProduct.name}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={updateProduct} className="p-6 space-y-4 text-white">
              <input
                name="name"
                className="border border-gray-700 p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#00A86B] bg-[#082A23]"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
              />

              <input
                name="price"
                className="border border-gray-700 p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#00A86B] bg-[#082A23]"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
              />

              <input
                name="category"
                className="border border-gray-700 p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#00A86B] bg-[#082A23]"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
              />

              <input
                name="image"
                className="border border-gray-700 p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#00A86B] bg-[#082A23]"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
              />

              <textarea
                name="text"
                className="border border-gray-700 p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#00A86B] bg-[#082A23]"
                value={form.text}
                onChange={handleChange}
                placeholder="Description"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A86B] text-white rounded-lg hover:brightness-110 shadow"
                >
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
