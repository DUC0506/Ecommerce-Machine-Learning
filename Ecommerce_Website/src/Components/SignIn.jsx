import React, { useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import useValidation from "../utils/validator";
import logo from "../assets/CONDOmarket .png";

const Signin = () => {
  const navigate = useNavigate();
  const { validateSignIn } = useValidation();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { handleLogin } = useAuth();

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = () => {
    const bool = validateSignIn(userInfo);
    if (!bool) {
      return;
    }
    handleLogin(userInfo.email, userInfo.password);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      handleSubmit();
    }
  };
  const handleNavigator = () => {
    navigate(`/signUp`);
  };
  // from-[#1D976C] to-[#93F9B9]
  // from-[#facc15] to-[#5FC3E4]
  return (
    <div className="min-h-screen  flex items-center  justify-center bg-gradient-to-tr from-[#facc15] to-[#5FC3E4] shadow-md">
      <div className="grid-cols-1 md:grid-cols-2 grid">
        <div class="h-full  flex rounded-l-lg shadow-md order-2 md:order-1 bg-yellow-300  justify-center items-center ">
          {/* <img src={bg} alt="12 " className='p-4' /> */}

          <img
            src="https://res.cloudinary.com/dvdjknpvp/image/upload/v1711596786/Users/duc/ey72rnm54gjjmiukemwk.webp"
            alt="12"
            className="object-contain hidden sm:block sm:w-96"
          />
        </div>

        <div className=" p-8 rounded-r-lg rounded-l-lg sm:rounded-l-none shadow-md sm:w-96 bg-white order-1  md:order-2  '">
          <div className="flex  justify-between">
            <div>
              <h2 className="text-2xl font-bold font-sans mt-8 ">Hello 🖐️,</h2>
              <h2 className="text-2xl font-bold mb-10 font-sans">
                Welcome back
              </h2>
            </div>
            <img src={logo} alt="logo" className="w-24 h-24" />
          </div>
          <form>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full  rounded-md border p-3 outline-none hover:outline-yellow-400 active:outline-yellow-400 "
                placeholder="Email"
                value={userInfo.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full rounded-md p-3 border  outline-none hover:outline-yellow-400 active:outline-yellow-400"
                placeholder=" Password"
                value={userInfo.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required
              />
            </div>
            <div className="mb-4  flex ">
              <div className="font-sans font-bold text-sm flex  cursor-pointer ml-auto">
                Forgot password ?
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-yellow-400 text-white text-xl font-sans font-medium  w-full py-3 mt-2 mb-4 rounded-md hover:bg-yellow-600 focus:outline-none"
            >
              Sign In
            </button>
          </form>
          <div className="flex text-base ">
            <div className="font-sans font-medium text-current">
              Don't have an account yet?
            </div>
            <div
              className="font-sans font-medium ml-1 text-yellow-400 cursor-pointer"
              onClick={() => handleNavigator()}
            >
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
