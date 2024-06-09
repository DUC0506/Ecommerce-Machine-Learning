import React from "react";
import Links from "./Links";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";

const Category = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Links categorys={"Meal"} />
      <Footer />
    </div>
  );
};

export default Category;
