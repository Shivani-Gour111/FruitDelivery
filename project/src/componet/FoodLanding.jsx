import { useState } from "react";
import { ShoppingCart, Star, Search } from "lucide-react";

export default function FoodLanding() {
  const [quantity, setQuantity] = useState(2);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-lg p-8 relative overflow-hidden">

        {/* Black Circle Background covering Navbar + Right section */}
        <div className="absolute right-0 top-0 bottom-0 w-[500px] bg-gray-900 rounded-l-full"></div>

        {/* Navbar */}
        {/* <div className="flex justify-between items-center mb-10 relative z-10">
          <h1 className="text-2xl font-bold text-red-500">foco</h1>
          <nav className="flex gap-8 text-gray-700 font-medium">
            <a href="#">Home</a>
            <a href="#">Menu</a>
            <a href="#">Service</a>
            <a href="#">Shop</a>
          </nav>
          <div className="flex gap-4 items-center">
            <Search className="text-gray-500" />
            <button className="px-5 py-2 rounded-full border">sign in</button>
            <button className="px-5 py-2 rounded-full bg-yellow-400">login</button>
          </div>
        </div> */}
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
            <div className="mt-12 flex gap-8">
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
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex items-center justify-center relative z-10">
            {/* Salad Image */}
            <img
              src="https://i.ibb.co/h1GpFpt/salad-bowl.jpg" 
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
