import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Load liked products when user logs in
  useEffect(() => {
    if (user?._id) {
      fetchLikes();
    } else {
      setLikedItems([]);
    }
  }, [user]);

  // ✅ Fetch liked products
  const fetchLikes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/like/${user._id}`);
      setLikedItems(res.data.map((like) => like.productId));
    } catch (err) {
      console.error("Error fetching liked items:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle Like / Unlike
  const toggleLike = async (product) => {
    if (!user) {
      setShowPopup(true);
      return;
    }

    try {
      setLoading(true);
      const alreadyLiked = likedItems.some((p) => p._id === product._id);

      if (alreadyLiked) {
        await axios.delete(
          `http://localhost:5000/api/like/${user._id}/${product._id}`
        );
        setLikedItems((prev) => prev.filter((p) => p._id !== product._id));
      } else {
        await axios.post("http://localhost:5000/api/like", {
          userId: user._id,
          productId: product._id,
        });
        setLikedItems((prev) => [...prev, product]);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  const isLiked = (productId) => likedItems.some((p) => p._id === productId);

  // ✅ Login Popup
  const LoginPopup = () => (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white/90 backdrop-blur-md border border-green-200 rounded-3xl shadow-2xl w-80 p-6 text-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
            >
              <IoClose size={22} />
            </button>

            {/* Floating Heart */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-green-600 flex justify-center mb-4"
            >
              <FaHeart size={46} className="drop-shadow-md" />
            </motion.div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Login to Save Your Favorites
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              Sign in to keep track of your liked fruits & vegetables.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setShowPopup(false);
                  navigate("/login");
                }}
                className="px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-md hover:shadow-lg transition"
              >
                <MdLogin size={18} />
                Login
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <LikeContext.Provider value={{ likedItems, toggleLike, isLiked, loading }}>
      {children}
      {loading && (
        <div className="fixed top-4 right-4 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full shadow-md">
          Processing...
        </div>
      )}
      <LoginPopup />
    </LikeContext.Provider>
  );
};

export const useLike = () => useContext(LikeContext);
