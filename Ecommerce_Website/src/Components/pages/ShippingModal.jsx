import React, { useState } from "react";
import { getDistance } from "../../api/expense";
import { cities } from "../../utils/city";
import { GiWeight } from "react-icons/gi";
import { CiCalendarDate } from "react-icons/ci";
import { MdLocationOn } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { useNotification } from "../../hooks";
const ShippingModal = ({ isOpen, onClose, expenseShip }) => {
  const { updateNotification } = useNotification();
  const [shippingInfo, setShippingInfo] = useState({
    date: "",
    pickupLocation: "",
    deliveryLocation: "",
    weight: 0,
    shippingPrice: 0,
    duration: "",
    description: "",
  });

  // Hàm xử lý khi nhập thông tin vận chuyển
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };
  const handleSubmitShip = () => {
    const infoShip = {
      name: "Chi phí vận chuyển",
      typeExpense: "Chi phí vận chuyển",
      amount: shippingInfo.shippingPrice,
      description: `${shippingInfo.description} 
    - Date: ${shippingInfo.date}
    - Weight: ${shippingInfo.weight}
    - Pickup location: ${shippingInfo.pickupLocation} to Delivery location: ${shippingInfo.deliveryLocation}
    - Duration: ${shippingInfo.duration}`,
    };

    if (infoShip.amount <= 0) {
      return updateNotification("error", "Amount must be greater than zero");
    }
    expenseShip(infoShip);
  };
  console.log(shippingInfo);
  const calculateShippingPrice = async () => {
    const { type, data } = await getDistance(
      shippingInfo.pickupLocation,
      shippingInfo.deliveryLocation,
      shippingInfo.weight
    );
    if (type === "Success") {
      setShippingInfo({
        ...shippingInfo,
        shippingPrice: data.price,
        duration: data.duration,
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded w-1/2">
        <h2 className="text-lg font-semibold mb-4">Shipping service</h2>
        {/* <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your date</label>
        <input className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
          type="date" name="date" placeholder="Chọn ngày vận chuyển" value={shippingInfo.date} onChange={handleShippingInfoChange} /> */}
        <div className="flex justify-between mb-4 ">
          <div>
            <label
              for="pickupLocation"
              class=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center"
            >
              {" "}
              <MdLocationOn className="text-xl text-yellow-400 mr-1" />
              Pickup Location
            </label>
            <select
              id="pickupLocation"
              name="pickupLocation"
              onChange={handleShippingInfoChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 active:border-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {/* <select name="pickupLocation" id="pickupLocation" className='border-2 p-2 w-full hover:border-yellow-400  active:border-yellow-400 rounded' onChange={handleShippingInfoChange}> */}
              <option value="">
                <MdLocationOn /> Pickup Location
              </option>
              {cities.map((city, index) => (
                <option key={index} className="font-sans" value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">to</div>
          <div>
            <label
              for="deliveryLocation"
              class=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center"
            >
              <MdLocationOn className="text-xl text-yellow-400 mr-1" /> Delivery
              Location
            </label>
            <select
              id="deliveryLocation"
              name="deliveryLocation"
              onChange={handleShippingInfoChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none  active:border-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">
                <MdLocationOn /> Delivery Location
              </option>
              {cities.map((city, index) => (
                <option key={index} className="font-sans" value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* <input className="w-full mb-2 border border-gray-400 rounded px-2 py-1 mr-2"
            type="text" name="pickupLocation" placeholder="Pickup Location" value={shippingInfo.pickupLocation} onChange={handleShippingInfoChange} />
          <input className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
            type="text" name="deliveryLocation" placeholder="Delivery Location" value={shippingInfo.deliveryLocation} onChange={handleShippingInfoChange} /> */}
        </div>
        <div className="flex">
          <div className="w-1/2 mr-2">
            <label
              for="deliveryLocation"
              class=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center"
            >
              {" "}
              <GiWeight className="text-xl text-yellow-400 mr-1" /> Weight
            </label>
            <input
              className="w-full mb-2 border rounded px-2 py-1 focus:outline-none focus:border-yellow-500  focus:ring-yellow-500"
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={shippingInfo.weight}
              onChange={handleShippingInfoChange}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label
              for="date"
              class="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <CiCalendarDate className="text-xl text-yellow-400 mr-1" />
              Your date
            </label>
            <input
              className="w-full mb-2 border border-gray-400 rounded px-2 py-1 focus:outline-none focus:border-yellow-500  focus:ring-yellow-500"
              type="date"
              name="date"
              placeholder="Chọn ngày vận chuyển"
              value={shippingInfo.date}
              onChange={handleShippingInfoChange}
            />
          </div>
        </div>

        <div
          class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">
              Shipping Price: {shippingInfo.shippingPrice} VND
            </span>{" "}
            | Shipping Duration: {shippingInfo.duration}.
          </div>
        </div>

        <div>
          <label
            for="description"
            class="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <MdOutlineDescription className="text-xl text-yellow-400 mr-1" />{" "}
            Description
          </label>
          <textarea
            id="description"
            onChange={handleShippingInfoChange}
            name="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500  focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-sans"
            placeholder="Leave a comment..."
          ></textarea>
        </div>

        <div className="flex justify-between mt-4">
          <div>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded mr-2 font-sans "
              onClick={calculateShippingPrice}
            >
              Calculate Price
            </button>
          </div>
          <div>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold font-sans py-2 px-4 rounded mr-2"
              onClick={() => handleSubmitShip()}
            >
              Confirm
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-600 text-white font-sans font-semibold py-2 px-4 rounded"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingModal;
