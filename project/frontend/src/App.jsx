import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./componet/Navbar";
import Footer from "./componet/Footer";
import Home from "./componet/Home";
import Menu from "./componet/Menu";
import Services from "./componet/Services";
import Contact from "./componet/Contact";
import Vegetable from "./componet/Vegetable";
import Fruits from "./componet/Fruits";
import Login from "./componet/Login";
import SignUp from "./componet/SignUp";
import Wishlist from "./componet/Wishlist";
import { LikeProvider } from "./componet/context/LikeContext";
import CartPage from "./componet/CartPage";
import { CartProvider } from "./componet/context/CartContext";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./componet/context/AuthContext";
import UserProfile from "./componet/UserProfile";
import AddProduct from "./componet/pages/AddProduct";
import AdminLayout from "./componet/AdminLayout";
import ScrollToTop from "./componet/ScrollToTop";
import {PageWrapper} from "./componet/ScrollToTop";
import EditProduct from "./componet/pages/EditProduct";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-[30px] md:pt-[8px] bg-gray-50">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function NoFooterLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-[30px] md:pt-[8px] bg-gray-50">
        <Outlet />
      </div>
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
          <Route path="/vegetables" element={<PageWrapper><Vegetable /></PageWrapper>} />
          <Route path="/fruits" element={<PageWrapper><Fruits /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        </Route>

        <Route element={<NoFooterLayout />}>
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><SignUp /></PageWrapper>} />
          <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
          <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><UserProfile /></PageWrapper>} />
        </Route>

        <Route path="/admin/add-product" element={<PageWrapper><AddProduct /></PageWrapper>} />
        <Route path="/admin/edit-product/:id" element={<PageWrapper><EditProduct /></PageWrapper>} />

        <Route path="/AdminLayout" element={<PageWrapper><AdminLayout />
        </PageWrapper>} />
        
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    // <AuthProvider>
    //   <CartProvider>
    //     <Router>
    //       <LikeProvider>
    //         <ScrollToTop />
    //         <AnimatedRoutes />
    //       </LikeProvider>
    //       <Toaster position="top-center" reverseOrder={false} />
    //     </Router>
    //   </CartProvider>
    // </AuthProvider>
  
  
    <AuthProvider>
      <Router>
      <LikeProvider>
        <CartProvider>
         
            <ScrollToTop />
            <AnimatedRoutes />
            <Toaster position="top-center" reverseOrder={false} />
          
        </CartProvider>
      </LikeProvider>
      </Router>
    </AuthProvider>


  );
}

export default App;
