import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  addExpense,
  getExpenseDetails,
  getExpenses,
  removeExpense,
} from "../../api/expense";
import { FaEdit, FaShippingFast } from "react-icons/fa";
import {
  MdDelete,
  MdOutlineDescription,
  MdOutlineExplicit,
} from "react-icons/md";
import { useNotification } from "../../hooks";
import ShippingModal from "./ShippingModal";
import { MdExplicit } from "react-icons/md";
import SalesChart from "../admin/shared/SaleChart";
import ExpenseModal from "../admin/shared/ExpenseModal";
import UpdateExpenseModal from "../admin/shared/UpdateExpenseModal";

const Expense = () => {
  const { updateNotification } = useNotification();
  const [expenses, setExpenses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalShipOpen, setModalShipOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    name: "",
    typeExpense: "",
    amount: "",
    description: "",
  });
  const [expense, setExpense] = useState({
    name: "",
    typeExpense: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    // Load expenses when component mounts
    loadExpenses();
  }, []);

  console.log(expenses);
  const loadExpenses = async () => {
    const { type, message, expenses } = await getExpenses();
    if (type === "Success") {
      console.log(expenses);
      setExpenses(expenses);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = async (newExpense) => {
    const { type, message, expense } = await addExpense(newExpense);
    if (type === "Success") {
      loadExpenses();
      setModalOpen(false);
    }
  };
  const handleAddExpenseShip = async (info) => {
    const { type, message, expense } = await addExpense(info);
    if (type === "Success") {
      loadExpenses();
      setModalShipOpen(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    const { type, message, expense } = await removeExpense(id);
    if (type === "Success") {
      updateNotification("success", "Xóa phiếu chi phí thành công");
      loadExpenses();
    }
  };

  const handleEditExpense = async () => {};
  const handleOpenEdit = async (idExpense) => {
    const { type, message, expense } = await getExpenseDetails(idExpense);
    if (type === "Success") {
      console.log(expense);
      setExpense(expense);
      setModalUpdateOpen(true);
    }
  };
  const convertISOToDateFormat = (isoDateString) => {
    const date = new Date(isoDateString);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };
  const uniqueTypeExpenses = [
    ...new Set(expenses.map((expense) => expense.typeExpense)),
  ];

  // Tạo mảng label từ uniqueTypeExpenses
  const labels = uniqueTypeExpenses;
  console.log(labels);

  // Tạo mảng data là tổng amount của mỗi typeExpense
  const data = uniqueTypeExpenses.map((typeExpense) =>
    expenses.reduce(
      (total, expense) =>
        expense.typeExpense === typeExpense ? total + expense.amount : total,
      0
    )
  );
  const labels1 = expenses.map((expense) =>
    convertISOToDateFormat(expense.createdAt)
  );

  // Lấy mảng data từ thuộc tính amount của mỗi expense
  const data1 = expenses.map((expense) => expense.amount);
  console.log(data);
  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <h1 className="text-2xl font-bold mb-4 font-sans">Expense Tracker</h1>
      <div className="flex rounded shadow-md mb-4">
        <div className="w-2/3">
          <SalesChart labels={labels1} data={data1} label="Chi phí" />
        </div>
        <div className="w-1/3">
          <SalesChart
            labels={labels}
            data={data}
            label="Doanh thu theo sản phẩm"
            type="doughnut"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 font-sans text-white font-semibold py-2 px-4 mb-4 rounded flex items-center"
          onClick={() => setModalShipOpen(true)}
        >
          <FaShippingFast className=" text-xl mr-1" /> Shipping Service
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 mb-4 rounded font-sans flex items-center"
          onClick={() => setModalOpen(true)}
        >
          <MdOutlineExplicit className=" text-xl mr-1" /> Add Expense
        </button>
      </div>
      <div className="overflow-x-auto rounded shadow-md cursor-pointer mt-4 ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans"
              >
                Tên chi phí
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans"
              >
                Loại chi phí
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans"
              >
                Ngày tạo
              </th>
              {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense, index) => (
              <tr
                key={expense._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap font-sans">
                  {expense.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-sans">
                  {expense.typeExpense}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-sans">
                  {convertISOToDateFormat(expense.createdAt)}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 mr-2 rounded font-sans"
                    onClick={() => handleOpenEdit(expense._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteExpense(expense._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {modalOpen && (
        // <div className="fixed inset-0 flex items-center justify-center w-full bg-gray-500 bg-opacity-50">
        //   <div className="bg-white p-4 rounded w-1/2">
        //     <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
        //     <div className="flex">
        //       <div class="relative w-1/2 mr-2">
        //         <input
        //           type="text"
        //           id="name"
        //           name="name"
        //           value={newExpense.name}
        //           onChange={handleInputChange}
        //           class="block px-2.5 pb-2.5 pt-4 w-full font-sans text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-yellow-400 focus:ring-0 focus:border-yellow-500 peer"
        //           placeholder=" "
        //         />
        //         <label
        //           for="name"
        //           class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        //         >
        //           Expense name
        //         </label>
        //       </div>
        //       {/* <input className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        //       type="text" name="name" placeholder="Name" value={newExpense.name} onChange={handleInputChange} /> */}
        //       <div class="relative w-1/2 ml-2">
        //         <input
        //           type="text"
        //           id="typeExpense"
        //           name="typeExpense"
        //           value={newExpense.typeExpense}
        //           onChange={handleInputChange}
        //           class="block px-2.5 pb-2.5 pt-4 w-full font-sans text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-yellow-400 focus:ring-0 focus:border-yellow-500 peer"
        //           placeholder=" "
        //         />
        //         <label
        //           for="typeExpense"
        //           class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        //         >
        //           Type expense{" "}
        //         </label>
        //       </div>
        //     </div>
        //     {/* <input className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        //       type="text" name="typeExpense" placeholder="Type" value={newExpense.typeExpense} onChange={handleInputChange} /> */}
        //     <div class="relative mt-4 w-1/2 mr-2">
        //       <input
        //         type="number"
        //         id="amount"
        //         name="amount"
        //         value={newExpense.amount}
        //         onChange={handleInputChange}
        //         class="block px-2.5 pb-2.5 pt-4 w-full font-sans text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-yellow-400 focus:ring-0 focus:border-yellow-500 peer"
        //         placeholder=" "
        //       />
        //       <label
        //         for="amount"
        //         class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-yellow-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        //       >
        //         Amount expense{" "}
        //       </label>
        //     </div>
        //     {/* <input className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        //       type="number" name="amount" placeholder="Amount" value={newExpense.amount} onChange={handleInputChange} /> */}
        //     {/* <textarea
        //       className="w-full mb-2 mt-4 rounded px-2 py-1 focus:outline-none border-2 focus:border-yellow-400 font-sans"
        //       name="description"
        //       placeholder="Description"
        //       value={newExpense.description}
        //       onChange={handleInputChange}
        //     /> */}
        //     <div className="mt-4 mb-4">
        //       <label
        //         for="description"
        //         class="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
        //       >
        //         <MdOutlineDescription className="text-xl text-yellow-400 mr-1" />{" "}
        //         Description
        //       </label>
        //       <textarea
        //         id="description"
        //         onChange={handleInputChange}
        //         value={newExpense.description}
        //         name="description"
        //         rows="4"
        //         class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-yellow-500  focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-sans"
        //         placeholder="Leave a description..."
        //       ></textarea>
        //     </div>
        //     <div className="flex justify-end">
        //       <button
        //         className="bg-yellow-500 flex items-center hover:bg-yellow-700 text-white font-semibold font-sans py-2 px-4 rounded mr-2"
        //         onClick={handleAddExpense}
        //       >
        //         <MdExplicit className="text-xl mr-1" />
        //         Add Expense
        //       </button>
        //       <button
        //         className="bg-gray-400 hover:bg-gray-600 text-white font-semibold font-sans py-2 px-4 rounded"
        //         onClick={() => setModalOpen(false)}
        //       >
        //         Cancel
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <ExpenseModal
          expense={handleAddExpense}
          onClose={() => setModalOpen(false)}
        />
      )}
      {modalUpdateOpen && (
        // <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        //   <div className="bg-white p-4 rounded">
        //     <h2 className="text-lg font-semibold mb-4">
        //       Thông tin chi tiết chi phí
        //     </h2>
        //     <input
        //       className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        //       type="text"
        //       name="name"
        //       placeholder="Name"
        //       value={expense.name}
        //       onChange={handleInputChange}
        //     />
        //     <input
        //       className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        //       type="text"
        //       name="typeExpense"
        //       placeholder="Type"
        //       value={expense.typeExpense}
        //       onChange={handleInputChange}
        //     />
        //     <input
        //       className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        //       type="number"
        //       name="amount"
        //       placeholder="Amount"
        //       value={expense.amount}
        //       onChange={handleInputChange}
        //     />
        //     <textarea
        //       className="w-full mb-2 border border-gray-400 rounded px-2 py-1"
        //       name="description"
        //       placeholder="Description"
        //       value={expense.description}
        //       onChange={handleInputChange}
        //     />
        //     <div className="flex justify-end">
        //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        //         Lưu
        //       </button>
        //       <button
        //         className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        //         onClick={() => setModalUpdateOpen(false)}
        //       >
        //         Thoát
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <UpdateExpenseModal
          expense={expense}
          onClose={() => setModalUpdateOpen(false)}
        />
      )}
      <ShippingModal
        isOpen={modalShipOpen}
        onClose={() => setModalShipOpen(false)}
        expenseShip={handleAddExpenseShip}
      />
    </div>
  );
};

export default Expense;
