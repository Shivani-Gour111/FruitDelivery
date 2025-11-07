import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { useLike } from "./LikeContext";
import { motion } from "framer-motion";
import { useCart } from "./context/CartContext";
const productsData = {
  "Fresh Fruits": [
    { id: 1, category: "Fruits", name: "The Bananas", price: "₹122", rating: 4, image: "./Banana.jpg" },
    { id: 2, category: "Fruits", name: "Fresh Watermelon", price: "₹722", rating: 1, image: "./Watermelon.jpg" },
    { id: 3, category: "Fruits", name: "Fresh Apple", price: "₹962", rating: 4, image: "./Apple.jpg" },
    { id: 4, category: "Fruits", name: "The Cherry Bunch", price: "₹70", rating: 4, image: "./cherry.jpg" },
  ],
  "Fresh Vegetables": [
    { id: 6, category: "Vegetables", name: "Strawberries", price: 540, rating: 5, image: "./stroberi.jpg" },
  ],
  "Top Selling": [
    { id: 7, category: "Top Selling", name: "Mango", price: 400, rating: 5, image: "./mango.jpg" },
  ],
};
export default function TopProducts() {
  const [activeTab, setActiveTab] = useState("Fresh Fruits");
  const { toggleLike, isLiked } = useLike();
  const { addToCart } = useCart();
  return (
    <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12 bg-green-50 relative">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-10">
        Top Products
      </h2>
      {/* ✅ Tabs */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12">
        {Object.keys(productsData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-lg font-semibold transition-all ${
              activeTab === tab
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productsData[activeTab].map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden relative hover:shadow-2xl transition-all duration-300 group"
            whileHover={{ scale: 1.03 }}
          >
            <button
              onClick={() => toggleLike(product)}
              className="absolute right-3 top-3 text-2xl z-10 transition-transform duration-300 hover:scale-125"
            >
              {isLiked(product) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400 hover:text-red-400" />
              )}
            </button>
        
            <div className="w-full h-56 flex bg-white items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-36 h-36 object-contain mx-auto mt-4 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 border-b border-gray-200 pb-2">
                {product.subtext || "Premium Quality"}
              </p>
              <div className="flex justify-center items-center mt-3">
                <p className="text-yellow-600 font-semibold text-lg">
                  {product.price}
                </p>
              </div>  
              <button
                onClick={() => addToCart(product)}
                className="mt-4 sm:mt-5 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 sm:px-5 rounded-full flex items-center justify-center gap-2 mx-auto transition-transform duration-300 group-hover:scale-105"
              >
                Add to Cart <FaShoppingCart className="text-base" />
              </button>   
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
