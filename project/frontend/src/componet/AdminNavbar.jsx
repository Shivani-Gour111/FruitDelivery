import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

const AdminNavbar = ({ activeSection, setActiveSection, brandGreen }) => {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({ name: "Admin", avatar: "" });

  useEffect(() => {
    // load profile & notifications optionally
    // axios.get('/api/admin/profile').then(...);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#071F1A] border-b border-[#10352E]">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Sidebar toggle */}
          <button
            className="p-2 rounded-md hover:bg-[#0C2A24] transition text-white"
            aria-label="toggle sidebar"
            onClick={() => {
              // optionally add sidebar collapse state
            }}
          >
            ☰
          </button>

          {/* Search input */}
          <div className="relative">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search anything..."
              className="w-64 sm:w-96 px-4 py-2 rounded-full bg-[#0C2A24] border border-[#114c40] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00BFA5] outline-none"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-5">
          {/* notifications */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown((s) => !s)}
              className="p-2 rounded-full hover:bg-[#0C2A24] transition text-white"
            >
              <Bell size={22} />
            </button>

            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                {notifications.length}
              </span>
            )}

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-80 bg-[#0C2A24] shadow-xl rounded-xl border border-[#10352E] p-3 z-50 text-white">
                <h4 className="font-semibold text-white mb-2">Notifications</h4>
                {notifications.length === 0 ? (
                  <div className="text-sm text-gray-400">No new notifications</div>
                ) : (
                  notifications.map((n, i) => (
                    <div key={i} className="p-2 rounded hover:bg-[#114c40]">
                      <div className="text-sm">{n.message}</div>
                      <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* profile */}
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar || "https://picsum.photos/seed/admin/200"}
              alt="admin"
              className="w-10 h-10 rounded-full object-cover shadow"
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium text-white">{profile.name}</div>
              <div className="text-xs text-gray-400">Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
