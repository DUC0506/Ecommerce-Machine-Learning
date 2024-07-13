import React from "react";

export default function CardProduct({ product, handleClick }) {
  return (
    <div>
      <div
        class="absolute w-[180px] h-[240px]  -right-65 top-0 z-40 flex-shrink-0 max-w-lg mx-2 mb-6 overflow-hidden bg-yellow-500 rounded-lg shadow-lg"
        onClick={() => handleClick(product._id)}
      >
        <svg
          class="absolute bottom-0 left-0 mb-8"
          viewBox="0 0 375 283"
          fill="none"
        >
          <rect
            x="159.52"
            y="175"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 159.52 175)"
            fill="#f3c06b"
          ></rect>
          <rect
            y="107.48"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 0 107.48)"
            fill="#f3c06b"
          ></rect>
        </svg>
        <div class="relative flex items-center justify-center px-4  pt-8">
          <div class="absolute bottom-0 left-0 block w-48 h-48 ml-3 -mb-24"></div>
          <picture>
            <source srcSet={product.mainImage} type="image/webp" />
            <source srcSet={product.mainImage} />
            <img
              class="relative w-[120px] h-[140px] object-cover rounded"
              src="/images/object/5.png"
              alt="shopping item"
            />
          </picture>
        </div>
        <div class="relative px-2 pb-6 mt-6 text-white">
          {/* <span class="block -mb-1 opacity-75">{product.name}</span> */}
          <div class="flex justify-between">
            <span class="block text-xl font-sans font-semibold">
              {product.name}
            </span>
            <span class="flex font-sans items-center px-3 py-2 text-xs font-bold leading-none text-yellow-500 bg-white rounded-full">
              {product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
