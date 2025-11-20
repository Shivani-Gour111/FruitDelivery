import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Trash2, UserPlus, Shield, Search } from "lucide-react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/get-users");
      setUsers(res.data.users);
    } catch {}
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/add-user", formData);
      toast.success("User Added Successfully!");
      setFormData({ name: "", email: "", password: "", role: "" });
      loadUsers();
    } catch (error) {
      toast.error("Failed to add user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/delete-user/${id}`);
      toast.success("User Deleted!");
      loadUsers();
    } catch {}
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-[30px] bg-gradient-to-br from-white to-gray-100 shadow-2xl border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="text-[#008080]" size={34} />
          <h2 className="text-3xl font-bold text-[#008080]">User Management</h2>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            className="pl-10 pr-4 py-2 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-[#008080] outline-none"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Add User Card */}
      <motion.form
        onSubmit={addUser}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-gray-200 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all mb-8"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <UserPlus size={22} className="text-[#008080]" />
          Add New User
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl shadow-inner bg-gray-50 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email Address</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl shadow-inner bg-gray-50 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl shadow-inner bg-gray-50 focus:ring-2 focus:ring-[#008080] outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl bg-gray-50 shadow-inner focus:ring-2 focus:ring-[#008080] outline-none"
            >
              <option>Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <button className="mt-5 bg-gradient-to-r from-[#008080] to-[#00a3a3] text-white py-3 px-10 rounded-xl text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
          Add User
        </button>
      </motion.form>

      {/* Users Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="border rounded-3xl overflow-hidden shadow-lg bg-white">
          <table className="w-full">
            <thead className="bg-[#008080] text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Password (hashed)</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u, index) => (
                  <motion.tr
                    key={u._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-all border-b"
                  >
                    <td className="p-4">{u.name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4 capitalize">{u.role}</td>
                    <td className="p-4 text-gray-500">{u.password}</td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="bg-red-600 text-white p-2 rounded-xl shadow hover:bg-red-700 hover:scale-110 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UsersPage;
