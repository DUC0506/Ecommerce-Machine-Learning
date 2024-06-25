import { getSellerProducts } from "../../api/products";
import { useAuth, useNotification } from "../../hooks";
import React, { useEffect, useState } from "react";
import { MdAddBox, MdBatchPrediction } from "react-icons/md";
import { AiFillSignal } from "react-icons/ai";

const ProductDrawer = ({ onSubmit, holidays }) => {
  const { authInfo } = useAuth();
  const { updateNotification } = useNotification();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [holidayData, setHolidayData] = useState([]);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: " ",
    holidays: " ",
    productIndex: 1,
    productId: "",
  });
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý: Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  }
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const handleChangeProduct = (event) => {
    const selectedIndex = event.target.selectedIndex + 1;
    const selectedValue = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      productIndex: selectedIndex,
      productId: selectedValue,
    }));
  };
  const handleHolidays = () => {
    if (formData.holidays && Date.parse(formData.holidays)) {
      console.log(formData.holidays);
      setHolidayData([...holidayData, formatDate(formData.holidays)]);
    } else {
      updateNotification("error", "Invalid or empty holiday date!");
    }
  };
  const fetchProducts = async () => {
    const { type, products } = await getSellerProducts(authInfo.profile._id);
    if (type === "Success") {
      setProducts(products);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { start_date, end_date } = formData;
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (startDate > endDate) {
      updateNotification("error", "Start date must be earlier than end date!");
      return;
    }

    const maxDifference = 12; // Số tháng tối đa
    const differenceInMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    if (differenceInMonths > maxDifference) {
      updateNotification(
        "error",
        "The period between start and end date must not exceed 12 months!"
      );
      return;
    }
    onSubmit(formData, holidayData);
    setFormData({
      start_date: "",
      end_date: "",
      holidays: "",
      productIndex: 1,
      productId: "",
    });
    setHolidayData([]);
    // Add your form submission logic here
    closeDrawer();
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {/* Drawer init and show */}
      <div className="text-center m-5">
        <button
          id="updateProductButton"
          className="text-white flex items-center bg-yellow-400  hover:bg-yellow-500 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none dark:focus:ring-primary-800"
          type="button"
          onClick={openDrawer}
        >
          <AiFillSignal className="text-xl mr-1" /> Product prediction
        </button>
      </div>

      {/* Drawer component */}
      <div
        id="drawer-update-product-default"
        className={`fixed  shadow top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } bg-white dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-label"
        aria-hidden={!isDrawerOpen}
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-yellow-500 uppercase dark:text-gray-400"
        >
          Prediction information
        </h5>
        <button
          type="button"
          onClick={closeDrawer}
          aria-controls="drawer-update-product-default"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Prediction product
              </label>
              <select
                onChange={handleChangeProduct}
                defaultValue=""
                className="w-full font-sans md:w-auto px-4 py-2 mb-4 border rounded cursor-pointer focus:outline-none hover:border-yellow-500"
              >
                <option disabled value="" className="font-sans font-semibold ">
                  Choose product
                </option>

                {products.map((opt, index) => (
                  <option
                    key={index}
                    value={opt._id}
                    className="font-sans py-4"
                  >
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Date
              </label>
              <input
                type="date"
                className="mr-2 rounded px-3 py-2 appearance-none border border-yellow-300 focus:outline-none focus:border-yellow-500"
                name="start_date"
                onChange={handleChange}
                value={formData.startDay}
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <input
                type="date"
                className="mr-2 rounded px-3 py-2 appearance-none border border-yellow-300 focus:outline-none focus:border-yellow-500"
                name="end_date"
                onChange={handleChange}
                value={formData.endDay}
              />
            </div>
            <div className="">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Holidays Date
              </label>
              <div className="flex items-center">
                <input
                  type="date"
                  className="mr-2 rounded px-3 py-2 appearance-none border border-yellow-300 focus:outline-none focus:border-yellow-500"
                  name="holidays"
                  onChange={handleChange}
                  value={formData.holiday}
                />
                <button
                  type="button"
                  className="bg-yellow-400 text-white py-2 px-2 hover:bg-yellow-500 rounded ml-2 font-sans font-medium "
                  onClick={() => handleHolidays()}
                >
                  {" "}
                  <MdAddBox className="text-2xl" />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Holiday dates
              </label>
              <textarea
                name="arrayHoliday"
                id="arrayHoliday"
                className="font-sans outline-slate-200 w-full font-normal text-lg p-2 rounded mb-2 outline-none active:outline-yellow-500 hover:outline-yellow-500"
                value={holidayData}
              ></textarea>
            </div>
          </div>
          <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
            <button
              type="submit"
              className="w-full justify-center flex items-center text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <MdBatchPrediction className="text-xl mr-1" />
              Predict
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDrawer;
