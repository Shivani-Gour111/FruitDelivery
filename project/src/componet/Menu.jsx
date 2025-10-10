
import React from "react";
import { FiHome } from "react-icons/fi";
import { FaBoxOpen, FaLeaf, FaTruck, FaShoppingCart } from "react-icons/fa"; 
import { FaStar } from "react-icons/fa";

export default function Menu() {
  const categories = [
  {
    title: "Tomatoes",
    description:
      "Bursting with tangy freshness — add them to your salad, pasta, or cook up a saucy delight!",
    image: "logo1.jpg",
  },
  {
    title: "Blueberries",
    description:
      "Tiny power-packed bites of sweetness — perfect for smoothies, desserts, or a quick healthy snack!",
    image: "blueberries.jpg",
  },
  {
    title: "Strawberries",
    description:
      "Juicy, red, and irresistibly sweet — blend into shakes, top on cakes, or enjoy fresh from the basket!",
    image: "logo2.jpg",
  },
  {
    title: "Spinach",
    description:
      "Fresh green goodness — toss it in a salad, mix in curries, or cook a hearty homemade dish!",
    image: "spinach.jpg",
  },
];

  const products = [
  {
    id: 1,
    name: "Tomato",
    subtext: "Fresh Harvest", // juicy red tomatoes
    price: "$4.70",
    oldPrice: "$7.00",
    image: "Tomato.jpg",
    rating: 4.5,
    sale: true,
  },
  {
    id: 2,
    name: "Eggplant",
    subtext: "Farm Fresh", // shiny purple brinjal
    price: "$5.99",
    image: "Eggplant.jpg",
    rating: 5,
    sale: false,
  },
  {
    id: 3,
    name: "Matar",
    subtext: "Sweet Peas", // green peas
    price: "$9.99",
    image: "Matar.jpg",
    rating: 4.5,
    sale: false,
  },
  {
    id: 4,
    name: "Chili",
    subtext: "Hot Spice", // red chili
    price: "$7.00",
    oldPrice: "$9.00",
    image: "Chili.jpg",
    rating: 5,
    sale: true,
  },
  {
    id: 5,
    name: "Orange",
    subtext: "Citrus Fresh", // orange fruit
    price: "$9.99",
    image: "Orange1.jpg",
    rating: 4.5,
    sale: false,
  },
  {
    id: 6,
    name: "Mango",
    subtext: "Tropical King", // mango fruit
    price: "$7.00",
    oldPrice: "$9.00",
    image: "mango.jpg",
    rating: 5,
    sale: true,
  },
  {
    id: 7,
    name: "Grapes",
    subtext: "Juicy Bunch", // purple grapes
    price: "$7.00",
    oldPrice: "$9.00",
    image: "grapes1.jpg",
    rating: 5,
    sale: true,
  },
  {
    id: 8,
    name: "Strawberry",
    subtext: "Sweet Berry", // strawberries
    price: "$7.00",
    oldPrice: "$9.00",
    image: "stroberi.jpg",
    rating: 5,
    sale: true,
  },
];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[1000px] overflow-hidden">
        <div
          className="absolute inset-0 w-full  h-full bg-center bg-cover opacity-90"
          style={{ backgroundImage: "url('icon.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 -translate-y-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-300 mb-4">
            Welcome to Menu Page
          </h1>
          <p className="text-lg sm:text-2xl text-white max-w-2xl">
            Discover fresh, healthy meals delivered to your doorstep with speed
            and care.
          </p>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
         
          <div className="flex flex-col items-center">
            <div className="bg-yellow-400 p-4 rounded-full mb-4">
              <FiHome className="text-2xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Family-Owned & Operated
            </h3>
            <p className="text-sm text-gray-700">
              We’ve been growing with care for generations, right here on our
              land.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-yellow-400 p-4 rounded-full mb-4">
              <FaBoxOpen className="text-2xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Seasonal Farm Boxes</h3>
            <p className="text-sm text-gray-700">
              Get a rotating selection of what’s fresh, local, and in-season.
            </p>
          </div>

       
          <div className="flex flex-col items-center">
            <div className="bg-yellow-400 p-4 rounded-full mb-4">
              <FaLeaf className="text-2xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Sustainable & Eco-Friendly
            </h3>
            <p className="text-sm text-gray-700">
              We use regenerative farming methods and minimal packaging.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-400 p-4 rounded-full mb-4">
              <FaTruck className="text-2xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Delivered to Your Door
            </h3>
            <p className="text-sm text-gray-700">
              Convenient local delivery and pickup options make eating well
              easy.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Shop Fresh, Eat Local 
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Choose from our range of freshly harvested, local, and organic
            produce — grown with care for your health and the planet.
          </p>
        </div>

        {/* Category Boxes with hover zoom */}
      
       
      </div>

      {/* Product Section */}
      <div className="bg-[#fdf6ee] min-h-screen py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 text-center relative hover:shadow-lg transition-all duration-300 group"
            >
              {/* SALE Tag */}
          

              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-36 h-36 object-contain mx-auto mt-4 transition-transform duration-300 group-hover:scale-110"
              />

              {/* Product Info */}
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 border-b border-gray-200 pb-2">
                {item.subtext}
              </p>

              {/* Price */}
              <div className="flex justify-center items-center gap-2 mt-3">
                {item.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    {item.oldPrice}
                  </span>
                )}
                <span className="text-yellow-600 font-semibold">
                  {item.price}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button className="mt-5 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-5 rounded-full flex items-center justify-center gap-2 mx-auto transition-transform duration-300 group-hover:scale-105">
                Add to Cart <FaShoppingCart />
              </button>
            </div>
          ))}
        </div>
        
      </div>
      
    </div>
  );
}

































