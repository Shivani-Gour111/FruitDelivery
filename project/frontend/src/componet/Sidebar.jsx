import React from "react";
import { LayoutDashboard, ShoppingBag, Users, Package, LogOut } from "lucide-react";

const menu = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { key: "categories", label: "Categories", icon: <Package size={20} /> }, // Added to match Material sidebar
  { key: "products", label: "Products", icon: <Package size={20} /> },
  { key: "users", label: "Users", icon: <Users size={20} /> },
  { key: "orders", label: "Orders", icon: <ShoppingBag size={20} /> },
  { key: "reports", label: "Reports", icon: <LayoutDashboard size={20} /> }, // placeholder icon
  { key: "settings", label: "Settings", icon: <LayoutDashboard size={20} /> }, // placeholder icon
];

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="w-72 min-w-[18rem] h-screen bg-[#071F1A] flex flex-col sticky top-0">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#008080] flex items-center justify-center text-white font-bold shadow">
          🍇
        </div>
        <div className="text-lg font-bold text-green-400">FreshAdmin</div>
      </div>

      {/* Menu */}
      <nav className="flex-1 h-screen overflow-hidden  p-3 space-y-1">
        {menu.map((item) => {
          const active = activeSection === item.key;
          return (
            <div
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`relative group flex items-center gap-4 px-3 py-3 rounded-lg cursor-pointer transition-all ${active ? "bg-gradient-to-r from-white/10 to-green-900/20 shadow-md" : "hover:bg-[#0C2A24]"
                }`}
            >
              {/* Left active capsule */}
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-lg transition-all ${active ? "bg-[#008080]" : "bg-transparent group-hover:bg-[#114c40]"
                  }`}
              />

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center ${active ? "bg-[#0C2A24]" : "bg-[#071F1A]"
                  } shadow-sm`}
              >
                <div className={`${active ? "text-[#00BFA5]" : "text-white"}`}>{item.icon}</div>
              </div>

              {/* Label */}
              <div className={`text-sm font-medium ${active ? "text-[#00BFA5]" : "text-white"}`}>
                {item.label}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      {/* <div className="mt-auto p-4">
        <button className="flex items-center gap-3 p-3 rounded-lg bg-[#0C2A24] hover:bg-[#581414] transition-colors w-full">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div> */}
      <div className="mt-auto p-4">
  <button className="flex items-center gap-3 p-3 rounded-lg bg-[#0C2A24] hover:bg-[#581414] transition-colors w-full">
    <LogOut size={20} />
    <span>Logout</span>
  </button>
</div>

    </aside>
  );
};

export default Sidebar;
