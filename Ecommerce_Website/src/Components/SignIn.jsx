import React, { useState } from 'react';
import { useAuth } from '../hooks';

const Signin = () => {
  const{authInfo} = useAuth()
  console.log(authInfo.isLoggedIn);
   console.log(1);
    const [userInfo,setUserInfo]= useState({
   
        email:"",
        password:"",
    })
    
    const{handleLogin }=useAuth()
   
    const handleChange=({target})=>{
        const{value,name}=target;
        
        setUserInfo({...userInfo,[name]:value})
        
      }

  const handleSubmit = () => {
    handleLogin(userInfo.email,userInfo.password)
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Đăng Nhập</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name='email'
              id="email"
              className="w-full border rounded-md p-2"
              placeholder="Nhập Email"
              value={userInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Mật Khẩu
            </label>
            <input
              type="password"
              name='password'
              id="password"
              className="w-full border rounded-md p-2"
              placeholder="Nhập Mật Khẩu"
              value={userInfo.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
