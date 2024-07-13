/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";

import { cancelOrder, getAllOrdersByUser } from "../api/order";

import { getProduct } from "../api/products";
import { TbCurrencyDong } from "react-icons/tb";
import Footer from "../Components/Footer";
import { useNotification } from "../hooks";
import { convertISOToDateFormat } from "../utils/hepler";

export default function MyOrder() {
  const { updateNotification } = useNotification();
  const [recentOrders, setRecentOrders] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderCancel, setOrderCancel] = useState();
  const fecthRecentOrders = async () => {
    const { type, orders } = await getAllOrdersByUser();
    console.log(orders);
    if (type === "error") return type;
    setRecentOrders(orders);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleRemoveOrder = (id) => {
    setOrderCancel(id);
    setIsOpenModal(true);
  };
  const handleDeleteOrder = async () => {
    const { type, message } = await cancelOrder(orderCancel);

    if (type === "Success") {
      updateNotification("success", message);
      fecthRecentOrders();
    } else {
      updateNotification("error", message);
    }

    setIsOpenModal(false);
  };
  useEffect(() => {
    fecthRecentOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-screen">
      <div className="min-h-screen ">
        <ToastContainer />
        <Navbar />
        <div className="w-2/3 m-auto mt-8 p-2 mb-8 ">
          <div className="bg-slate-50  px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="w-full">
              <div className="flex bg-yellow-300 mb-2 w-full ">
                <div className="w-full py-2 px-4 font-sans font-bold justify-center items-center flex">
                  My orders
                </div>
              </div>
              {recentOrders.map((order, index) => {
                return (
                  <div key={index} className="bg-white shadow-sm rounded">
                    <div
                      key={index}
                      className={`flex rounded w-full  ${
                        index !== 0 ? "mt-2" : ""
                      }`}
                    >
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
                    </div>
                    <div className="flex flex-col justify-end  pb-2 w-full">
                      <div className="w-full text-lg font-sans font-medium text-white px-2   flex justify-between mr-1">
                        <div className="font-sans font-semibold text-sm text-gray-500 items-center">
                          Order date {convertISOToDateFormat(order.createdAt)}
                        </div>
                        <div
                          key={index}
                          className="text-yellow-400 font-sans cursor-pointer font-bold text-xl  mt-2 mb-2 flex items-center justify-end"
                        >
                          {order.totalPrice}{" "}
                          <TbCurrencyDong className="text-lg ml-1 font-sans" />
                        </div>
                      </div>
                      <div className="w-full text-lg font-sans font-medium text-white px-2   flex justify-between mr-1">
                        <p className="bg-yellow-400 py-1 px-4 rounded">
                          {order.status}
                        </p>
                        {order.status === "Not Processed" ||
                        order.status === "Processing" ? (
                          <button
                            onClick={() => handleRemoveOrder(order._id)}
                            class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            type="button"
                          >
                            Cancel order
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <DeleteModal
          text="Are you sure you want to cancel this order ?"
          onClose={handleCloseModal}
          isOpen={isOpenModal}
          onSubmit={handleDeleteOrder}
        />
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
        <div className="flex font-sans items-center">
          <img
            src={product?.mainImage}
            alt={product?.name}
            className="w-14 h-14 mr-2 font-sans font-medium rounded mt-1"
          />
          <p className="font-sans font-semibold text-base">{product?.name}</p>
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
export function DeleteModal({ text, onClose, isOpen, onSubmit }) {
  return (
    <div
      class={`${
        isOpen ? "flex" : "hidden"
      }  fixed overflow-y-auto overflow-x-hidden bg-gray-800 opacity-95 top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full`}
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            onClick={onClose}
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            data-modal-hide="popup-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only" onClick={onClose}>
              Close modal
            </span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {text ? text : "Are you sure you want to delete this?"}
            </h3>
            <button
              type="button"
              onClick={onSubmit}
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={onClose}
              type="button"
              class="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-yellow-500 focus:z-10 focus:ring-4 focus:ring-gray-100    "
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
