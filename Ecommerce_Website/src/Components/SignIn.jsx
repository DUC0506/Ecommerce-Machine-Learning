import React, { useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import bg from "../assets/Supermarket_Template_2.png";
const Signin = () => {
  const navigate = useNavigate();

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
    handleLogin(userInfo.email, userInfo.password);
  };

  const handleNavigator = () => {
    navigate(`/signUp`);
  };

  return (
    <div className="min-h-screen  flex items-center  justify-center bg-green-500">
      <div className="flex">
        <div class="h-full  rounded-l-lg shadow-md bg-yellow-300  ">
          {/* <img src={bg} alt="12 " className='p-4' /> */}

          <img
            src="https://res.cloudinary.com/dvdjknpvp/image/upload/v1711596786/Users/duc/ey72rnm54gjjmiukemwk.webp"
            alt="12"
          />
        </div>

        <div className=" p-8 rounded-r-lg shadow-md w-96 bg-white  '">
          <h2 className="text-2xl font-bold font-sans mt-8 ">Xin chào bạn,</h2>
          <h2 className="text-2xl font-bold mb-10 font-sans">
            Chào mừng trở lại
          </h2>
          <form>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full  rounded-md p-3 outline-none hover:outline-yellow-400 active:outline-yellow-400 "
                placeholder="Email Address"
                value={userInfo.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full rounded-md p-3 outline-none hover:outline-yellow-400 active:outline-yellow-400"
                placeholder=" Mật Khẩu"
                value={userInfo.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4  flex ">
              <div className="font-sans font-bold text-sm flex  cursor-pointer ml-auto">
                Quên mật khẩu ?
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-yellow-400 text-white text-xl font-sans font-medium  w-full py-3 mt-2 mb-4 rounded-md hover:bg-yellow-600 focus:outline-none"
            >
              Đăng Nhập
            </button>
          </form>
          <div className="flex text-base ">
            <div className="font-sans font-medium text-current">
              Chưa có tài khoản?
            </div>
            <div
              className="font-sans font-medium ml-1 text-yellow-400 cursor-pointer"
              onClick={() => handleNavigator()}
            >
              Đăng kí
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
