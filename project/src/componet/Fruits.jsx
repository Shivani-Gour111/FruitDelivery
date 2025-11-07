
import React, { useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "./context/CartContext";
// import { useCart } from "../context/CartContext"
import { useLike } from "./LikeContext";
import { FaRegHeart ,FaHeart,} from "react-icons/fa";

function Fruits() {
  const { addToCart } = useCart();
 const { toggleLike, isLiked } = useLike();

  //   const [cart, setCart] = useState([]);

  // const addToCart = (item) => {
  //   const exist = cart.find((x) => x.id === item.id);
  //   if (exist) {
  //     // agar already cart me hai to quantity badhao
  //     setCart(
  //       cart.map((x) =>
  //         x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
  //       )
  //     );
  //   } else {
  //     // agar pehli baar add kar raha hai
  //     setCart([...cart, { ...item, quantity: 1 }]);
  //   }
  // };

  // const increment = (id) => {
  //   setCart(
  //     cart.map((x) =>
  //       x.id === id ? { ...x, quantity: x.quantity + 1 } : x
  //     )
  //   );
  // };

  // const decrement = (id) => {
  //   setCart(
  //     cart
  //       .map((x) =>
  //         x.id === id ? { ...x, quantity: x.quantity - 1 } : x
  //       )
  //       .filter((x) => x.quantity > 0)
  //   );
  // };
  // const totalPrice = cart.reduce(
  //   (acc, item) => acc + parseFloat(item.price.replace("$", "")) * item.quantity,
  //   0
  // );
 const products = [
  { id: 1, name: "Papaya", price: "₹110.00", image: "Papaya1.jpg", category: "Fruits" },
  { id: 2, name: "Kiwi", price: "₹90.00", image: "kiwi1.jpg", category: "Fruits" },
  { id: 3, name: "Granatalma", price: "₹50.00", image: "Gránátalma.jpg", category: "Fruits" },
  { id: 4, name: "Banana", price: "₹120.00", image: "Banana.jpg", category: "Fruits" },
  { id: 5, name: "Stroberi", price: "₹99.00", image: "stroberi.jpg", category: "Fruits" },
  { id: 6, name: "Apple", price: "₹80.00", image: "Apple.jpg", category: "Fruits" },
  { id: 7, name: "Mango", price: "₹130.00", image: "mango.jpg", category: "Fruits" },
  { id: 8, name: "Grapes", price: "₹70.00", image: "grapes1.jpg", category: "Fruits" },
  { id: 9, name: "Orange", price: "₹100.00", image: "o.jpg", category: "Fruits" },
  { id: 10, name: "Cherry", price: "₹140.00", image: "cherry.jpg", category: "Fruits" },
  { id: 11, name: "Pear", price: "₹99.00", image: "Pear.jpg", category: "Fruits" },
  { id: 12, name: "Custard Apple", price: "₹80.00", image: "c1.jpg", category: "Fruits" },
  { id: 13, name: "Watermelon", price: "₹130.00", image: "Sandía.jpg", category: "Fruits" },
  { id: 14, name: "Raspberry", price: "₹70.00", image: "Raspberry.jpg", category: "Fruits" },
  { id: 15, name: "Dragon Fruit", price: "₹100.00", image: "Dragon1.jpg", category: "Fruits" },
  { id: 16, name: "Pineapple", price: "₹100.00", image: "p1.jpg", category: "Fruits" }
];

  return (
    <>
      <section
        className="relative w-full h-[95vh] bg-contain bg-right bg-no-repeat bg-fixed bg-white"
        style={{
          backgroundImage: "url('frutsh.jpg')",
          backgroundSize: 'contain',
          backgroundPosition: 'right',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center h-full px-6 md:px-16">
          <div className="max-w-lg md:max-w-xl lg:ml-20 text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-snug drop-shadow-xl">
              Naturally <span className="text-yellow-400">Sweet</span> <br />
              & <span className="text-green-300">Organically</span> Fresh
            </h1>
            <p className="mt-4 text-gray-100 text-xl md:text-2xl font-semibold leading-relaxed">
              Experience the finest seasonal produce. We deliver farm-to-kitchen freshness
              with guaranteed organic quality and taste.
            </p>
            <button className="mt-6 px-10 py-4 bg-green-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:bg-green-600 hover:scale-105 transition-transform duration-300">
              Shop Fresh Today
            </button>
          </div>
        </div>
      </section>


      <div className="bg-[#fdf6ee] min-h-screen py-12 px-4 md:px-6 lg:px-8">
        {/* 🍎 Products Heading 🍎 */}
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
          Seasonal <span className="text-yellow-600">Freshness</span>
        </h2>

        {/* Grid Container: यह मुख्य रिस्पॉन्सिव हिस्सा है */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center relative hover:shadow-2xl transition-all duration-300 group"
            >
              <button
                                        onClick={() => toggleLike(item)}
                                        className="absolute right-3 top-3 text-2xl z-10 transition-transform duration-300 hover:scale-125"
                                      >
                                        {isLiked(item) ? (
                                            <FaHeart className="text-red-500" />
                                        ) : (
                                          <FaRegHeart className="text-black hover:text-red-400" />
                                        )}
                                      </button>
              <img
                src={item.image}
                alt={item.name}

                className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mt-4 transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="mt-4 text-base md:text-xl font-bold text-gray-800">
                {item.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 border-b border-gray-200 pb-2">
                {item.subtext || "Premium Quality"}
              </p>
              <div className="flex justify-center items-center gap-2 mt-3">
                {item.oldPrice && (
                  <span className="text-gray-400 line-through text-xs md:text-sm">
                    {item.oldPrice}
                  </span>
                )}
                <span className="text-yellow-600 font-extrabold text-base md:text-lg">
                  {item.price}
                </span>
              </div>
              {/* 🛒 Add to Cart Button 🛒 */}
              <button
                             onClick={() => addToCart(item)} className="mt-5 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-5 rounded-full flex items-center justify-center gap-2 mx-auto transition-transform duration-300 group-hover:scale-105">
                              Add to Cart <FaShoppingCart />
                            </button>
            </div>
          ))}
        </div>

        {/* Browse All Products Button */}
        <div className="text-center mt-12">
          <button className="bg-yellow-400 text-gray-800 font-extrabold py-3 px-10 rounded-full border-2 border-yellow-600 hover:bg-yellow-500 hover:scale-105 transition-transform duration-300 shadow-xl">
            Browse All Products
          </button>
        </div>
        {/* Browse All Products Button */}

        {/* 🛒 Cart Section 🛒 */}
        {/* <div className="max-w-3xl mx-auto mt-16 bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">🛍️ Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-center text-gray-600">No items added yet.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-yellow-600 font-semibold">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decrement(item.id)}
                      className="bg-gray-200 px-3 py-1 rounded-full font-bold"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increment(item.id)}
                      className="bg-yellow-400 px-3 py-1 rounded-full font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <h3 className="text-right text-xl font-bold mt-4">
                Total: ${totalPrice.toFixed(2)}
              </h3>
            </div>
          )}
        </div> */}

      </div>



      {/* <section className="mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative">
        <div
          className="rounded-2xl p-8 flex flex-col justify-center shadow-lg transform transition-transform duration-300 hover:scale-105 h-96 md:h-[450px] bg-cover bg-center"
          style={{ backgroundImage: "url('background1.jpg')" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-green-300 drop-shadow-lg">
            Fresh Vegetable & Fruit Basket
          </h2>
          <p className="mt-3 text-black drop-shadow-md">
            Fresh, handpicked and delivered to your doorstep.
          </p>
        </div>
        <div
          className="rounded-2xl p-8 flex flex-col justify-center items-end shadow-lg transform transition-transform duration-300 hover:scale-105 h-96 md:h-[450px] bg-cover bg-center"
          style={{ backgroundImage: "url('foddebg.jpg')" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-green-300 drop-shadow-lg text-right">
            Best Cuisine from Around the World

          </h2>
          <p className="mt-3 text-black drop-shadow-md text-right">
            Delicious recipes & premium ingredients available every day.
          </p>
        </div>
      </section> */}
    </>
  );
}
export default Fruits; 
