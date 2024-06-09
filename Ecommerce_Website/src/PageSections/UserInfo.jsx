import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { ToastContainer } from "react-toastify";
import { useAuth, useNotification } from "../hooks";
import {
  getUser,
  updateUserDetails,
  updateUserProfileImage,
} from "../api/user";
import Footer from "../Components/Footer";
import { getAllApartments } from "../api/apartment";

export default function UserInfo() {
  const [image, setImage] = useState({});
  const [apartments, setApartments] = useState([]);
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  console.log(authInfo.profile._id);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",

    address: "",
    companyName: "",
    phone: "",
    profileImage: "",
    apartment: "",
  });

  const fetchUser = async () => {
    const { type, message, user } = await getUser(authInfo.profile._id);
    if (type === "Error") return updateNotification("error", message);
    console.log(user);
    setFormData(user);
  };
  const fetchApartments = async () => {
    const { type, message, apartments } = await getAllApartments();
    if (type === "Error") return updateNotification("error", message);
    console.log(apartments);
    setApartments(apartments);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    // Tạo URL cho hình ảnh đã chọn
    setFormData((prevData) => ({
      ...prevData,
      profileImage: URL.createObjectURL(imageFile), // Tạo URL cho hình ảnh
    }));
    console.log(formData);

    setImage(imageFile);
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData1 = new FormData();
    formData1.append("image", image);

    const { profileImage, ...formDataWithoutProfileImage } = formData;
    console.log(formDataWithoutProfileImage);

    // Gọi cả hai API cùng lúc
    if (image.name) {
      // Nếu có cập nhật ảnh, gọi cả hai API
      const [updateDetailsResponse, updateProfileImageResponse] =
        await Promise.all([
          updateUserDetails(formDataWithoutProfileImage),
          updateUserProfileImage(formData1),
        ]);

      // Kiểm tra kết quả của cả hai API
      if (
        updateDetailsResponse.type === "Error" ||
        updateProfileImageResponse.type === "Error"
      ) {
        // Xử lý lỗi
        updateNotification(
          "error",
          "Có lỗi xảy ra khi cập nhật thông tin hoặc hình ảnh"
        );
      } else {
        // Xử lý thành công
        updateNotification("success", "Cập nhật thành công");
      }
    } else {
      // Nếu không có cập nhật ảnh, chỉ gọi updateUserDetails
      const { type, message } = await updateUserDetails(
        formDataWithoutProfileImage
      );
      if (type === "Error") {
        // Xử lý lỗi
        updateNotification("error", message);
      } else {
        // Xử lý thành công
        updateNotification("success", message);
        fetchUser();
      }
    }
  };
  useEffect(() => {
    fetchUser();
    fetchApartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {authInfo.profile.role === "user" ? (
        <>
          {" "}
          <ToastContainer />
          <Navbar />{" "}
        </>
      ) : (
        ""
      )}

      <div className="w-2/3 mx-auto mt-8  bg-slate-50 p-10 rounded-lg shadow-lg mb-8 font-sans ">
        <h2 className="text-2xl font-semibold mb-4 font-sans">User profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full">
            <div className="mb-4 w-1/2 mr-2">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2 font-sans "
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans "
              />
            </div>
            <div className="mb-4 w-1/2">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-2 font-sans "
              >
                User name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans "
              />
            </div>
          </div>
          <div className="flex">
            <div className="mb-4 w-2/3">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2 font-sans "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                readOnly={true}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500 font-sans "
              />
            </div>
            <div className="mb-4 w-1/3 ml-2 flex flex-col items-center justify-center">
              <label
                htmlFor="profileImage"
                className="block text-gray-700 font-semibold mb-2 font-sans "
              >
                Avatar
              </label>
              {formData.profileImage && (
                <img
                  src={formData.profileImage}
                  alt="avatar-img"
                  className="w-32 h-32 mb-4 rounded-lg"
                />
              )}
              <button className="relative py-2 px-4 bg-yellow-400 rounded font-sans font-medium  ">
                {" "}
                Select photo
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*" // Chỉ chấp nhận file hình ảnh
                  onChange={handleImageChange}
                  className=" absolute inset-0 opacity-0  w-full h-full cursor-pointer font-sans "
                />
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="mb-4  w-3/4 ">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2 w-1/6 font-sans   "
              >
                Password
              </label>
              <div className="flex">
                <input
                  type="password"
                  id="password"
                  name="password"
                  readOnly={true}
                  value={123123141}
                  // onChange={handleChange}
                  className="w-full px-4 py-2 border font-sans  rounded-lg focus:outline-none focus:border-yellow-500"
                />
                <div className="text-sm w-1/4 text-yellow-500 font-sans underline underline-offset-4 cursor-pointer ml-4">
                  Change password
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold font-sans  mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div className="flex">
            <div className="mb-4 w-1/2 mr-2">
              <label
                htmlFor="companyName"
                className="block text-gray-700 font-semibold font-sans  mb-2"
              >
                Company name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div className="mb-4 w-1/2 ">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold font-sans mb-2"
              >
                Phone{" "}
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="apartment"
              className="block text-gray-700  mb-2   font-semibold font-sans "
            >
              Apartment
            </label>
            {/* <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            /> */}

            <select
              onChange={(e) => handleChange(e)}
              name="apartment"
              id="apartment"
              value={formData.apartment._id}
              className="w-full font-sans font-medium px-4 py-2 border rounded-lg focus:outline-none focus:border-yellow-500"
            >
              {apartments &&
                apartments.map((apartment, index) => (
                  <option key={index} value={apartment._id}>
                    {apartment.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-yellow-400 font-sans font-medium text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
          >
            Update profile
          </button>
        </form>
      </div>
      {authInfo.profile.role === "user" ? (
        <>
          {" "}
          <Footer />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
