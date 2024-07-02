/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";

const AddApartmentModal = ({ isOpen, onRequestClose, onAddApartment }) => {
  const [newApartment, setNewApartment] = useState({
    name: "",
    address: "",
    numberOfCourt: 0,
    numberOfHouse: 0,
    condition: "",
    description: "",
  });

  const handleAdd = () => {
    const formData = new FormData();

    formData.append("name", newApartment.name);
    formData.append("address", newApartment.address);
    formData.append("numberOfCourt", newApartment.numberOfCourt);
    formData.append("numberOfHouse", newApartment.numberOfHouse);
    formData.append("condition", newApartment.condition);
    formData.append("description", newApartment.description);

    onAddApartment(formData);
    onRequestClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewApartment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className={`absolute w-full h-full   inset-0 bg-gray-800 opacity-95 z-50 ${
        isOpen ? "flex" : "hidden"
      }  items-center justify-center  `}
    >
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto  bg-white rounded   ">
        <h3 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          <mark class="px-2 text-white bg-yellow-500 rounded dark:bg-blue-500">
            Add
          </mark>{" "}
          apartment
        </h3>
        <div className="mb-8 bg-white rounded p-4 ">
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
                value={newApartment.name}
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
                value={newApartment.address}
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
                value={newApartment.numberOfCourt}
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
                value={newApartment.numberOfHouse}
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
              value={newApartment.numbeconditionrOfHouse}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="Good"
              required
            />
          </div>
        </div>

        <label
          for="description"
          class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description apartment
        </label>
        <textarea
          id="description"
          value={newApartment.description}
          onChange={handleChange}
          rows="4"
          class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
          placeholder="Write description..."
        ></textarea>

        <div className="flex justify-end mt-2">
          <button
            type="button"
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleAdd}
          >
            Add apartment
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddApartmentModal;
