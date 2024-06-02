import React, { useState } from "react";
import { MdExplicit, MdOutlineDescription } from "react-icons/md";

export default function ExpenseModal({ expense, onClose }) {
  const [newExpense, setNewExpense] = useState({
    name: "",
    typeExpense: "",
    amount: "",
    description: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };
  const handleAddExpense = async () => {
    expense(newExpense);

    setNewExpense({
      name: "",
      typeExpense: "",
      amount: "",
      description: "",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded w-1/2">
        <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          Regarding your business
          <mark class="px-2 text-white bg-yellow-500 rounded ">
            expenses
          </mark>{" "}
        </h1>
        <p class="text-base font-normal text-gray-500 lg:text-lg mb-4">
          Here you add costs outside of buying and selling transactions on the
          platform
        </p>

        <div className="flex">
          <div class="relative w-1/2 mr-2">
            <input
              type="text"
              id="name"
              name="name"
              value={newExpense.name}
              onChange={handleInputChange}
              class="block px-2.5 pb-2.5 pt-4 w-full font-sans text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-yellow-400 focus:ring-0 focus:border-yellow-500 peer"
              placeholder=" "
            />
            <label
              for="name"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Expense name
            </label>
          </div>
          {/* <input className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        type="text" name="name" placeholder="Name" value={newExpense.name} onChange={handleInputChange} /> */}
          <div class="relative w-1/2 ml-2">
            <input
              type="text"
              id="typeExpense"
              name="typeExpense"
              value={newExpense.typeExpense}
              onChange={handleInputChange}
              class="block px-2.5 pb-2.5 pt-4 w-full font-sans text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-yellow-400 focus:ring-0 focus:border-yellow-500 peer"
              placeholder=" "
            />
            <label
              for="typeExpense"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Type expense{" "}
            </label>
          </div>
        </div>
        {/* <input className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        type="text" name="typeExpense" placeholder="Type" value={newExpense.typeExpense} onChange={handleInputChange} /> */}
        <div class="relative mt-4 w-1/2 mr-2">
          <input
            type="number"
            id="amount"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            class="block px-2.5 pb-2.5 pt-4 w-full font-sans text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-yellow-400 focus:ring-0 focus:border-yellow-500 peer"
            placeholder=" "
          />
          <label
            for="amount"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Amount expense{" "}
          </label>
        </div>
        {/* <input className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        type="number" name="amount" placeholder="Amount" value={newExpense.amount} onChange={handleInputChange} /> */}
        {/* <textarea
        className="w-full mb-2 mt-4 rounded px-2 py-1 focus:outline-none border-2 focus:border-yellow-400 font-sans"
        name="description"
        placeholder="Description"
        value={newExpense.description}
        onChange={handleInputChange}
      /> */}
        <div className="mt-4 mb-4">
          <label
            for="description"
            class="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <MdOutlineDescription className="text-xl text-yellow-400 mr-1" />{" "}
            Description
          </label>
          <textarea
            id="description"
            onChange={handleInputChange}
            value={newExpense.description}
            name="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500  focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-sans"
            placeholder="Leave a description..."
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-yellow-500 flex items-center hover:bg-yellow-600 text-white font-semibold font-sans py-2 px-4 rounded mr-2"
            onClick={handleAddExpense}
          >
            <MdExplicit className="text-xl mr-1" />
            Add
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white font-semibold font-sans py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
