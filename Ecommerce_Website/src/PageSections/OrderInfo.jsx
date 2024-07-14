/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Components/Footer";
import { getCart } from "../api/cart";
import { createOrder } from "../api/order";

import { useNotification } from "../hooks";
import { TbCurrencyDong } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/hepler";
import Loading from "../Components/admin/shared/Loading";

const AddressSection = ({ onAddressChange }) => {
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    // Gọi hàm onAddressChange để truyền dữ liệu về phía cha (OrderInfoPage)
    onAddressChange({ city, phoneNumber, country, deliveryAddress });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, phoneNumber, country, deliveryAddress]);
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2 font-sans">Delivery address</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700  font-sans "
          >
            City
          </label>
          <input
            type="text"
            id="city"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full  font-sans focus:outline-none  focus:border-yellow-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700  font-sans"
          >
            Phone
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full  font-sans focus:outline-none  focus:border-yellow-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="deliveryArea"
            className="block text-sm font-medium text-gray-700  font-sans"
          >
            Ward
          </label>
          <input
            type="text"
            id="deliveryArea"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full  font-sans focus:outline-none  focus:border-yellow-500"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="deliveryAddress"
            className="block text-sm font-medium text-gray-700  font-sans"
          >
            Address (block name + house number)
          </label>
          <input
            type="text"
            id="deliveryAddress"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full  font-sans focus:outline-none  focus:border-yellow-500"
            placeholder="block name + house number"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const TimePaymentNoteSection = ({ onTimePaymentNoteChange }) => {
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [showCreditCardFields, setShowCreditCardFields] = useState(false);

  useEffect(() => {
    // Gọi hàm onTimePaymentNoteChange để truyền dữ liệu về phía cha (OrderInfoPage)
    onTimePaymentNoteChange({
      postalCode,
      paymentMethod,
      note,
      cardNumber,
      expiry,
      cvc,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCode, paymentMethod, note, cardNumber, expiry, cvc]);

  const handlePaymentMethodChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPaymentMethod(selectedPaymentMethod);
    setShowCreditCardFields(selectedPaymentMethod !== "cash");
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2 font-sans">
        Payment methods and notes
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="deliveryTime"
            className="block text-sm font-medium text-gray-700 font-sans"
          >
            ZIP code
          </label>
          <input
            type="text"
            id="postalCode"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full font-sans focus:outline-none  focus:border-yellow-500"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700 font-sans"
          >
            Payment methods
          </label>
          <select
            id="paymentMethod"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full font-sans focus:outline-none  focus:border-yellow-500"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option className="font-sans font-medium " value="">
              Select a payment method
            </option>
            <option className="font-sans " value="pm_card_visa">
              Visa
            </option>
            <option className="font-sans " value="pm_card_visa_debit">
              Visa (debit)
            </option>
            <option className="font-sans " value="pm_card_jcb">
              JCB
            </option>
            <option className="font-sans " value="pm_card_mastercard">
              Mastercard
            </option>
            <option className="font-sans " value="pm_card_unionpay">
              UnionPay
            </option>
            <option className="font-sans " value="cash">
              Payment upon delivery
            </option>
          </select>
        </div>
        {showCreditCardFields && (
          <div class="w-full rounded-lg border border-gray-200 bg-white p-1 shadow-sm  sm:p-2 lg:max-w-xl lg:p-4">
            <div class=" grid grid-cols-2 gap-4">
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="card-number-input"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  Card number*{" "}
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  class="block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:outline-yellow-500 focus:ring-yellow-500  "
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                  required
                />
              </div>

              <div>
                <label
                  for="card-expiration-input"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Card expiration*{" "}
                </label>
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center pl-3.5">
                    <svg
                      class="h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    datepicker
                    datepicker-format="mm/yy"
                    type="text"
                    id="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    class="block w-full rounded-lg border focus:outline-yellow-500 border-gray-300 bg-gray-50 p-2.5 pl-9 text-sm text-gray-900  "
                    placeholder="12/23"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  for="cvv-input"
                  class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  CVV*
                  <button
                    data-tooltip-target="cvv-desc"
                    data-tooltip-trigger="hover"
                    class="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                  >
                    <svg
                      class="h-4 w-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id="cvv-desc"
                    role="tooltip"
                    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                  >
                    The last 3 digits on back of card
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </label>
                <input
                  type="text"
                  id="cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  aria-describedby="helper-text-explanation"
                  class="block w-full rounded-lg border focus:outline-yellow-500 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
                  placeholder="•••"
                  required
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700 font-sans"
          >
            Additional Notes(Delivery time)
          </label>
          <textarea
            id="note"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full font-sans focus:outline-none  focus:border-yellow-500"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const OrderInfoPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [timePaymentNoteInfo, setTimePaymentNoteInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { updateNotification } = useNotification();

  const handlePurchase = async () => {
    setLoading(true);
    const part = timePaymentNoteInfo.expiry.split("/");
    const orderInfo = {
      paymentMethod: timePaymentNoteInfo.paymentMethod,
      phone: addressInfo.phoneNumber,
      timeDelivery: timePaymentNoteInfo.note,
      shippingAddress: {
        address: addressInfo.deliveryAddress,
        city: addressInfo.city,
        country: addressInfo.country,
        postalCode: timePaymentNoteInfo.postalCode,
      },
      cardNumber: parseInt(timePaymentNoteInfo.cardNumber), // Chuyển cardNumber thành số
      cvc: parseInt(timePaymentNoteInfo.cvc), // Chuyển cvc thành số
      expMonth: parseInt(part[0]), // Chuyển expMonth thành số
      expYear: parseInt(part[1]), // Chu
    };

    const { type, message } = await createOrder(orderInfo);
    setLoading(false);
    if (type === "Error") return updateNotification("error", message);
    else if (type === "Success") {
      updateNotification("success", message);
      navigate(`/`);
    }
  };
  const fetchCart = async () => {
    const { type, message, cart } = await getCart();
    if (type === "Error") return updateNotification("error", message);
    setCart(cart);
  };

  const handleAddressChange = (addressData) => {
    setAddressInfo(addressData);
  };

  const handleTimePaymentNoteChange = (timePaymentNoteData) => {
    setTimePaymentNoteInfo(timePaymentNoteData);
  };
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="relative">
      {loading ? <Loading /> : null}

      <ToastContainer />
      <Navbar />
      <div className="container flex mx-auto  p-4 bg-slate-50">
        <div className="bg-white w-3/4  p-4">
          <AddressSection onAddressChange={handleAddressChange} />

          <TimePaymentNoteSection
            onTimePaymentNoteChange={handleTimePaymentNoteChange}
          />
        </div>

        <div className="w-1/4 ml-2">
          <div class="mt-6 grow sm:mt-8 lg:mt-0">
            <div class="space-y-4 rounded-lg border border-gray-100 bg-white p-6 ">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 d">
                    Total price
                  </dt>
                  <dd class="text-base flex items-center font-medium text-gray-900 ">
                    {formatCurrency(cart.totalPrice)}
                    <TbCurrencyDong className="text-2xl text-yellow-500" />
                  </dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 ">
                    Total products
                  </dt>
                  <dd class="text-base font-medium flex items-center mr-2">
                    {" "}
                    {cart.totalQuantity}
                  </dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 ">Tax</dt>
                  <dd class="text-base font-medium text-gray-900 flex items-center">
                    {" "}
                    0 <TbCurrencyDong className="text-2xl text-yellow-500" />
                  </dd>
                </dl>
              </div>

              <dl class="flex items-center justify-between gap-4 border-t border-white pt-2 ">
                <dt class="text-base font-bold text-gray-900 ">Total</dt>
                <dd class="text-base font-bold text-gray-900 flex items-center ">
                  {" "}
                  {formatCurrency(cart.totalPrice)}
                  <TbCurrencyDong className="text-2xl text-yellow-500" />
                </dd>
              </dl>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-center gap-8 bg-white p-2 rounded">
            <img
              class="h-8 w-auto dark:hidden"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/993px-JCB_logo.svg.png"
              alt=""
            />

            <img
              class="h-8 w-auto dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
              alt=""
            />

            <img
              class="h-8 w-auto dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
              alt=""
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePurchase}
              className="bg-yellow-500 text-white px-8 py-3 rounded-md hover:bg-yellow-600 focus:outline-none  font-sans"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderInfoPage;
