// import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import React from "react";
import { addItemtoCart } from "../api/cart";
import { useNotification } from "../hooks";
import { TbCurrencyDong } from "react-icons/tb";
const Product = ({ name, price, images, option, id, item }) => {
  // const dispatch = useDispatch();
  // const updatestate = (id) => {
  //   dispatch(addToCart(id));
  //   dispatch(updateadded());
  //   toast.success('Added To Cart Successfully')
  // }

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const addItemCart = async (id) => {
    const product = {
      productId: id,
      quantity: 1,
      selectedColor: item.colors[0]._id,
      selectedSize: item.sizes[0]._id,
    };
    const { type, message, cart } = await addItemtoCart(product);
    if (type === "Error") return updateNotification("error", message);
    updateNotification("success", message);
    console.log(cart);
  };
  const getDetailProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div>
      <div className="inline-block mx-2   items-center align-middle bg-yellow-50 p-2 rounded-lg mb-2 border-2 hover:border-yellow-400">
        <div
          className="imagecont"
          onClick={() => getDetailProduct(id)}
          style={{
            backgroundImage: `${images}`,
          }}
        ></div>
        <div className="flex justify-between items-center m-3">
          <div className="mr-2">
            <div className="header1 font-normal font-sans text-normal">
              {name}
            </div>
            <div className="font-bold text-sm font-sans text-yellow-400 flex items-center">
              {price} <TbCurrencyDong className="ml-1 text-lg" />
            </div>
          </div>
          <div>
            <button
              onClick={() => addItemCart(id)}
              className="transition ease-out duration-200  border-gray-50 border-2 focus:ring-2 focus:ring-yellow-300  text-sm m-1 bg-yellow-500 mt-1 p-2 rounded-md text-slate-50"
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="text-xs p-1 px-2 m-2 bg-sky-100 rounded-sm text-sky-500 w-max">
          {option}
        </div>
      </div>
    </div>
  );
};

export default Product;
