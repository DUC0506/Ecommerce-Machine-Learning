import React from "react";
import Navbar from "../Components/Navbar";
import "../Styles/PageStyles/Landing.css";
import vegetable from "../assets/vegetable1.png";
import vegetable1 from "../assets/vegetable.png";
const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="landing bg-slate-400 w-full">
        <div className=" gap-x-11  m-auto max-w-7xl md:flex p-3 pt-4 inline-block w-full">
          <div className="inline-block background sm:flex rounded-md w-full md:w-8/12 h-96 bg-slate-200 p-0 overflow-hidden">
            <div className="md:w-80 text-2xl text-gray-600 sm:ml-14 mt-10 text-center md:text-left sm:px-0 sm:py-0 w-full px-10 py-5">
              <div className="p-1 bg-gray-400 text-xs rounded-xl w-32 text-center mb-1 sm:ml-0">
                Fresh Arrivals
              </div>
              <div className="font-semibold mb-8">
                Local Delights Just for Your Community{" "}
                <span className="text-yellow-500">Condo Market</span>
              </div>
              <div className="text-sm mb-10 leading-7 font-sans">
                Discover and enjoy specialty foods from your neighbors. Buy,
                sell, and savor local flavors right within your apartment
                community.
              </div>
              <button className="text-sm p-2 bg-white rounded-sm border-transparent border-2 text-semibold w-32 focus:ring-2 focus:sring-sky-400">
                Explore Now
              </button>
            </div>
            <div className=" w-8/12  bg-center bottom-0">
              <img src={vegetable} alt="" className="bg-transparent" />
              <img src={vegetable1} alt="" className="bg-transparent" />
            </div>
          </div>
          <div className="relative w-full mt-10 md:mt-0 rounded-md md:w-1/3 h-96 bg-yellow-300 p-1 overflow-hidden ">
            <div className="absolute top-4 rotate-180 right-10">
              <lord-icon
                src="https://cdn.lordicon.com/xxdqfhbi.json"
                trigger="loop"
                delay="500"
                colors="primary:#4bb3fd,secondary:#ffc738,tertiary:#f28ba8,quaternary:#f24c00,quinary:#121331"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
            </div>
            <div className="font-semibold text-2xl text-gray-800 mt-10 ml-10 tracking-wide inline-block">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              20% OFF for Local Flavors!
            </div>
            <div className="text-sm mt-4 font-sans w-72 ml-10 text-gray-600 leading-2">
              Join our online community to discover, buy, and enjoy the best
              local foods from your neighbors !.
            </div>
            <div className="images"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
