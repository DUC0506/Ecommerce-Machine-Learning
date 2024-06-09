import React from "react";
import chartGif from "../../../assets/chart.gif";
import { IoArrowRedo } from "react-icons/io5";
export default function HeaderLoading() {
  return (
    <div className="px-4">
      <h1 class="mb-4 flex sm:px-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        We use AI to predict products{" "}
        <IoArrowRedo className="ml-1  text-yellow-400" />
      </h1>
      <div className="flex items-center">
        <div className="w-full">
          <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-4  dark:text-gray-400">
            At here, we leverage advanced AI technology to anticipate market
            trends and predict the next big products, driving innovation and
            growth.
          </p>
        </div>
        {/* <span class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
          Discover how
          <svg
            class="w-3.5 h-3.5 ml-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </span> */}
      </div>
      <div className=" flex items-center justify-center">
        <img src={chartGif} alt="chart-gif" />
      </div>
    </div>
  );
}
