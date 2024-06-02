import React, { useEffect, useState } from "react";
import Landing from "./Landing";
import Links from "./Links";
import "../Styles/PageStyles/Homepage.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Components/Footer";
import { BiMessageRoundedDots } from "react-icons/bi";
import { CiSquareChevDown } from "react-icons/ci";
import Chat from "../Components/pages/Chat";
import { useAuth } from "../hooks";
import ChatGemini from "../Components/pages/ChatGemini";

const HomePage = () => {
  const [showChat, setShowChat] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const { authInfo } = useAuth();
  console.log(authInfo);
  const handleShowChat = (bool) => {
    if (bool) {
      setShowGemini(false);
    }
    setShowChat(bool);
  };
  const handleShowGemini = (bool) => {
    if (bool) {
      setShowChat(false);
    }
    setShowGemini(bool);
  };
  return (
    <div className="relative">
      {console.log("Ahome page")}
      <ToastContainer />
      <Landing />
      <Links categorys={"Tất cả sản phẩm "} />

      {/* Chat gemini */}
      <div className={`${showGemini ? "fixed" : "hidden"} z-50 `}>
        <ChatGemini showGemini={handleShowGemini} />
      </div>

      {/* Chat Seller , Admin */}
      <div
        className={`w-1/2   bottom-1 z-50 right-0 h-2/3  overflow-auto ${
          showChat ? "fixed" : "hidden"
        }`}
      >
        <div
          className="flex justify-end text-lg w-full cursor-pointer"
          onClick={() => handleShowChat(false)}
        >
          <CiSquareChevDown />
        </div>

        <Chat role="seller" apartment={authInfo.profile?.apartment} />
      </div>
      <div
        className={`${showGemini ? "hidden" : "fixed"} z-50`}
        onClick={() => handleShowGemini(true)}
      >
        <button
          class="fixed z-50 bottom-12 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-yellow-400 hover:bg-yellow-500 m-0 cursor-pointer border-gray-200 p-0 normal-case leading-5 hover:text-gray-900"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          data-state="closed"
        >
          {" "}
          Hôm nay ăn gì ?
          {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            class="border-gray-200"
          ></path>
        </svg> */}
        </button>
      </div>
      <div
        className={`${
          showChat ? "hidden" : "fixed"
        }  items-center justify-center mr-2  flex z-50 bg-yellow-400 right-0 bottom-0 py-2 px-6 rounded cursor-pointer`}
        onClick={() => handleShowChat(true)}
      >
        <BiMessageRoundedDots className="text-2xl text-white " />
        <div className="text-xl text-white font-sans">Chat</div>
      </div>

      <Footer />
      {console.log("foot page")}
    </div>
  );
};

export default HomePage;
