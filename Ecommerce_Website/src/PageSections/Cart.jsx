import React from "react";
import Landing from "./Landing";
import Links from "./Links";
import Footer from "../Components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Components/Navbar";
import Addtocart from "./Addtocart";

import ShoppingCart from "../Components/ShoppingCart";

const Cart = ()=>{
    return (
        <div>
          <ToastContainer/>
            <Navbar/>
            <ShoppingCart/>
            <Footer/>
        </div>
    )
}


export default Cart