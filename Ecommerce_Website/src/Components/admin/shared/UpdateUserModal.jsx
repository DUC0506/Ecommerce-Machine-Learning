/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";

const UpdateUserModal = ({ isOpen, onRequestClose, user, onUpdateUser }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  useEffect(() => {
    if (!isOpen) {
      setEditedUser({ ...user });
    }
    setEditedUser({ ...user });
  }, [isOpen, user]);
  return (
    <div
      className={`absolute w-full h-full   inset-0 bg-gray-800 opacity-95 z-50 ${
        isOpen ? "flex" : "hidden"
      }  items-center justify-center  `}
    >
      <div class="relative p-4 w-full max-w-2xl  h-full md:h-auto  bg-white rounded   ">
        <h3 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          <mark class="px-2 text-white bg-yellow-500 rounded dark:bg-blue-500">
            Update
          </mark>{" "}
          user
        </h3>
        <div className=" flex items-center gap-4 w-full">
          <div className="w-full">
            <label
              for="name"
              class="block my-2 text-sm font-sans font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="Duc"
              required
            />
          </div>
          <div className="w-full">
            <label
              for="address"
              class="block my-2 text-sm font-sans font-medium text-gray-900 "
            >
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="duc123"
              required
            />
          </div>
        </div>
        <div className=" flex items-center gap-4">
          <div className="w-full">
            <label
              for="email"
              class="block my-2 text-sm font-sans font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="duc@gmail.com"
              required
            />
          </div>
        </div>
        <div className=" flex items-center gap-4">
          <div className="w-full">
            <label
              for="role"
              class="block my-2 text-sm font-sans font-medium text-gray-900 "
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="seller"
              required
            />
          </div>
        </div>
        <h2 class="text-2xl   font-sans font-medium">Image</h2>

        <div class=" bg-white rounded p-4">
          <div className="">
            <label
              htmlFor="mainImage"
              className="flex mb-2 font-sans font-medium"
            >
              <p className="text-red-500">*</p>
              Main Image:
            </label>

            {editedUser.profileImage && (
              <img
                src={editedUser.profileImage}
                alt="Main Image"
                className="w-32 h-auto rounded"
              />
            )}
          </div>
        </div>

        <div className=" flex items-center gap-4">
          <div className="w-full">
            <label
              for="name"
              class="block my-2 text-sm font-sans font-medium text-gray-900 "
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={editedUser.address}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="Block 1"
              required
            />
          </div>
          <div className="w-full">
            <label
              for="companyName"
              class="block my-2 text-sm font-sans font-medium text-gray-900 "
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={editedUser.companyName}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="XYZ"
              required
            />
          </div>
        </div>
        <div className=" flex  gap-4">
          <div className="w-full">
            <label
              for="phone"
              class="block my-2 text-sm font-sans font-medium text-gray-900 "
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={editedUser.phone}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="0123123213"
              required
            />
          </div>
          <div className="w-full">
            <label
              for="apartment"
              class="block my-2 text-sm font-sans font-medium text-gray-900 "
            >
              Apartment
            </label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={editedUser.apartment.name}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="0123123213"
              required
            />
          </div>
        </div>
        <div class="flex justify-end mt-2">
          <button
            type="button"
            className="bg-yellow-500 font-sans text-white px-4 py-2 rounded mr-2"
            onClick={onUpdateUser}
          >
            Update User
          </button>
          <button
            type="button"
            class="bg-gray-500 font-sans text-white px-4 py-2 rounded"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
