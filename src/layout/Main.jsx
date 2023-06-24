import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";

const Main = () => {
  return (
    <div className="lg:mx-28">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
