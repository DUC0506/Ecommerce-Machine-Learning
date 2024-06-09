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
      className={`absolute w-auto md:w-full top-1/3 left-1/4 md:left-1/2 md:top-1/2 h-full transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <h2 className="text-2xl  mb-4 font-sans font-medium">Thông tin cơ bản</h2>
      <div class="mb-8 bg-white rounded p-4">
        <label for="name" class=" mb-2 flex font-sans font-medium">
          <p className="text-red-500">*</p>Tên người dùng{" "}
        </label>
        <input
          type="text"
          id="name"
          placeholder="[Nội dung]+[Loại sản phẩm]"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
        />

        <label for="username" class="flex mb-2 font-sans font-medium">
          <p className="text-red-500 ">*</p>Tài khoản
        </label>
        <input
          type="text"
          id="username"
          name="username"
          class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
          value={newUser.username}
          onChange={handleChange}
        />

        <label for="email" class="flex mb-2 font-sans font-medium">
          <p className="text-red-500">*</p>Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
          value={newUser.email}
          onChange={handleChange}
        />

        <label for="password" class="flex mb-2 font-sans font-medium">
          <p className="text-red-500">*</p>Password
        </label>
        <input
          type="text"
          id="password"
          name="password"
          class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
          value={newUser.password}
          onChange={handleChange}
        />
        <label
          for="passwordConfirmation"
          class="flex mb-2 font-sans font-medium"
        >
          <p className="text-red-500">*</p>Confirm Password
        </label>
        <input
          type="text"
          id="passwordConfirmation"
          name="passwordConfirmation"
          class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
          value={newUser.passwordConfirmation}
          onChange={handleChange}
        />

        <label for="role" class="flex mb-2 font-sans font-medium">
          <p className="text-red-500">*</p>Role
        </label>
        <input
          type="text"
          id="role"
          name="role"
          class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
          value={newUser.role}
          onChange={handleChange}
        />
      </div>

      <h2 class="text-2xl  mb-4 font-sans font-medium">Ảnh</h2>
      <div class=" bg-white rounded p-4">
        <div className="mb-8">
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
            <img src={newUser.image} alt="Main Image" className="w-32 h-auto" />
          )}
          {mainImageUrl && (
            <img src={mainImageUrl} alt="Main Image" className="w-32 h-auto" />
          )}
        </div>
      </div>
      <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin chi tiết</h2>
      <div class=" bg-white rounded p-4 mb-4">
        <div class="mb-8">
          <label for="address" class="flex mb-2 font-sans font-medium">
            <p className="text-red-500">*</p>Address:
          </label>
          <textarea
            id="address"
            name="address"
            class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
            value={newUser.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <div class="mb-8">
          <label for="companyName" class="flex mb-2 font-sans font-medium">
            <p className="text-red-500">*</p>Company:
          </label>
          <textarea
            id="companyName"
            name="companyName"
            class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
            value={newUser.companyName}
            onChange={handleChange}
          ></textarea>
        </div>
        <label for="phone" class="flex mb-2 font-sans font-medium">
          <p className="text-red-500">*</p>Phone
        </label>
        <input
          type="number"
          id="phone"
          name="phone"
          class="w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
          value={newUser.phone}
          onChange={handleChange}
        />

        <label for="apartment" class="flex mb-2 font-sans font-medium">
          <p className="text-red-500">*</p>Apartment
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
      <div class="flex justify-end">
        <button
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleAdd}
        >
          Thêm người dùng
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
  );
};

export default AddUserModal;
