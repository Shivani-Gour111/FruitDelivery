import React from "react";

const Sidebar = ({ activeSection, setActiveSection, brandGreen, sidebarMenu }) => {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">

      <div
        className={`h-16 flex items-center justify-center font-bold text-white ${brandGreen}`}
      >
        Admin Panel
      </div>

      <nav className="flex-1 overflow-y-auto mt-2">

        {sidebarMenu.map((item) => (
          <div
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`
              flex items-center p-4 cursor-pointer relative
              transition-all duration-300
              ${activeSection === item.key ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}
            `}
          >

            {/* Smooth left border animation */}
            <div
              className={`
                absolute left-0 top-0 h-full w-1 rounded-r-lg 
                transition-all duration-300
                ${activeSection === item.key ? brandGreen : "bg-transparent group-hover:bg-gray-300"}
              `}
            ></div>

            {/* Icon with soft animation */}
            <span
              className={`
                text-xl mr-2 transition-all duration-300
                ${activeSection === item.key ? "scale-110" : "group-hover:scale-105"}
              `}
              style={{ display: "flex" }}
            >
              {item.icon}
            </span>

            {/* Label with fade + slide animation */}
            <span
              className={`
                hidden sm:block transition-all duration-300
                ${activeSection === item.key ? "translate-x-1 opacity-100" : "opacity-80 group-hover:opacity-100 group-hover:translate-x-1"}
              `}
            >
              {item.label}
            </span>

            {/* bottom hover underline */}
            <div
              className="
                absolute bottom-0 left-3 right-3 h-[2px] bg-gray-300
                scale-x-0 group-hover:scale-x-100
                transition-all duration-300 origin-left
              "
            ></div>

          </div>
        ))}

      </nav>
    </aside>
  );
};

export default Sidebar;
