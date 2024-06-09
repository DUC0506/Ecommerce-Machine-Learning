import React, { useState } from "react";
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
import GeminiIcon from "../assets/unnamed.jpg";

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
      <Links categorys={"All products "} />

      {/* Chat gemini */}
      <div className={`${showGemini ? "fixed" : "hidden"} z-30 `}>
        <ChatGemini showGemini={handleShowGemini} />
      </div>

      {/* Chat Seller , Admin */}
      <div
        className={`w-1/2   bottom-1 z-40 right-0 h-2/3  overflow-auto ${
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
          class="fixed z-20 bottom-14 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-18 h-18  bg-yellow-400 hover:bg-yellow-500 m-0 cursor-pointer border-gray-200 p-0 normal-case leading-5 hover:text-gray-900"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          data-state="closed"
        >
          <img src={GeminiIcon} alt="123" className="rounded w-16 h-16 z-10" />
          {/* Today what do eat ? */}
        </button>
      </div>
      <div
        className={`${
          showChat ? "hidden" : "fixed"
        }  items-center justify-center mr-2  flex z-30 bg-yellow-400 right-0 bottom-0 py-2 px-6 rounded cursor-pointer`}
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
