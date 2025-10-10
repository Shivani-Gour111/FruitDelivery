import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShoppingCart, Headphones, Tag, Smile, Star, Search } from "lucide-react";
import Menu from "./Menu";
import TopProducts from "./TopProducts";

// ✅ FoodLanding Section Inline Add kiya
function FoodLanding() {
  const [quantity, setQuantity] = useState(2);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-lg p-8 relative overflow-hidden">
        {/* Black Circle Background covering Navbar + Right section */}
        <div className="absolute right-0 top-0 bottom-0 w-[500px] bg-gray-900 rounded-l-full"></div>

        <div className="flex">
          {/* Left Section */}
          <div className="flex-1 pr-10 relative z-10">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Order your <br /> <span className="text-black">favourite Foods</span>
            </h1>
            <p className="mt-4 text-gray-500 max-w-md">
              Fresh and tasty seafood curry sit amet, consectetur adipiscing elit.
              Curabitur accumsan auctor pulvinar.
            </p>

            {/* Price */}
            <p className="mt-6 text-gray-500">
              Total order:{" "}
              <span className="text-2xl font-bold text-black">$24.30</span>
            </p>

            {/* Quantity + Buy */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center border rounded-lg px-4 py-2 gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-lg font-bold"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-lg font-bold"
                >
                  +
                </button>
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2">
                Buy Now <ShoppingCart size={18} />
              </button>
            </div>

            {/* Food Options */}
            {/* <div className="mt-12 flex gap-8">
              <div className="flex flex-col items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                  alt="burger"
                  className="w-16 h-16"
                />
                <p>Burger</p>
                <span className="text-green-600 font-bold">$3.25</span>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                  alt="cake"
                  className="w-16 h-16"
                />
                <p>Cake</p>
                <span className="text-green-600 font-bold">$2.25</span>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/590/590836.png"
                  alt="salad"
                  className="w-16 h-16"
                />
                <p>Salad</p>
                <span className="text-green-600 font-bold">$5.25</span>
              </div>
            </div> */}
          </div>

          {/* Right Section */}
          <div className="flex-1 flex items-center justify-center relative z-10">
            <img
              src="bowl.jpg"
              alt="food"
              className="w-[420px] h-[420px] object-cover rounded-full shadow-xl"
            />

            {/* Badge */}
            <div className="absolute bottom-14 right-16 bg-orange-500 text-white px-6 py-3 rounded-2xl flex flex-col items-center shadow-md">
              <p className="text-lg font-semibold">Salad</p>
              <div className="flex items-center gap-1">
                <Star size={16} fill="yellow" className="text-yellow-400" />
                <span>4.7</span>
              </div>
              <span className="text-sm">10–18 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slider Images
const sliderImages = ["/heroImage1.jpg", "/heroImage2.jpg", "/heroImage3.jpg"];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  if (showMenu) return <Menu />;

  const features = [
    {
      icon: <ShoppingCart className="w-10 h-10" />,
      title: "Free Fast Delivery",
      desc: "Online Only Exclusions Apply",
    },
    {
      icon: <Headphones className="w-10 h-10" />,
      title: "24/7 Call Support",
      desc: "Contact Us 24 Hours A Day",
    },
    {
      icon: <Tag className="w-10 h-10" />,
      title: "Our Special Offer",
      desc: "Offer Is Any Kind Of Discount",
    },
    {
      icon: <Smile className="w-10 h-10" />,
      title: "For Quality Product",
      desc: "Sell Highest Quality Item",
    },
  ];

  return (
    <>
      <Navbar />

      {/* ✅ Food Landing Section Top me Add */}
      <FoodLanding />

      {/* ✅ Aapka Slider aur baki sab niche same ka same */}
      <div className="w-full relative overflow-hidden mt-20 pt-5">
        <img
          src={sliderImages[currentIndex]}
          alt="Fresh Vegetables"
          onClick={() => setShowMenu(true)}
          className="w-full h-[200px] sm:h-[200px] md:h-[500px] lg:h-[500px] object-cover transition-all duration-700 cursor-pointer"
        />

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-green-600 text-gray-700 hover:text-white p-2 sm:p-3 rounded-full shadow-lg transform transition duration-300 hover:scale-110 z-20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-green-600 text-gray-700 hover:text-white p-2 sm:p-3 rounded-full shadow-lg transform transition duration-300 hover:scale-110 z-20"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* ✅ baki aapka existing content jaise h waisa hi niche */}
      <TopProducts />

      <div className="w-full flex flex-wrap justify-center gap-10 py-20">
        {features.map((item, index) => (
          <div key={index} className="flex items-center gap-20">
            <div className="text-black">{item.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="bg-green-900 text-white mt-10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">FreshMart</h2>
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                Your one-stop shop for fresh fruits and vegetables. Quality products delivered to your doorstep.
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-300 text-lg sm:text-xl">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/menu" className="hover:text-white transition">Menu</a></li>
                <li><a href="/services" className="hover:text-white transition">Services</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Customer Support</h3>
              <ul className="space-y-3 text-gray-300 text-lg sm:text-xl">
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-gray-300 text-lg sm:text-xl flex items-center gap-2">📍 123, Fresh Street, New Delhi</p>
              <p className="text-gray-300 text-lg sm:text-xl flex items-center gap-2">📞 +91 98765 43210</p>
              <p className="text-gray-300 text-lg sm:text-xl flex items-center gap-2">📧 support@freshmart.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6 text-center text-gray-400 text-sm sm:text-base md:text-lg">
          © {new Date().getFullYear()} <span className="font-semibold text-white">FreshMart</span>. All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
