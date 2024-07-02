/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { getAllApartments } from "../../../api/apartment";

const AddUserModal = ({ isOpen, onRequestClose, onAddUser }) => {
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [apartments, setApartments] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    address: "",
    companyName: "",
    phone: "",
    image: "",
    apartment: "",
    passwordConfirmation: "",
  });
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewUser((prevData) => ({ ...prevData, [name]: files[0] }));
    const reader = new FileReader();
    reader.onload = () => {
      setMainImageUrl(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleAdd = () => {
    const formData = new FormData();

    formData.append("name", newUser.name);
    formData.append("username", newUser.username);
    formData.append("email", newUser.email);
    formData.append("password", newUser.password);
    formData.append("passwordConfirmation", newUser.passwordConfirmation);
    formData.append("role", newUser.role);
    formData.append("address", newUser.address);
    formData.append("companyName", newUser.companyName);
    formData.append("phone", newUser.phone);
    formData.append("image", newUser.image);
    formData.append("apartment", newUser.apartment);

    console.log(newUser);

    onAddUser(formData);
    // onRequestClose();
  };
  const fetchApartment = async () => {
    const { type, message, apartments } = await getAllApartments();
    if (type === "Error") return message;
    setApartments(apartments);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    fetchApartment();
  }, []);

  return (
    <div
      className={`absolute w-full h-full   inset-0 bg-gray-800 opacity-95 z-50 ${
        isOpen ? "flex" : "hidden"
      }  items-center justify-center  `}
    >
      <div class="relative p-4 w-full max-w-2xl  h-full md:h-auto  bg-white rounded   ">
        <h3 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          <mark class="px-2 text-white bg-yellow-500 rounded dark:bg-blue-500">
            Create
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
              value={newUser.name}
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
              value={newUser.username}
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
              value={newUser.email}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="duc@gmail.com"
              required
            />
          </div>
          <div className="w-full">
            <label
              for="password"
              class="block my-2 text-sm font-medium font-sans text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="123xyz"
              required
            />
          </div>
        </div>
        <div className=" flex items-center gap-4">
          <div className="w-full">
            <label
              for="passwordConfirmation"
              class="block my-2 text-sm font-sans font-medium text-gray-900 "
            >
              Password Confirm
            </label>
            <input
              type="text"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={newUser.passwordConfirmation}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="123xyz"
              required
            />
          </div>
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
              value={newUser.role}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="seller"
              required
            />
          </div>
        </div>
        <h2 class="text-2xl   font-sans font-medium">Image</h2>
        <div class=" bg-white rounded p-4">
          <div className="mb-8 w-full ">
            <label
              htmlFor="mainImage"
              className="flex mb-2 font-sans font-medium"
            >
              <p className="text-red-500">*</p>
              Main Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="w-full border p-2 mb-4 focus:outline-none focus:border-yellow-500"
            />
            {newUser.image && (
              <img
                src={newUser.image}
                alt="Main Image"
                className="w-32 h-auto"
              />
            )}
            {mainImageUrl && (
              <img
                src={mainImageUrl}
                alt="Main Image"
                className="w-32 h-auto"
              />
            )}
          </div>
        </div>

        <div class=" bg-white rounded p-4 mb-4"></div>
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
              value={newUser.address}
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
              value={newUser.companyName}
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
              value={newUser.phone}
              onChange={handleChange}
              class="bg-gray-50 border hover:outline-yellow-400 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5  "
              placeholder="0123123213"
              required
            />
          </div>
          <div className="w-full">
            <label
              for="companyName"
              class="block my-2 text-sm font-medium text-gray-900 "
            >
              Apartment
            </label>

            <select
              id="apartment"
              name="apartment"
              value={newUser.category}
              onChange={handleChange}
              class="w-full border p-2 mb-4 font-sans font-normal focus:outline-none  focus:border-yellow-500"
            >
              <option value="" disabled>
                Vui lòng chọn chung cư
              </option>
              {apartments.map((apartment) => (
                <option key={apartment._id} value={apartment._id}>
                  {apartment.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            className="bg-yellow-500 font-sans text-white px-4 py-2 rounded mr-2"
            onClick={handleAdd}
          >
            Create User
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

export default AddUserModal;
