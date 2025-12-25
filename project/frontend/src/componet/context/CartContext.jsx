
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // AuthContext se current user
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth(); // logged-in user

  // Get current userId safely
  const userId = user?._id || user?.id; 

  // Load cart
  const loadCart = async () => {
    if (!userId) return; // user not logged in
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(res.data.items || []);
    } catch (error) {
      console.error("LOAD CART ERROR:", error);
    }
  };

  // Add to cart
  const addToCart = async (product) => {
    if (!userId) {
      alert("Please login first!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        productId: product.productId || product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      setCart(res.data.items);
      toast.success("item  added to your basket!!");
    } catch (error) {
      console.error("ADD TO CART ERROR:", error);
    }
  };

  // Increase quantity
  const addQuantity = async (productId) => {
    if (!userId) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/increase/${userId}/${productId}`
      );
      setCart(res.data.items);
    } catch (error) {
      console.error("INCREASE ERROR:", error);
    }
  };

  // Decrease quantity
  const removeQuantity = async (productId) => {
    if (!userId) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/cart/decrease/${userId}/${productId}`
      );
      setCart(res.data.items);
    } catch (error) {
      console.error("DECREASE ERROR:", error);
    }
  };

  // Remove item completely
  const removeFromCart = async (productId) => {
    if (!userId) return;
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/delete/${userId}/${productId}`
      );
      setCart(res.data.items);
    } catch (error) {
      console.error("REMOVE ERROR:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loadCart,
        addToCart,
        addQuantity,
        removeQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
