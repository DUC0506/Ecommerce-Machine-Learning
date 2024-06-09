import React, { useEffect, useState } from "react";
import { useNotification } from "../hooks";
import { getAllApartments } from "../api/apartment";
import { useNavigate } from "react-router-dom";
import { resisterUser } from "../api/auth";
import useValidation from "../utils/validator";
import logo from "../assets/CONDOmarket .png";
const SignUp = () => {
  const [apartments, setApartments] = useState([]);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    apartment: "",
    passwordConfirmation: "",
    role: "user",
    name: "",
    username: "",
    image: File,
  });
  const { validateFields } = useValidation();

  const { updateNotification } = useNotification();

  async function urlToObject() {
    const response = await fetch(
      "https://res.cloudinary.com/dvdjknpvp/image/upload/v1711597612/Users/Duc/f2cqjkvnzvuz4v9opheg.webp"
    );
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });

    return file;
  }

  const navigate = useNavigate();

  const fetchApartments = async () => {
    const { type, message, apartments } = await getAllApartments();
    if (type === "Error") {
      return updateNotification("error", message);
    }
    setApartments(apartments);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSubmit = async (data) => {
    validateFields(userInfo);
    const file = await urlToObject();
    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("username", userInfo.username);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("passwordConfirmation", userInfo.passwordConfirmation);
    formData.append("role", userInfo.role);
    formData.append("image", file);
    formData.append("apartment", userInfo.apartment);

    const { type, message, user } = await resisterUser(formData);
    console.log(type, message);
    if (type === "Error") {
      return updateNotification("error", message);
    }
    if (user) {
      navigate(`/signIn`);
    }
  };
  const handleNavigator = () => {
    navigate(`/signIn`);
  };
  useEffect(() => {
    fetchApartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen w-full p-14  flex items-center  justify-center  bg-gradient-to-tr from-[#fae17b] to-[#09940d] shadow-md">
      <div className="grid-cols-1 md:grid-cols-2 grid h-[500px]">
        <div class="h-full  shadow-md bg-yellow-300 order-2 md:order-1 md:rounded-l-lg overflow-hidden ">
          <img
            src="https://res.cloudinary.com/dvdjknpvp/image/upload/v1712047012/psd-healthy-menu-promotion-social-media-instagram-story-banner-template_541452-309_zzrsmy.jpg"
            alt="12"
            className="h-full object-cover w-full   "
          />
        </div>

        <div className=" p-8 md:rounded-r-lg md:rounded-l-none rounded  shadow-md w-full  bg-white order-1  md:order-2 '">
          <div className="flex  justify-between">
            <div>
              <h2 className="text-2xl font-bold font-sans mt-8 ">Hi 🖐️,</h2>
              <h2 className="text-2xl font-bold mb-10 font-sans">
                Please register!
              </h2>
            </div>
            <img src={logo} alt="logo" className="w-24 h-24" />
          </div>
          <form>
            <div className="mb-4 flex relative">
              <input
                type="text"
                name="email"
                id="email"
                className="w-1/2 rounded-md p-3 outline-none border hover:outline-yellow-400 active:outline-yellow-400 m-1 "
                placeholder="Email "
                onChange={handleChange}
                required
              />

              <div className="w-1/2">
                <select
                  name="apartment"
                  id="apartment"
                  value={userInfo.apartment}
                  onChange={handleChange}
                  className="w-full rounded-md  px-2 py-4 border hover:outline-yellow-400 active:outline-yellow-400 outline-none"
                >
                  <option value="">Select apartment</option>
                  {apartments.map((apartment, index) => (
                    <option
                      key={index}
                      value={apartment._id}
                      className="text-base font-sans font-medium  py-2"
                    >
                      {apartment.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 flex">
              <input
                type="text"
                name="name"
                id="name"
                className="w-full  rounded-md p-3 border outline-none hover:outline-yellow-400 active:outline-yellow-400 mr-1 "
                placeholder="Name"
                value={userInfo.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="username"
                id="username"
                className="w-full   rounded-md p-3 border outline-none hover:outline-yellow-400 active:outline-yellow-400 "
                placeholder="User name"
                value={userInfo.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 flex">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full rounded-md font-sans p-3 border outline-none hover:outline-yellow-400 active:outline-yellow-400 mr-1"
                placeholder="Password"
                value={userInfo.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                className="w-full rounded-md font-sans p-3 border outline-none hover:outline-yellow-400 active:outline-yellow-400"
                placeholder=" Confirm password"
                value={userInfo.passwordConfirmation}
                onChange={handleChange}
              />
            </div>

            <button
              type="button"
              onClick={onSubmit}
              className="bg-yellow-400 text-white text-xl font-sans font-medium  w-full py-3 mt-2 mb-4 rounded-md hover:bg-yellow-600 focus:outline-none"
            >
              Sign Up
            </button>
          </form>
          <div className="flex text-base ">
            <div className="font-sans font-medium text-current">
              Already have an account?
            </div>
            <div
              className="font-sans font-medium ml-1 text-yellow-400 cursor-pointer"
              onClick={() => handleNavigator()}
            >
              Sign In
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
