import React, { useState } from "react";

import { MdOutlineCancel } from "react-icons/md";
import { verifyPassword } from "../../api/user";
import { useAuth } from "../../hooks";

const PasswordConfirmation = ({ onConfirm, isOpen, isClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { authInfo } = useAuth();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirm = async () => {
    const data = {
      email: authInfo.profile.email,
      password,
    };
    const { type } = await verifyPassword(data);
    if (type === "Success") {
      onConfirm();
      isClose();
    } else {
      setError("Incorrect password");
    }
  };

  const handleCancel = () => {
    isClose();
  };
  if (!isOpen) return null;
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-end items-center ">
        <MdOutlineCancel
          className=" text-2xl cursor-pointer"
          onClick={handleCancel}
        />
      </div>
      <div className="w-full text-center">
        <img
          src={authInfo.profile.profileImage}
          alt="avatar"
          className="rounded-full w-10 h-10 mx-auto mb-2"
        />
      </div>
      <p className="text-gray-700 mb-2">
        Enter your password to confirm withdrawal.
      </p>
      <input
        type="password"
        className="p-2 border rounded-full w-full mb-4 "
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleConfirm}
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-full w-full"
      >
        Confirm Withdrawal
      </button>
    </div>
  );
};

export default PasswordConfirmation;
