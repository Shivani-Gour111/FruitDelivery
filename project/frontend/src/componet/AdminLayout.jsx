import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

import DashboardContent from './context/DashboardContent';
import axios from "axios";

// React Icons
import {
  MdDashboard,
  MdCategory,
  MdShoppingBag,
  MdPeople,
  MdShoppingCart,
  MdAssessment,
  MdSettings
} from "react-icons/md";

const AdminLayout = () => {

  const brandGreen = 'bg-[#00A86B]';  // Premium Green
  const textGreen = 'text-[#00A86B]';
  const brandOrange = 'bg-[#FF8C32]'; // Fruit-Theme Orange
  const hoverOrange = 'hover:bg-[#ff7a10]';

  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarMenu = [
    { key: "dashboard", label: "Dashboard", icon: <MdDashboard size={22} /> },
    { key: "categories", label: "Categories", icon: <MdCategory size={22} /> },
    { key: "products", label: "Products", icon: <MdShoppingBag size={22} /> },
    { key: "users", label: "Users", icon: <MdPeople size={22} /> },
    { key: "orders", label: "Orders", icon: <MdShoppingCart size={22} /> },
    { key: "reports", label: "Reports", icon: <MdAssessment size={22} /> },
    { key: "settings", label: "Settings", icon: <MdSettings size={22} /> },
  ];

  // SEARCH UI STATES
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);

  // NOTIFICATIONS
  const [notifications, setNotifications] = useState([]);

  // PROFILE
  const [profile, setProfile] = useState({
    name: "",
    avatar: ""
  });

  useEffect(() => {
    loadProfile();
    loadNotifications();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/profile");
      setProfile(res.data);
    } catch (error) {
      console.log("Profile Error", error);
    }
  };

  const loadNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.log("Notification Error", error);
    }
  };

  // SEARCH Handler
  const handleSearch = async (value) => {
    setSearchText(value);

    if (value.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/search?q=${value}`
      );

      const results = [
        ...res.data.products.map(p => ({ type: "Product", name: p.name })),
        ...res.data.orders.map(o => ({ type: "Order", name: "Order #" + o._id })),
        ...res.data.users.map(u => ({ type: "User", name: u.name })),
      ];

      setSearchResults(results);
      setShowSearchBox(true);

    } catch (error) {
      console.log("Search Error:", error);
    }
  };

  return (


    <div className="flex min-h-screen bg-[#091614] text-white">

      {/* LEFT SIDEBAR */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        brandGreen={brandGreen}
        sidebarMenu={sidebarMenu}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER — Ultra Modern Glass UI */}
        <AdminNavbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          brandGreen={brandGreen}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardContent
            activeSection={activeSection}
            brandOrange={brandOrange}
            textGreen={textGreen}
            brandGreen={brandGreen}
            hoverOrange={hoverOrange}
          />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
