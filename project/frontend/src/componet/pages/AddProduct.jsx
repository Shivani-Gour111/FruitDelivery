import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = ({ brandGreen, textGreen, brandOrange, hoverOrange }) => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    image: "",
    text: ""
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch Products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/update/${editId}`, formData);
        toast.success("✅ Product Updated Successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products/admin/add-product", formData);
        toast.success("✅ Product Added Successfully!");
      }

      setFormData({ category: "", name: "", price: "", image: "", text: "" });
      setEditId(null);
      fetchProducts();

    } catch (error) {
      toast.error("❌ Something went wrong");
      console.log(error);
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
    toast.success("🗑️ Product Deleted!");
    fetchProducts();
  };

  const editProduct = (product) => {
    setEditId(product._id);
    setFormData(product);
  };

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      {/* Form Card */}
      <div className={`bg-[#0B1F1A] shadow-lg rounded-xl p-6 max-w-md mx-auto border border-gray-800 mb-6`}>
        <h2 className={`text-2xl font-bold mb-4 text-center ${textGreen}`}>
          {editId ? "✏️ Update Product" : "➕ Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0B1F1A] text-white"
            required
          >
            <option value="">Select Category</option>
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
          </select>

          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0B1F1A] text-white"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0B1F1A] text-white"
            required
          />
          <input
            name="image"
            placeholder="Image Name (apple.jpg)"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0B1F1A] text-white"
            required
          />
          <input
            name="text"
            placeholder="Short Description"
            value={formData.text}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-[#0B1F1A] text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${brandGreen} text-white py-3 rounded-lg font-semibold hover:brightness-110 transition-all`}
          >
            {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product Table */}
      <div className="bg-[#0B1F1A] shadow-md rounded-lg p-4 overflow-auto">
        <h3 className={`text-xl font-bold mb-4 ${textGreen}`}>📦 Product List</h3>
        <table className="w-full border border-gray-700 text-white">
          <thead>
            <tr className="bg-[#082A23]">
              <th className="p-2 border border-gray-700">Name</th>
              <th className="p-2 border border-gray-700">Price</th>
              <th className="p-2 border border-gray-700">Category</th>
              <th className="p-2 border border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-[#114c40] transition-colors">
                <td className="border border-gray-700 p-2">{p.name}</td>
                <td className="border border-gray-700 p-2">₹{p.price}</td>
                <td className="border border-gray-700 p-2">{p.category}</td>
                <td className="border border-gray-700 p-2 space-x-2">
                  <button
                    onClick={() => editProduct(p)}
                    className={`${brandOrange} text-white px-2 py-1 rounded hover:brightness-110`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:brightness-110"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProduct;
