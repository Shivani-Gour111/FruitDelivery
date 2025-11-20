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

  if (loading) return <p>Loading...</p>;

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">All Products</h2>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/admin/add-product"
            className="bg-[#008080] text-white px-5 py-3 rounded-lg shadow-lg hover:bg-[#006666] transition"
          >
            + Add Product
          </Link>
        </motion.div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl border">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr  key={p._id}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="hover:bg-gray-50 transition">
                <td className="p-3 border">
                  <img
                    src={p.image}
                    className="h-12 mx-auto rounded shadow"
                    alt=""
                  />
                </td>

                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.category}</td>
                <td className="p-3 border">₹{p.price}</td>

<td className="p-3 border flex justify-center gap-3">

  {/* 🟢 Edit Button */}
  <motion.button
    onClick={() => openEditModal(p)}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 px-5 py-2 
               bg-gradient-to-r from-green-500 to-green-600
               text-white font-semibold rounded-full 
               shadow-md hover:shadow-xl transition-all
               hover:from-green-600 hover:to-green-700"
  >
    <FiEdit size={18} />
    Edit
  </motion.button>

  {/* 🔴 Delete Button */}
  <motion.button
    onClick={() => deleteProduct(p._id)}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 px-5 py-2 
               bg-gradient-to-r from-red-500 to-red-600
               text-white font-semibold rounded-full 
               shadow-md hover:shadow-xl transition-all
               hover:from-red-600 hover:to-red-700"
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

      {/* ⭐ PREMIUM MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-[#008080] to-[#00a6a6] text-white p-5">
              <h2 className="text-xl font-bold">
                Edit Product – {editingProduct.name}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={updateProduct} className="p-6 space-y-4">
              <input
                name="name"
                className="border p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#008080]"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
              />

              <input
                name="price"
                className="border p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#008080]"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
              />

              <input
                name="category"
                className="border p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#008080]"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
              />

              <input
                name="image"
                className="border p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#008080]"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
              />

              <textarea
                name="text"
                className="border p-3 w-full rounded-lg shadow focus:ring-2 focus:ring-[#008080]"
                value={form.text}
                onChange={handleChange}
                placeholder="Description"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666] shadow"
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
