import React from "react";
import noItems from "../../../assets/no-item-in-cart.gif";
export default function NoItem({ title, body }) {
  return (
    <section class="bg-white rounded h-full w-full">
      <div class="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
        <img src={noItems} alt="" />
        <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {" "}
            {title}
          </span>
        </h1>
        <p class="font-light text-gray-500 md:text-lg xl:text-xl font-sans ">
          {body}
        </p>
      </div>
    </section>
  );
}
