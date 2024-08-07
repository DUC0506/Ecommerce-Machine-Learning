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
import GeminiIcon from "../assets/unnamed.jpg";
import { getCategory } from "../api/category";
import HomeProduct from "./HomeProduct";
import svgimg2 from "../assets/svgs/svg-3.svg";
import svgimg3 from "../assets/svgs/sbg-003-b.svg";
import svgimg5 from "../assets/svgs/svg-002-f.svg";

import svgcos from "../assets/svgs/svg-cos.svg";
import svgimg10 from "../assets/svgs/svg-006-d.svg";
import svgimg9 from "../assets/svgs/svg-004-g.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [showChat, setShowChat] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [categories, setCategories] = useState([]);
  const { authInfo } = useAuth();
  const navigate = useNavigate();
  const handleNavigate = (name, id) => {
    navigate(`/product-page?category=${name}`, { state: { categoryId: id } });
  };
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
  const fetchCategories = async () => {
    const { type, categories } = await getCategory();
    if (type === "Success") {
      console.log(categories);
      setCategories(categories);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="relative">
      <ToastContainer />
      <Landing />
      {/* <Links categorys={"All products "} /> */}
      <div className="flex m-auto max-w-7xl mt-16 flex-wrap align-middle items-center justify-center w-full">
        {categories.map((category) => (
          <div
            onClick={() => handleNavigate(category.name, category._id)}
            key={category._id}
            className="mx-2 my-2 inline-block p-4 w-24 h-32 rounded-md items-center hover:shadow-pink-500 hover:shadow-2xl hover:bg-slate-50 cursor-pointer transition duration-300 ease-in-out  text-center align-middle bg-gray-400 bg-opacity-20"
          >
            <div className="items-center m-auto w-10 h-14 mb-1">
              <img src={category.image} alt="svg" className="" />
            </div>
            <div className="text-gray-700 text-xs text-center font-sans">
              {category.name}
            </div>
          </div>
        ))}
        <div className="mt-8">
          {categories.length > 0
            ? categories.map((category) => (
                <HomeProduct key={category._id} category={category} />
              ))
            : ""}
        </div>

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

          <Chat role="seller" apartment={authInfo.profile?.apartment._id} />
        </div>
        <div
          className={`${showGemini ? "hidden" : "fixed"} z-0`}
          onClick={() => handleShowGemini(true)}
        >
          <button
            class="fixed z-20 bottom-14 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-18 h-18  bg-yellow-400 hover:bg-yellow-500 m-0 cursor-pointer border-gray-200 p-0 normal-case leading-5 hover:text-gray-900"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            data-state="closed"
          >
            <img src={GeminiIcon} alt="123" className="rounded w-16 h-16 z-0" />
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
      </div>
      <Footer />
      {console.log("foot page")}
    </div>
  );
};

export default HomePage;
