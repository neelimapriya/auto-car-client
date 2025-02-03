import React from "react";
import { Outlet } from "react-router";
import Navbar from "../module/navbar";
import Footer from "../module/footer";

const MainLayout: React.FC = () => {
  return (
    <main className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </main>
  );
};

export default MainLayout;
