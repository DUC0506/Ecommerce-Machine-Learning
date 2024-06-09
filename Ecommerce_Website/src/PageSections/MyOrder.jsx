/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import NavbarAdmin from "../Components/admin/shared/NavbarAdmin";
import { getAllOrdersByUser } from "../api/order";

import { getProduct } from "../api/products";
import { TbCurrencyDong } from "react-icons/tb";
import Footer from "../Components/Footer";

export default function MyOrder() {
  const option1 = [
    { value: "Low to high quantity" },
    { value: "High to low quantity" },
  ];
  const option2 = [
    { value: "Type" },
    { value: "Delivered" },
    { value: "Shipping" },
    { value: "Cancel" },
  ];
  const option3 = [{ value: "Date" }, { value: "Recent" }];
  const [recentOrders, setRecentOrders] = useState([]);

  const fecthRecentOrders = async () => {
    const { type, orders } = await getAllOrdersByUser();

    if (type === "error") return type;
    setRecentOrders(orders);
  };

  //   const handleStatusChange = async (id, newStatus) => {
  //     console.log(newStatus);
  //     const { type, message } = await orderStatus(id, newStatus);
  //     if (type === "error") return message;
  //     console.log(message);
  //     fecthRecentOrders();
  //   };
  useEffect(() => {
    fecthRecentOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-screen">
      <div className="min-h-screen">
        <ToastContainer />
        <Navbar />
        <div className="w-2/3 m-auto bg-slate-50 mt-8 p-2 mb-8 ">
          <NavbarAdmin option1={option1} option2={option2} option3={option3} />
          <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="w-full">
              {/* Dòng tiêu đề */}
              <div className="flex bg-gray-200 mb-2 w-full ">
                {/* <div className="w-1/6 py-2 px-4 font-sans font-medium  items-center justify-center  flex ">ID</div> */}
                <div className="w-full py-2 px-4 font-sans font-medium justify-center items-center flex">
                  Products
                </div>

                {/* <div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">Order Date </div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex"> Order Total</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Shipping Address</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Order Status</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium ">Hành động</div> */}
              </div>
              {recentOrders.map((order, index) => {
                return (
                  <div key={index}>
                    <div
                      key={index}
                      className={`flex rounded w-full bg-white ${
                        index !== 0 ? "mt-2" : ""
                      }`}
                    >
                      {/* <div className="w-1/6 font-sans font-medium flex p-4 items-center justify-center  border-b border-yellow-400">{index+1}</div> */}
                      <div className="w-full font-sans font-medium  flex p-4 items-center">
                        <ul className="w-full">
                          {order.products.map((productOrder, index) => {
                            return (
                              <li key={index} className="w-full">
                                <InfoProduct
                                  id={productOrder.product}
                                  totalProductQuantity={
                                    productOrder.totalProductQuantity
                                  }
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {/* <div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{format(new Date(2), 'dd MMM yyyy')} </div>
								<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{order.totalPrice} </div>
								<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{order.shippingAddress?.address},{order.shippingAddress?.city},{order.shippingAddress?.country} </div>
								<div className="w-1/6 font-sans font-medium  justify-center flex items-center p-4">
									<select
										value={order.status}
										onChange={(e) => handleStatusChange(order._id, e.target.value)}
									>
										<option value="Not Processed">Not Processed</option>
										<option value="Processing">Processing</option>
										<option value="Shipped">Shipped</option>
										<option value="Delivered">Delivered</option>
										<option value="Cancelled">Cancelled</option>
									</select>
								</div> */}
                    </div>
                    <div className="flex flex-col justify-end border-b-2 pb-2 border-b-red-400 w-full">
                      <div
                        key={index}
                        className="text-yellow-400 font-sans cursor-pointer font-bold text-xl  mt-2 mb-2 flex items-center justify-end"
                      >
                        {order.totalPrice}{" "}
                        <TbCurrencyDong className="text-lg ml-1 font-sans" />
                      </div>
                      <div className="bg-yellow-400 cursor-pointer w-fit py-1 px-4 text-lg font-sans font-medium text-white rounded  flex justify-end mr-1">
                        {order.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function InfoProduct({ id, totalProductQuantity }) {
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    const { type, product } = await getProduct(id);
    if (type === "Success") {
      setProduct(product);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className=" items-center flex  justify-between w-full border-b border-yellow-400 pb-2">
      <div>
        <div className="flex font-sans">
          <img
            src={product?.mainImage}
            alt={product?.name}
            className="w-10 h-10 mr-2 font-sans font-medium"
          />
          {product?.name}
        </div>
        <div className=" text-yellow-400 font-sans font-medium flex mt-2">
          <div className="mr-1">x</div>
          {totalProductQuantity}
        </div>
      </div>
      <div>
        <div className="text-yellow-400 font-sans font-medium  mt-2 flex items-center">
          {product?.priceAfterDiscount}{" "}
          <TbCurrencyDong className="text-lg ml-1 font-sans" />
        </div>
      </div>
    </div>
  );
}
