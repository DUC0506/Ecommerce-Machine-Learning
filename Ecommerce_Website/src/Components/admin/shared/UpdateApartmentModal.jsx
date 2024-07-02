/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
// import { getCategory } from '../../../api/category';

const UpdateApartmentModal = ({
  isOpen,
  onRequestClose,
  apartment,
  onUpdateApartment,
}) => {
  const [editedApartment, setEditedApartment] = useState({ ...apartment });
  console.log(editedApartment);
  const handleUpdate = () => {
    onUpdateApartment(editedApartment);
    onRequestClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedApartment((prevApartment) => ({
      ...prevApartment,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (!isOpen) {
      setEditedApartment({ ...apartment });
    }
    setEditedApartment({ ...apartment });
  }, [isOpen, apartment]);
  return (
    <div
      className={`absolute w-full h-full   inset-0 bg-gray-800 opacity-95 z-50 ${
        isOpen ? "flex" : "hidden"
      }  items-center justify-center  `}
    >
      {" "}
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto  bg-white rounded   ">
        <h3 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          <mark class="px-2 text-white bg-yellow-500 rounded dark:bg-blue-500">
            Update
          </mark>{" "}
          apartment
        </h3>

        <div class="mb-8 bg-white rounded p-4">
          <div className=" flex items-center gap-4">
            <div>
              <label
                for="name"
                class="block my-2 text-sm font-medium text-gray-900 "
              >
                Apartment name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedApartment.name}
                onChange={handleChange}
                class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
                placeholder="Chung cư Vạn Phúc"
                required
              />
            </div>
            <div>
              <label
                for="address"
                class="block my-2 text-sm font-medium text-gray-900 "
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={editedApartment.address}
                onChange={handleChange}
                class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
                placeholder="Quận 1, HCM"
                required
              />
            </div>
          </div>

          <div className=" flex items-center gap-4">
            <div>
              <label
                for="numberOfCourt"
                class="block my-2 text-sm font-medium text-gray-900 "
              >
                Number of courts
              </label>
              <input
                type="text"
                id="numberOfCourt"
                name="numberOfCourt"
                value={editedApartment.numberOfCourt}
                onChange={handleChange}
                class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
                placeholder="8"
                required
              />
            </div>
            <div>
              <label
                for="numberOfHouse"
                class="block my-2 text-sm font-medium text-gray-900 "
              >
                Number of houses
              </label>
              <input
                type="text"
                id="numberOfHouse"
                name="numberOfHouse"
                value={editedApartment.numberOfHouse}
                onChange={handleChange}
                class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
                placeholder="9"
                required
              />
            </div>
          </div>

          <div>
            <label
              for="condition"
              class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <input
              type="text"
              id="condition"
              name="condition"
              value={editedApartment.condition}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="Good"
              required
            />
          </div>
        </div>
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description apartment
        </label>
        <textarea
          id="description"
          value={editedApartment.description}
          onChange={handleChange}
          rows="4"
          class="bg-gray-50 font-sans border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
          placeholder="Write description..."
        ></textarea>

        <div class="flex justify-end mt-4">
          <button
            type="button"
            class="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleUpdate}
          >
            Update Product
          </button>
          <button
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateApartmentModal;
