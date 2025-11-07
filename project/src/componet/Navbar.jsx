import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
// ✅ FaLeaf को FaShoppingBag के साथ import किया गया है
import { FaShoppingBag, FaTimes, FaLeaf } from "react-icons/fa"; 
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { useLike } from "./LikeContext";
import Wishlist from "./Wishlist";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { motion } from "framer-motion";

// ⚠️ DropdownMenu कंपोनेंट को पूरी तरह से हटा दिया गया है।
// ❌ DropdownMenu फ़ंक्शन यहाँ से हटा दिया गया है।

// ✅ नया Logo Component (बड़ा साइज़)
function Logo() {
  return (
    // NavLink: Logo को होम पेज से लिंक करता है
    <NavLink to="/" className="flex items-center space-x-2 p-1">
      
      {/* 🌿 FaLeaf Icon (बड़ा साइज़: h-8 w-8) */}
      <FaLeaf className="h-8 w-8 text-green-400 transform rotate-12" />
      
      {/* 🖋️ Logo Text (बड़ा साइज़: text-2xl) */}
      <span className="text-white text-2xl font-extrabold tracking-tight">
        Fresh<span className="text-green-400">Co</span> 
      </span>
      
    </NavLink>
  );
}

// ---
// ✅ Main Navbar Component
// ---

function Navbar() {
  const { likedItems } = useLike();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();


  // Stop body scroll when Wishlist is open
  useEffect(() => {
    document.body.style.overflow = showWishlist ? "hidden" : "auto";
  }, [showWishlist]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-teal-900 border-b border-gray-200">
      <div className="w-full flex items-center justify-between px-6 md:px-10 py-3">
        
        {/* ✅ Left Side: Dropdown की जगह अब Logo है */}
        <div className="flex items-center space-x-4">
          <Logo />
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-8 text-white font-medium text-lg mx-auto">
          {[
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" },
            { name: "Fruits", path: "/fruits" },
            { name: "Vegetables", path: "/vegetables" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative transition-all duration-300 hover:text-green-400 ${isActive
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[2px] after:bg-green-500"
                    : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          {/* ❤️ & 🛍️ */}
          <div className="relative flex items-center space-x-6 text-white">
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `relative text-2xl transition-all duration-300 ${isActive 
                    ? "after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[2px] after:bg-green-500"
                    : ""
                  }`
              }
            >
              <AiOutlineHeart />
              {likedItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {likedItems.length}
                </span>
              )}
            </NavLink>

<div className="relative">
  <motion.div
    whileTap={{ scale: 0.9 }}
    className="cursor-pointer text-2xl hover:text-green-400"
    onClick={() => navigate("/cart")}  // ✅ Add this line
  >
    <FaShoppingBag />
  </motion.div>

  {cartItems.length > 0 && (
    <motion.span
      key={cartItems.length}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
    >
      {cartItems.length}
    </motion.span>
  )}
</div>



          </div>

          {/* Login / Signup */}
          <div className="hidden md:flex items-center space-x-3">
            <button  onClick={() => navigate("/login")} className="flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-md hover:bg-green-600 hover:text-white text-sm">
              <MdOutlineAccountCircle className="text-lg" /> Login
            </button>
            <button  onClick={() => navigate("/signup")} className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-white hover:text-black text-sm">
              <MdOutlineAccountCircle className="text-lg" /> Signup
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white text-3xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-teal-800 text-white px-6 py-4 space-y-4">
          {[
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" },
            { name: "Fruits", path: "/fruits" },
            { name: "Vegetables", path: "/vegetables" },
            { name: "Contact", path: "/contact" },
            { name: "Login", path: "/login" },
            { name: "Sing Up", path: "/signup" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)} // ✅ Close menu on click
              className="block text-lg font-medium hover:text-green-400"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}


      {/* ❤️ Wishlist Modal */}
      {showWishlist && (
        <Wishlist />
      )}
    </nav>
  );
}

export default Navbar;