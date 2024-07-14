import { useNavigate } from "react-router-dom";
import React from "react";
import { addItemtoCart } from "../api/cart";
import { useNotification } from "../hooks";
import { TbCurrencyDong } from "react-icons/tb";
import { formatCurrency } from "../utils/hepler";
import { FaStar } from "react-icons/fa";
import { FaDongSign } from "react-icons/fa6";
const Product = ({
  name,
  price,
  images,
  option,
  id,
  item,
  discount,
  priceAfterDiscount,
  sold,
}) => {
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
      <div
        title={name}
        className="inline-block mx-2  items-center align-middle bg-yellow-50 p-2 rounded-lg mb-2 border-2 hover:border-yellow-400"
      >
        {/* <div
          className="imagecont"
          onClick={() => getDetailProduct(id)}
          style={{
            backgroundImage: `${images}`,
          }}
        ></div> */}
        <div onClick={() => getDetailProduct(id)}>
          <img
            src={images}
            alt="product"
            className="w-52 aspect-square rounded-sm overflow-hidden transition duration-300 ease-in-out hover:bg-opacity-50 cursor-pointer"
          />
        </div>
        <div className="flex justify-between items-center m-3">
          <div className="mr-2">
            <div className="w-full overflow-hidden font-semibold whitespace-nowrap text-ellipsis font-sans">
              {name}
            </div>{" "}
            <div className="flex">
              <div className="font-bold text-sm font-sans text-yellow-400 flex items-center">
                {formatCurrency(priceAfterDiscount)}{" "}
                <TbCurrencyDong className="ml-1 text-lg" />
              </div>
            </div>
          </div>
          {/* <div>
            <button
              onClick={() => addItemCart(id)}
              className="transition ease-out duration-200  border-gray-50 border-2 focus:ring-2 focus:ring-yellow-300  text-sm m-1 bg-yellow-500 mt-1 p-2 rounded-md text-slate-50"
            >
              Add to Cart
            </button>
          </div> */}
          <div>
            {discount > 0 ? (
              <div>
                <p class=" flex items-center line-through font-manrope font-semibold text-sm  text-gray-400 ">
                  <FaDongSign className="text-gray-400" />
                  {formatCurrency(price)}{" "}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-xs gap-1 flex items-center p-1 px-2 m-2 bg-sky-100 rounded-sm text-sky-500 w-max">
            {option} <FaStar className="text-yellow-400 " />
          </div>

          <div className="text-xs gap-1 flex items-center p-1 px-2 m-2 bg-sky-100 rounded-sm text-sky-500 w-max">
            {sold > 0 ? `Sold ${sold}` : "New product"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
