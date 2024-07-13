import React, { useEffect, useState } from "react";
import {
  getCart,
  increaseOneProduct,
  reduceOneProduct,
  removeItem,
} from "../api/cart";
import { Link } from "react-router-dom";
import NotFound from "./admin/shared/NotFound";
import { TbCurrencyDong } from "react-icons/tb";
import { formatCurrency } from "../utils/hepler";
const CartItem = ({
  id,
  name,
  price,
  quantity,
  discount,
  image,
  onIncrease,
  onDecrease,

  color,
  size,
  removeItemCart,
}) => {
  // const discountedPrice = price - (price * discount) / 100;

  return (
    // <div className="flex items-center justify-between p-4 border-b bg-white rounded mt-2">
    //   <div className="flex items-center w-2/3">
    //     <img src={image} alt={name} className="w-12 h-12 object-cover rounded" />
    //     <div className="ml-4">
    //       <p className="font-bold font-sans">{name}</p>
    //       {/* <p className=" font-sans font-semibold flex items-center">{discountedPrice} <TbCurrencyDong className='text-xl text-yellow-500' /></p> */}
    //       {discount > 0 && <p className="text-red-500 font-sans">Discount: {discount}% off</p>}
    //       <p className="text-gray-700 font-sans text-sm flex items-center">{size.size} </p>
    //     </div>
    //   </div>
    //   <div className="flex items-center space-x-4 w-1/3">
    //     <button onClick={() => onDecrease(id,color,size._id)} className="text-yellow-500 w-1/4">
    //       -
    //     </button>
    //     <p className="font-bold w-1/4 font-sans">{quantity}</p>
    //     <button onClick={() => onIncrease(id,color,size._id)} className="text-yellow-500">
    //       +
    //     </button>
    //     <p className="font-bold w-1/2 flex items-center font-sans text-yellow-400">{(discountedPrice * quantity)} <TbCurrencyDong className='text-xl text-yellow-500' /></p>
    //   </div>
    // </div>
    <div>
      <div class="rounded-lg border mb-4 mr-2 border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
        <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <Link to={`/product/${id}`} class="shrink-0 md:order-1">
            <img class="h-20 w-20 rounded dark:hidden" src={image} alt={name} />
          </Link>

          <label for="counter-input" class="sr-only">
            Choose quantity:
          </label>
          <div class="flex items-center justify-between md:order-3 md:justify-end">
            <div class="flex items-center">
              <button
                type="button"
                id="decrement-button"
                onClick={() => onDecrease(id, color, size._id)}
                data-input-counter-decrement="counter-input"
                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="text"
                id="counter-input"
                data-input-counter
                class="w-10 shrink-0 border-0 font-sans bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                placeholder=""
                value={quantity}
                required
              />
              <button
                type="button"
                id="increment-button"
                onClick={() => onIncrease(id, color, size._id)}
                data-input-counter-increment="counter-input"
                class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
            <div class="ml-2 text-end md:order-4 md:w-32">
              <p class="text-base flex items-center font-bold text-gray-900 dark:text-white">
                {formatCurrency(price * quantity)}{" "}
                <TbCurrencyDong className="text-xl text-yellow-500" />
              </p>
            </div>
          </div>
          <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <Link
              to={`/product/${id}`}
              class="text-base font-semibold font-sans text-gray-900 hover:underline dark:text-white"
            >
              {name}
            </Link>

            <div class="flex items-center gap-4 font-sans">
              <span class="inline-flex items-center font-sans  text-sm font-medium text-gray-500 hover:text-gray-900 ">
                {size.size}
              </span>

              <button
                type="button"
                onClick={() => removeItemCart(id, color, size._id)}
                class="inline-flex font-sans items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState({});
  const [savingPrice, setSavingPrice] = useState(0);

  const fetchCart = async () => {
    const { error, cart } = await getCart();

    if (error) return error;
    if (cart) {
      console.log(cart);
      setCart(cart);
      setCartItems(cart.items);
      calculateSavingPrice(cart.items);
    }
  };
  const calculateSavingPrice = (items) => {
    const calculatedSavingPrice = items.reduce((acc, item) => {
      const discountAmount =
        (item.product.price *
          item.product.priceDiscount *
          item.totalProductQuantity) /
        100;
      return acc + discountAmount;
    }, 0);
    setSavingPrice(calculatedSavingPrice);
  };

  // const navigate = useNavigate();

  // const discountCode = "DISCOUNT123";
  // const [appliedDiscount, setAppliedDiscount] = useState(null);

  // const handleApplyDiscount = (code) => {
  //   if (code === discountCode) {
  //     setAppliedDiscount(discountCode);
  //   } else {
  //     alert("Invalid discount code");
  //   }
  // };

  const handleIncreaseQuantity = async (itemId, color, size) => {
    const dataProduct = {
      productId: itemId,
      selectedColor: color,
      selectedSize: size,
    };
    const { error, cart } = await increaseOneProduct(dataProduct);
    console.log(cart);
    if (error) return error.message;
    fetchCart();
  };

  const handleDecreaseQuantity = async (itemId, color, size) => {
    const dataProduct = {
      productId: itemId,
      selectedColor: color,
      selectedSize: size,
    };
    const { error } = await reduceOneProduct(dataProduct);
    if (error) return error.message;
    fetchCart();
  };

  // const handlePlaceOrder = () => {
  //   navigate(`/checkout?cartId=${cart._id}`);
  // };
  const handleRemoveItemCart = async (itemId, color, size) => {
    const dataProduct = {
      selectedColor: color,
      selectedSize: size,
    };
    const { error } = await removeItem(itemId, dataProduct);
    if (error) return error.message;
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container flex mx-auto my-8 p-4 h-screen bg-slate-50">
      <div className="h-3/4 w-2/3 overflow-y-auto ">
        {/* <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2> */}
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItem
              key={index}
              id={item.product._id}
              name={item.product.name}
              price={
                item.product.priceAfterDiscount * item.selectedSize.ratioPrice
              }
              quantity={item.totalProductQuantity}
              discount={item.product.priceDiscount}
              color={item.selectedColor._id}
              size={item.selectedSize}
              image={item.product.mainImage}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
              removeItemCart={handleRemoveItemCart}
            />
          ))
        ) : (
          <NotFound message="Your cart is Empty!!!!" />
        )}
        {/* <div className="w-full flex">
          <div className="w-2/3"></div>
          <div className="flex justify-end mt-4 w-1/3 ">
            <p className="font-bold text-xl w-full">
              {" "}
              {cartItems.length > 0 ? (
                <div className="flex w-full">
                  <p className="font-bold font-sans text-xl w-1/4 ">Tổng:</p>
                  <p className="font-bold font-sans text-xl w-3/4 flex items-center text-yellow-400">
                    {cart.totalPrice ? cart.totalPrice : 0}{" "}
                    <TbCurrencyDong className="text-xl text-yellow-500" />
                  </p>
                </div>
              ) : (
                ""
              )}
            </p>
          </div>
        </div> */}
      </div>
      {/* <div className="h-1/4 bg-white rounded p-4">
        <div
          className={
            cartItems.length > 0 ? "flex justify-center mt-8" : "hidden"
          }
        >
          <input
            type="text"
            placeholder="Enter discount code"
            className="border p-2 mr-2"
          />
          <button
            onClick={() => handleApplyDiscount(discountCode)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Apply Discount
          </button>
        </div>
        <div
          className={
            cartItems.length > 0 ? "flex justify-center mt-4" : "hidden"
          }
        >
          <button
            onClick={handlePlaceOrder}
            className="bg-yellow-400 w-1/3 text-white px-8 py-3 rounded-md hover:bg-yellow-500 focus:outline-none"
          >
            Place Order
          </button>
        </div>
      </div> */}
      <div
        class={`mx-auto w-1/3 mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full ${
          cartItems.length > 0 ? "" : "hidden"
        }`}
      >
        <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p class="text-xl font-semibold text-gray-900 font-sans">
            Order summary
          </p>

          <div class="space-y-4">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 font-sans">
                  Original price
                </dt>
                <dd class="text-base flex items-center font-medium text-gray-900 font-sans">
                  {cart.totalPrice ? formatCurrency(cart.totalPrice) : 0}{" "}
                  <TbCurrencyDong className="text-xl text-yellow-500 font-sans" />
                </dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 font-sans">
                  Savings
                </dt>
                <dd class="text-base font-medium flex items-center font-sans">
                  {formatCurrency(savingPrice)}
                  <TbCurrencyDong className="text-2xl text-yellow-500" />
                </dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 font-sans">
                  Tax
                </dt>
                <dd class="text-base font-medium text-gray-900 flex items-center font-sans">
                  {}
                  0 <TbCurrencyDong className="text-2xl text-yellow-500" />
                </dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-base font-bold text-gray-900 font-sans">Total</dt>
              <dd class="text-base flex items-center font-bold text-gray-900 dark:text-white">
                {cart.totalPrice ? formatCurrency(cart.totalPrice) : 0}{" "}
                <TbCurrencyDong className="text-xl text-yellow-500" />
              </dd>
            </dl>
          </div>

          <Link
            to={`/checkout?cartId=${cart._id}`}
            class="flex w-full items-center font-sans justify-center rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 "
          >
            Proceed to Checkout
          </Link>

          <div class="flex items-center justify-center gap-2">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400 font-sans">
              {" "}
              or{" "}
            </span>
            <Link
              to="/"
              title=""
              class="inline-flex font-sans items-center gap-2 text-sm font-medium text-yellow-600 underline hover:no-underline "
            >
              Continue Shopping
              <svg
                class="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <form class="space-y-4">
            <div>
              <label
                for="voucher"
                class="mb-2 block text-sm font-medium text-gray-900  font-sans"
              >
                {" "}
                Do you have a voucher or gift card?{" "}
              </label>
              <input
                type="text"
                id="voucher"
                class="block w-full rounded-lg focus:outline-yellow-400 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  "
                placeholder=""
                required
              />
            </div>
            <button
              type="submit"
              class="flex w-full font-sans items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
            >
              Apply Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
