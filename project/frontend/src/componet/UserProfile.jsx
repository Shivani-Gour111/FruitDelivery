import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cropper from "react-easy-crop";
import { useAuth } from "./context/AuthContext";
import getCroppedImg from "../utils/cropImage";

import {
  HiOutlineStar,
  HiOutlineArchiveBox,
  HiOutlineMapPin,
  HiOutlineCog,
  HiOutlineArrowRightOnRectangle,
  HiOutlineShoppingCart,
  HiOutlineCalendar,
  HiOutlinePencilSquare,
  HiOutlineUserCircle, // Added for fallback avatar
} from "react-icons/hi2";

/* ------------------------------------ */
/* Sidebar Item Component (Cleaned up styling) */
/* ------------------------------------ */
const NavItem = ({ Icon, label, onClick, isActive = false, isLogout = false }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${isLogout 
        ? "text-red-600 hover:bg-red-50 font-semibold" 
        : isActive
        ? "bg-green-100 text-green-700 font-bold" // Active state is cleaner
        : "text-gray-700 hover:bg-gray-100"}
    `}
  >
    <Icon className="w-6 h-6" />
    {label}
  </button>
);

/* ------------------------------------ */
/* Stats Box (Minimalist, Green Accent) */
/* ------------------------------------ */
const StatBox = ({ value, label, Icon }) => (
  <div className="p-6 bg-green-50 rounded-2xl text-center transition-all hover:shadow-lg hover:scale-[1.02] cursor-default">
    <Icon className="w-8 h-8 mx-auto mb-2 text-green-700" />
    <p className="text-3xl font-extrabold text-gray-800">{value}</p>
    <p className="text-green-700 text-sm font-medium">{label}</p>
  </div>
);

/* ------------------------------------ */
/* Main Component */
/* ------------------------------------ */
function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("summary");
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({});
  const [address, setAddress] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  // Cropper States
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.2);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  /* ------------------------------------ */
  /* Load user profile */
  /* ------------------------------------ */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // --- MOCK DATA for stats (Replace with real API calls) ---
    const mockStats = {
      totalOrders: 0,
      loyaltyPoints: 0,
      lastOrderDate: "N/A",
    };
    // -----------------------------------------------------------


    axios
      .get(`http://localhost:5000/api/user/${user._id}`)
      .then((res) => {
        setUserData({ ...res.data, ...mockStats }); // Merge user data with mock stats
        setProfileImage(
          res.data.avatarUrl
            ? `http://localhost:5000${res.data.avatarUrl}`
            : null
        );
        setAddress(res.data.address || "");
      })
      .catch(console.error);
  }, [user, navigate]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  /* ------------------------------------ */
  /* Select image */
  /* ------------------------------------ */
  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setShowCropper(true);
    }
  };

  /* ------------------------------------ */
  /* Upload cropped image */
  /* ------------------------------------ */
  const uploadCroppedImage = async () => {
    try {
      const croppedBlob = await getCroppedImg(
        selectedFile,
        croppedAreaPixels
      );

      const formData = new FormData();
      formData.append("avatar", croppedBlob, "avatar.png");

      const res = await axios.post(
        `http://localhost:5000/api/upload-avatar/${user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProfileImage(
        `http://localhost:5000${res.data.user.avatarUrl}`
      );
      setShowCropper(false);
      alert("Profile photo updated successfully! ✔");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  /* ------------------------------------ */
  /* Remove photo */
  /* ------------------------------------ */
  const handleRemoveImage = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/remove-avatar/${user._id}`
      );
      setProfileImage(null);
      alert("Profile photo removed.");
    } catch (error) {
      console.error(error);
      alert("Failed to remove photo ❌");
    }
  };

  /* ------------------------------------ */
  /* Save Address */
  /* ------------------------------------ */
  const handleAddressSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/address/${user._id}`,
        { address }
      );
      setUserData(res.data.user);
      alert("Delivery Address updated successfully! ✔");
    } catch (error) {
      console.error(error);
      alert("Failed to save address ❌");
    }
  };

  /* ------------------------------------ */
  /* Update Name + Email */
  /* ------------------------------------ */
  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/update-user/${user._id}`,
        {
          name: userData.name,
          email: userData.email,
        }
      );
      setUserData(res.data.user);
      alert("Personal information saved! ✔");
    } catch (error) {
      console.error(error);
      alert("Failed to save changes ❌");
    }
  };

  /* ------------------------------------ */
  /* Main Profile Content Switch */
  /* ------------------------------------ */
  const ProfileContent = () => {
    switch (activeSection) {
      case "summary":
        return (
          <>
            <h3 className="text-3xl font-extrabold mb-8 text-gray-900">Account Dashboard</h3>

            {/* Stats Boxes (More Minimalist) */}
            <div className="grid grid-cols-3 gap-6">
              <StatBox
                value={userData.totalOrders || '0'}
                label="Total Orders"
                Icon={HiOutlineShoppingCart}
              />
              <StatBox
                value={userData.loyaltyPoints || '0'}
                label="Loyalty Points"
                Icon={HiOutlineStar}
              />
              <StatBox
                value={userData.lastOrderDate || 'N/A'}
                label="Last Order"
                Icon={HiOutlineCalendar}
              />
            </div>

            {/* Profile Details Form (Improved UX with Labels) */}
            <h4 className="text-2xl font-semibold mt-12 mb-5 text-gray-800 border-b pb-2">
              Personal Information
            </h4>
            <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  className="block p-3 border border-gray-300 rounded-xl w-full focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter your full name"
                  value={userData.name || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  className="block p-3 border border-gray-300 rounded-xl w-full focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter your email address"
                  value={userData.email || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  type="email"
                />
              </div>
              
              <button
                onClick={handleProfileUpdate}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full mt-4 transition-colors shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </>
        );

      case "address":
        return (
          <>
            <h3 className="text-3xl font-extrabold mb-8 text-gray-900">Delivery Address</h3>
            <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Primary Delivery Address</label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-xl resize-none h-40 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter your full delivery address here..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                onClick={handleAddressSave}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-colors shadow-lg"
              >
                Save Address
              </button>
            </div>
          </>
        );

      case "orders":
        return (
          <>
            <h3 className="text-3xl font-extrabold mb-8 text-gray-900">Order History</h3>
            <div className="bg-white p-6 rounded-2xl shadow-md text-center border border-gray-200">
                <p className="text-gray-500">Your recent orders will appear here.</p>
                {/* You can add a table or list of orders here */}
            </div>
          </>
        );

      case "settings":
        return (
            <>
                <h3 className="text-3xl font-extrabold mb-8 text-gray-900">Settings</h3>
                <div className="bg-white p-6 rounded-2xl shadow-md text-center border border-gray-200">
                    <p className="text-gray-500">Settings section content...</p>
                    {/* Placeholder for future settings like change password, notifications etc. */}
                </div>
            </>
        );

      default:
        return <></>;
    }
  };

  /* ------------------------------------ */
  /* RETURN UI (Professional Layout) */
  /* ------------------------------------ */
  return (
    <div className="min-h-screen p-8 bg-gray-100">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto flex bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200"
      >

        {/* Sidebar */}
        <div className="w-1/4 p-6 border-r bg-white min-w-[280px]">
          <div className="flex flex-col items-center pb-6 mb-6 border-b border-gray-200">

            {/* Profile Photo Area (Circular and Clean) */}
            <div className="relative w-28 h-28 group">
              <div className="rounded-full overflow-hidden shadow-xl border-4 border-green-500">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <HiOutlineUserCircle className="w-full h-full object-cover text-gray-400" />
                )}
              </div>

              {/* Edit icon (Hover effect) */}
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
              >
                <HiOutlinePencilSquare className="text-white w-6 h-6" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleSelectFile}
                />
              </label>
            </div>

            <h2 className="text-xl font-bold mt-4 text-gray-800">{userData.name || "Guest User"}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
            
            {profileImage && (
              <button
                onClick={handleRemoveImage}
                className="text-red-500 text-xs mt-1 hover:text-red-700 transition-colors"
              >
                Remove Photo
              </button>
            )}
          </div>

          {/* Sidebar Menu */}
          <nav className="space-y-1">
            <NavItem
              Icon={HiOutlineStar}
              label="Account Summary"
              isActive={activeSection === "summary"}
              onClick={() => setActiveSection("summary")}
            />

            <NavItem
              Icon={HiOutlineArchiveBox}
              label="Order History"
              isActive={activeSection === "orders"}
              onClick={() => setActiveSection("orders")}
            />

            <NavItem
              Icon={HiOutlineMapPin}
              label="Delivery Address"
              isActive={activeSection === "address"}
              onClick={() => setActiveSection("address")}
            />

            <NavItem
              Icon={HiOutlineCog}
              label="Settings"
              isActive={activeSection === "settings"}
              onClick={() => setActiveSection("settings")}
            />

            <div className="pt-4 border-t border-gray-100 mt-4">
              <NavItem
                Icon={HiOutlineArrowRightOnRectangle}
                label="Logout"
                isLogout={true}
                onClick={logout}
              />
            </div>
          </nav>
        </div>
        

        {/* Right Side Content */}
        <div className="w-3/4 p-10 bg-gray-50"> {/* Light gray background for contrast */}
          <ProfileContent />
        </div>
      </motion.div>

      {/* Cropper Modal (Unchanged) */}
      {showCropper && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">

            <h3 className="font-bold text-xl mb-4 text-gray-800">Crop and Upload Photo</h3>

            <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-gray-200">
              <Cropper
                image={selectedFile}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                objectFit="cover"
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-sm text-gray-500">Zoom:</span>
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-green-600"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCropper(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={uploadCroppedImage}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors shadow-md"
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;