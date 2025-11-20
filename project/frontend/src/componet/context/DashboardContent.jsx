import React from "react";
import Dashboard from "../pages/Dashboard";
import CategoriesPage from "../pages/CategoriesPage";
import ProductsPage from "../pages/ProductsPage";
import UsersPage from "../pages/UsersPage";
import OrdersPage from "../pages/OrdersPage";
import ReportsPage from "../pages/ReportsPage";
 import SettingsPage from "../pages/SettingsPage";

const DashboardContent = ({ activeSection, brandOrange, textGreen, brandGreen, hoverOrange }) => {
  switch (activeSection) {
    case "dashboard":
      return <Dashboard/>;
    case "categories":
      return <CategoriesPage />;
    case "products":
      return <ProductsPage />;
    case "users":
      return <UsersPage />;
    case "orders":
      return <OrdersPage />;
    case "reports":
      return <ReportsPage />;
    case "settings":
      return <SettingsPage />;
    default:
      return <Dashboard />;
  }
};

export default DashboardContent;
