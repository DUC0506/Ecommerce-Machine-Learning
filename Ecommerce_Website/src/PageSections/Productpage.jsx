import React from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import Links from "./Links";
import Footer from "../Components/Footer";

export default function Productpage() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Links />
      <Footer />
    </div>
  );
}
