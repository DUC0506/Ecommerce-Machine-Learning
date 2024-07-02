/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useAuth, useNotification } from "../../hooks";
import { getUser } from "../../api/user"; // Adjust the import according to your file structure
import { TbCurrencyDong } from "react-icons/tb";
import PasswordConfirmation from "./PasswordModal";
import { createWithDraw } from "../../api/transaction";

export default function WithdrawFunds({ isOpen, isClose, user }) {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(true);
  const { updateNotification } = useNotification();
  const balance = user.balance;

  const addWithdraw = async () => {
    const data = {
      amount,
    };
    const { type } = await createWithDraw(data);
    if (type === "Error") {
      return updateNotification("error", "Withdraw failed");
    } else {
      setAmount(0);
      updateNotification("success", "Withdraw is pending approval");
      isClose();
    }
  };
  const handleWithdraw = async () => {
    if (amount > balance) {
      updateNotification("error", "Amount exceeds available balance");
      return;
    }
    if (amount <= 0) {
      updateNotification("error", "Amount must be greater than 0");
      return;
    }
    if (bankNumber === "") {
      updateNotification("error", "Please choose a bank account");
      return;
    }

    setOpenPasswordModal(true);
    setOpenWithdrawModal(false);
  };
  const handleClose = () => {
    setOpenPasswordModal(false);
    setOpenWithdrawModal(true);
    isClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <PasswordConfirmation
        isOpen={openPasswordModal}
        isClose={handleClose}
        onConfirm={addWithdraw}
      />
      <div className={` ${openWithdrawModal ? "" : "hidden"}`}>
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h1 className="text-xl font-semibold mb-4 py-1 text-center bg-yellow-400 text-white rounded ">
            Withdraw Funds
          </h1>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Available Balance
            </label>
            <div className="flex items-center border px-4 py-2 rounded-full bg-gray-50">
              {balance}{" "}
              <TbCurrencyDong className="text-yellow-400 text-2xl ml-2" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Amount to Withdraw
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Bank Account
            </label>

            <select
              id="countries"
              required
              onChange={(e) => setBankNumber(e.target.value)}
              class="bg-gray-50 outline-none border  border-gray-300 text-gray-900 text-sm rounded-full focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
            >
              <option selected>Choose a bank account</option>
              {user?.cardBank.map((account) => (
                <option value={account.bankNumber} key={account}>
                  {account.bankNumber}
                </option>
              ))}
            </select>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={isClose}
              className="w-full py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-400"
            >
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              className="w-full py-2 bg-yellow-400 text-white font-semibold rounded-full hover:bg-yellow-500"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
