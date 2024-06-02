import { getUsers } from "../../../api/user";
import { getAllApartments } from "../../../api/apartment";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../../utils/hepler";
const formatISODate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function UpdateStatusModal({
  isOpen,
  isClose,
  status,
  updateStatus,
  isSeller,
}) {
  const [formData, setFormData] = useState({
    typeOfViolation: "",
    violationTime: "",
    executionType: "",
    reason: "",
    appealStatus: "",
    seller: "",
  });

  const handleApartmentChange = (event) => {
    const selectedValue = event.target.value;
  };
  console.log(formData);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (id) => {
    updateStatus(formData, id);
    isClose();
    setFormData({
      typeOfViolation: "",
      violationTime: "",
      executionType: "",
      reason: "",
      appealStatus: "",
      seller: "",
    });
  };

  useEffect(() => {
    setFormData(status);
  }, [status]);
  return (
    <div
      className={`absolute w-full h-full   inset-0 bg-gray-800 opacity-95 z-50 ${
        isOpen ? "flex" : "hidden"
      }  items-center justify-center  `}
    >
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto    ">
        <div class="relative p-4 bg-white z-50  rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
              <mark class="px-2 text-white bg-yellow-500 rounded dark:bg-blue-500">
                {isSeller ? "Detail" : "Update"}
              </mark>{" "}
              status
            </h3>
            <button
              type="button"
              onClick={() => isClose()}
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-600  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <form>
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="typeOfViolation"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type Of Violation
                </label>
                <input
                  type="text"
                  name="typeOfViolation"
                  value={formData.typeOfViolation}
                  id="typeOfViolation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  onChange={handleOnChange}
                  required=""
                  disabled={isSeller}
                />
              </div>
              <div>
                <label
                  for="violationTime"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Violation Time
                </label>
                <input
                  type="date"
                  name="violationTime"
                  value={formatISODate(formData.violationTime)}
                  id="violationTime"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  onChange={handleOnChange}
                  required=""
                  disabled={isSeller}
                />
              </div>
              <div>
                <label
                  for="executionType"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Execution Type
                </label>
                {/* <input
                  type="text"
                  name="executionType"
                  value={formData.executionType}
                  id="executionType"
                  onChange={handleOnChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required=""
                /> */}
                <select
                  id="executionType"
                  name="executionType"
                  value={formData.executionType}
                  onChange={handleOnChange}
                  disabled={isSeller}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Execution type</option>
                  <option value="warning">Warning</option>
                  <option value="fine">Fine</option>
                  <option value="suspension">Suspension</option>
                </select>
              </div>
              <div>
                <label
                  for="appealStatus"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  AppealStatus
                </label>
                <select
                  id="appealStatus"
                  name="appealStatus"
                  value={formData.appealStatus}
                  onChange={handleOnChange}
                  disabled={isSeller}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Appeal status</option>
                  <option value="not_appealed">Not appealed</option>
                  <option value="under_review">Under review</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div class="sm:col-span-2">
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
                    <span class="font-medium mx-4">
                      Seller name : {formData.seller?.username}!
                    </span>{" "}
                    Created at:
                    {formatDate(formData?.createdAt)}.
                  </div>
                </div>
                <label
                  for="reason"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Reason
                </label>
                <textarea
                  id="reason"
                  onChange={handleOnChange}
                  value={formData.reason}
                  disabled={isSeller}
                  name="reason"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
            </div>
            {isSeller ? (
              ""
            ) : (
              <button
                type="button"
                onClick={() => handleSubmit(formData._id)}
                class="text-white bg-yellow-500 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
