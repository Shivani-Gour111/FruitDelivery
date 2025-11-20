import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2, Edit, X } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // Load categories
  const loadCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  // Add category
  const addCategory = async () => {
    if (!name.trim()) return;
    await axios.post("http://localhost:5000/api/categories", { name });
    setName("");
    loadCategories();
  };

  // Delete category
  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    loadCategories();
  };

  // Update category
  const updateCategory = async () => {
    if (!editName.trim()) return;
    await axios.put(`http://localhost:5000/api/categories/${editId}`, {
      name: editName,
    });
    setEditId(null);
    setEditName("");
    loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#008080] to-[#00a6a6] text-white p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-3xl font-bold">Categories Management</h2>
        <p className="opacity-80 mt-1">Manage all product categories here</p>
      </div>

      {/* Add Category Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Add New Category
        </h3>

        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-64 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008080]"
          />

          <button
            onClick={addCategory}
            className="flex items-center gap-2 bg-[#008080] text-white px-5 py-3 rounded-lg 
            shadow-md hover:bg-[#006666] active:scale-95 transition"
          >
            <Plus size={18} /> Add Category
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white p-6 rounded-xl shadow-lg border 
            hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer"
          >
            {/* Category Name */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {cat.name}
            </h3>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setEditId(cat._id);
                  setEditName(cat.name);
                }}
                className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 shadow-sm"
              >
                <Edit size={18} />
              </button>

              <button
                onClick={() => deleteCategory(cat._id)}
                className="p-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 shadow-sm"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-4 z-50">

          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl scale-100 animate-fadeIn relative">
            <button
              onClick={() => setEditId(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            <h3 className="text-2xl font-bold mb-4 text-gray-800">Edit Category</h3>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border w-full p-3 rounded-lg mb-4 shadow-sm focus:ring-2 focus:ring-[#008080]"
            />

            <button
              onClick={updateCategory}
              className="w-full bg-[#008080] text-white py-3 rounded-lg hover:bg-[#006666] 
              shadow-md active:scale-95 transition"
            >
              Update Category
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
