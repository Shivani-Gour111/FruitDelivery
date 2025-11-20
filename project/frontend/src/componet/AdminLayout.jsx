import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
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
  const brandGreen = 'bg-[#008080]';
  const textGreen = 'text-[#008080]';
  const brandOrange = 'bg-[#FF6600]';
  const hoverOrange = 'hover:bg-[#E65C00]';

  const [activeSection, setActiveSection] = useState('dashboard');

  // Sidebar menu
  const sidebarMenu = [
    { key: "dashboard", label: "Dashboard", icon: <MdDashboard size={22} /> },
    { key: "categories", label: "Categories", icon: <MdCategory size={22} /> },
    { key: "products", label: "Products", icon: <MdShoppingBag size={22} /> },
    { key: "users", label: "Users", icon: <MdPeople size={22} /> },
    { key: "orders", label: "Orders", icon: <MdShoppingCart size={22} /> },
    { key: "reports", label: "Reports", icon: <MdAssessment size={22} /> },
    { key: "settings", label: "Settings", icon: <MdSettings size={22} /> },
  ];

  // ---------- Dynamic Search State ----------
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);

  // ---------- Dynamic Notifications ----------
  const [notifications, setNotifications] = useState([]);

  // ---------- Dynamic Profile ----------
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

  // ---------- Search Input Handler ----------
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
    <div className="flex h-screen bg-gray-100 font-sans">

      {/* SIDEBAR */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        brandGreen={brandGreen}
        sidebarMenu={sidebarMenu}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

<header className="
  sticky top-0 z-50 
  bg-white/30 backdrop-blur-2xl 
  border-b border-white/40 
  shadow-[0_8px_30px_rgb(0,0,0,0.08)]
">

  <div className="flex items-center justify-between px-6 py-4">

    {/* LEFT – PAGE TITLE */}
    <div>
      <h1 className="text-2xl font-bold text-gray-800 tracking-wide flex items-center gap-2">
        <span className="text-[#008080]">
          {sidebarMenu.find(item => item.key === activeSection)?.label}
        </span>
        <span className="text-gray-500 font-medium">Panel</span>
      </h1>
      <p className="text-gray-400 text-sm -mt-1">
        Manage & control everything easily
      </p>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-6">

      {/* SEARCH */}
      <div className="relative group">
        <input
          type="text"
          placeholder="Search anything..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="
            w-48 sm:w-72
            px-5 py-2 pl-12
            rounded-full
            bg-white/60
            border border-gray-300/60
            backdrop-blur-xl
            shadow-sm 
            focus:ring-2 focus:ring-[#008080] focus:border-[#008080]
            transition-all duration-300
            group-hover:shadow-md
          "
        />

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
          🔍
        </span>

        {/* SEARCH RESULT BOX */}
        {showSearchBox && searchResults.length > 0 && (
          <div className="
            absolute top-full mt-3 w-full 
            bg-white/90 backdrop-blur-xl
            rounded-xl border shadow-xl
            z-50 max-h-60 overflow-y-auto
          ">
            {searchResults.map((item, index) => (
              <div key={index}
                className="p-3 flex gap-3 hover:bg-gray-100 cursor-pointer transition">
                <div className="text-[#008080] font-semibold">{item.type}:</div>
                <div className="text-gray-700">{item.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NOTIFICATION */}
      <div className="relative cursor-pointer select-none">
        <div className="
          text-2xl hover:scale-110 
          transition transform duration-200
        ">
          🔔
        </div>

        {notifications.length > 0 && (
          <span className="
            absolute -top-1 -right-1 
            bg-red-600 text-white 
            text-xs px-2 py-0.5 rounded-full
            animate-pulse shadow-lg
          ">
            {notifications.length}
          </span>
        )}
      </div>

      {/* PROFILE */}
      <div className="relative group">
        <div className="
          flex items-center gap-2 
          cursor-pointer p-2 
          rounded-full hover:bg-white/60 
          transition backdrop-blur-xl
        ">
          <img
            src={profile.avatar || 'https://picsum.photos/70'}
            className="h-9 w-9 rounded-full shadow-md object-cover"
          />
          <span className="hidden md:block font-medium text-gray-700">
            {profile.name || "Admin"}
          </span>
        </div>

        {/* PROFILE MENU */}
        <div className="
          absolute right-0 mt-3 w-52 
          bg-white/80 backdrop-blur-xl 
          shadow-2xl rounded-xl border
          p-3 
          opacity-0 group-hover:opacity-100 
          scale-95 group-hover:scale-100 
          pointer-events-none group-hover:pointer-events-auto 
          transition-all duration-200 z-50
        ">                                      
          <div
            onClick={() => window.location.href = '/admin/profile'}
            className="
              px-4 py-2 
              text-gray-700 
              hover:bg-gray-100 
              rounded cursor-pointer
            ">
            View Profile
          </div>

          <div
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin-login";
            }}
            className="
              px-4 py-2 
              text-red-600 
              hover:bg-red-100 
              rounded cursor-pointer
            ">
            Logout
          </div>
        </div>
      </div>

    </div>
  </div>
</header>




        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
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
