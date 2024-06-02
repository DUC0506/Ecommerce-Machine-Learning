import { getUsers } from "../../../api/user";
import { getAllApartments } from "../../../api/apartment";
import React, { useEffect, useState } from "react";

export default function AddStatusModal({ isOpen, isClose, submit }) {
  const [apartments, setApartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    typeOfViolation: "",
    violationTime: "",
    executionType: "",
    reason: "",
    appealStatus: "",
    seller: "",
  });
  const fetchApartments = async () => {
    const { type, apartments } = await getAllApartments();
    if (type === "Success") {
      setApartments(apartments);
    }
  };
  const fetchSeller = async (apartmentId) => {
    const { type, users } = await getUsers("seller", apartmentId);
    if (type === "Success") {
      console.log(users);
      setUsers(users);
    }
  };
  const handleApartmentChange = (event) => {
    const selectedValue = event.target.value;
    fetchSeller(selectedValue);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(formData);
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
    fetchApartments();
  }, []);
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
                Add
              </mark>{" "}
              status
            </h3>
            <button
              type="button"
              onClick={() => isClose()}
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                  placeholder="Type Of Violation"
                  onChange={handleOnChange}
                  required=""
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
                  value={formData.violationTime}
                  id="violationTime"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  onChange={handleOnChange}
                  required=""
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Appeal status</option>
                  <option value="not_appealed">Not appealed</option>
                  <option value="under_review">Under review</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div>
                <label
                  for="apartment"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Apartment
                </label>
                <select
                  id="apartment"
                  value={formData.apartment}
                  onChange={handleApartmentChange}
                  name="apartment"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Apartment</option>
                  {apartments.map((apartment, index) => (
                    <option key={index} value={apartment._id}>
                      {apartment.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  for="appealStatus"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Seller
                </label>
                <select
                  id="seller"
                  name="seller"
                  value={formData.seller}
                  onChange={handleOnChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Select Seller</option>
                  {users.map((user, index) => (
                    <option key={index} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div class="sm:col-span-2">
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
                  name="reason"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write product reason here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              class="text-white bg-yellow-500 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
