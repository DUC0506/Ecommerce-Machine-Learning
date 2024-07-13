import React from "react";
import noProduct from "../../../assets/noproductfound.jpg";

export default function NotFound({ message }) {
  return (
    <div className="">
      <div className="flex justify-center rounded-sm">
        <img src={noProduct} alt="empty-cart" className="h-60" />
      </div>
      <div className="font-sans font-medium text-yellow-400 mt-8 flex justify-center">
        {message}
      </div>
    </div>
  );
}
