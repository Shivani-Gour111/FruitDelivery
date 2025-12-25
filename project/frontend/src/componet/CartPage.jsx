import { useEffect } from "react";
import { useCart } from "./context/CartContext";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, loadCart, addQuantity, removeQuantity, removeFromCart } =useCart();


  useEffect(() => {
    loadCart();
  }, []);

  const items = cart || [];

  const itemTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = itemTotal > 299 ? 0 : 49;
  const toPay = itemTotal + deliveryFee;

  return (
    <div className="pt-24 pb-32 px-4 md:px-10 bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          className="text-2xl"
          onClick={() => window.history.back()}
        >
          ←
        </button>
        <h2 className="text-3xl font-bold text-green-700">Your Basket</h2>
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* LEFT SIDE – ITEMS */}
        <div className="md:col-span-2 space-y-6">
          {/* OFFER BANNER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 border border-green-300 rounded-2xl p-4 text-center text-green-700 font-semibold shadow-sm"
          >
            🎉 Free Delivery on Orders Above ₹299
          </motion.div>

          {/* ITEMS LIST */}
          <div className="bg-white rounded-2xl shadow p-4">
            {items.length === 0 ? (
              <p className="text-center py-8 text-gray-500 text-lg">
                Your basket is empty 🧺
              </p>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between py-5 border-b last:border-none"
                >
                  {/* LEFT PRODUCT */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name || "Product"}
                      className="w-20 h-20 rounded-xl shadow border object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        ₹{item.price} × {item.quantity}
                      </p>

                      {/* Quantity Buttons */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            item.quantity > 1 &&
                           removeQuantity(item.productId)
                          }
                          
                          className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full font-bold"
                        >
                          –
                        </button>

                        <span className="font-bold text-green-700">
                          {item.quantity}
                        </span>

                        <button
                         onClick={() => addQuantity(item.productId)}
                          className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT PRICE & REMOVE */}
                  <div className="text-right">
                    <p className="text-green-700 text-xl font-bold">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-500 mt-3"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Recommended Section */}
          <div>
            <h3 className="text-xl font-bold text-green-700 mb-3">
              You Might Like
            </h3>
            <div className="flex gap-5 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[150px] bg-white rounded-2xl shadow p-4"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
                    alt="Fresh Apple"
                    className="w-24 h-24 mx-auto"
                  />
                  <p className="font-semibold text-center mt-2">Fresh Apple</p>
                  <p className="text-center text-green-700 font-bold">₹120</p>
                  <button
                    onClick={() =>
                      addToCart({
                        productId: `apple${i}`,
                        name: "Fresh Apple",
                        price: 120,
                        image:
                          "https://cdn-icons-png.flaticon.com/512/415/415733.png",
                      })
                    }
                    className="mt-2 w-full bg-green-600 text-white rounded-lg py-1"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – BILL & ADDRESS */}
        <div className="space-y-6">
          {/* BILL */}
          <div className="bg-white rounded-2xl shadow p-5 sticky top-24">
            <h3 className="text-2xl font-bold text-green-700 mb-5">
              Bill Details
            </h3>
            <div className="flex justify-between text-gray-600 mb-3">
              <span>Item Total</span>
              <span className="text-black font-medium">₹{itemTotal}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-3">
              <span>Delivery Fee</span>
              <span className="text-black font-medium">₹{deliveryFee}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-bold text-green-700">
              <span>Total Amount</span>
              <span>₹{toPay}</span>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="font-bold text-green-700">Delivery Address</p>
            <p className="text-gray-600 text-sm mt-1">
              #41, Green Valley Street, Fresh Town
            </p>
            <button className="text-green-600 text-sm mt-2">Change</button>
          </div>
        </div>
      </div>

      {/* CHECKOUT BUTTON – MOBILE FIXED */}
      <div className="fixed md:hidden bottom-0 left-0 w-full p-4 bg-white shadow-2xl">
        <button
          className="w-full bg-green-700 text-white py-3 rounded-full font-bold text-lg"
          disabled={items.length === 0}
        >
          Checkout – ₹{toPay}
        </button>
      </div>
    </div>
  );
}
