import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useLike } from "./context/LikeContext";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

export default function TopProducts() {
  const [activeTab, setActiveTab] = useState("fruit");
  const [products, setProducts] = useState([]);
  const { toggleLike, isLiked } = useLike();
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const tabs = [
    { label: "Fresh Fruits", key: "fruit" },
    { label: "Fresh Vegetables", key: "vegetable" },
  ];

  const filteredProducts = products.filter((p) => p.category === activeTab);

  return (
    <div className="w-full px-6 py-12 bg-green-50">
      <h2 className="text-4xl font-bold text-center mb-10">Top Products</h2>

      <div className="flex justify-center gap-6 mb-8">
        {tabs.map(({ label, key }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`pb-2 text-lg font-semibold ${
              activeTab === key
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-green-50 min-h-screen  ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.slice(0, 4).map((product) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-2xl shadow-md p-6 text-center relative hover:shadow-lg transition-all duration-300 group"
              whileHover={{ scale: 1.03 }}
            >
              <button
                onClick={() => toggleLike(product)}
                className="absolute right-3 top-3 text-2xl z-10 transition-transform duration-300 hover:scale-125"
              >
                {isLiked(product._id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-400 hover:text-red-400" />
                )}
              </button>

              <img
                src={`/${product.image}`}
                alt={product.name}
                className="w-36 h-36 object-contain mx-auto mt-4 transition-transform duration-300 group-hover:scale-110"
              />

              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 border-b border-gray-200 pb-2">
                {product.subtext || "Fresh & Organic"}
              </p>

              <div className="flex justify-center items-center gap-2 mt-3">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ₹{product.oldPrice}
                  </span>
                )}
                <span className="text-yellow-600 font-semibold">
                  ₹{product.price}
                </span>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="mt-5 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-5 rounded-full flex items-center justify-center gap-2 mx-auto transition-transform duration-300 group-hover:scale-105"
              >
                Add to Cart <FaShoppingCart />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
