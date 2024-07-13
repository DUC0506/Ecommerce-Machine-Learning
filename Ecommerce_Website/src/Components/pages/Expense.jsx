import React, { useState, useEffect } from "react";
import {
  addExpense,
  getExpenseDetails,
  getExpenses,
  removeExpense,
} from "../../api/expense";
import { FaEdit, FaShippingFast } from "react-icons/fa";
import { MdDelete, MdOutlineExplicit } from "react-icons/md";
import { useNotification } from "../../hooks";
import ShippingModal from "./ShippingModal";
import SalesChart from "../admin/shared/SaleChart";
import ExpenseModal from "../admin/shared/ExpenseModal";
import UpdateExpenseModal from "../admin/shared/UpdateExpenseModal";
import NoItem from "../admin/shared/NoItem";

const Expense = () => {
  const { updateNotification } = useNotification();
  const [expenses, setExpenses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [modalShipOpen, setModalShipOpen] = useState(false);

  // const [newExpense, setNewExpense] = useState({
  //   name: "",
  //   typeExpense: "",
  //   amount: "",
  //   description: "",
  // });
  const [expense, setExpense] = useState({
    name: "",
    typeExpense: "",
    amount: "",
    description: "",
  });
  const handlePre = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  };
  const handleNext = () => {
    setPagination(pagination + 1);
  };
  useEffect(() => {
    // Load expenses when component mounts
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  console.log(expenses);
  const loadExpenses = async () => {
    const { type, expenses } = await getExpenses({ pagination });
    if (type === "Success") {
      setExpenses(expenses);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewExpense({ ...newExpense, [name]: value });
  // };

  const handleAddExpense = async (newExpense) => {
    const { type } = await addExpense(newExpense);

    if (type === "Success") {
      updateNotification("success", "Expense added successfully");
      loadExpenses();
      setModalOpen(false);
    }
  };
  const handleAddExpenseShip = async (info) => {
    const { type } = await addExpense(info);
    if (type === "Success") {
      updateNotification("success", "Expense ship added successfully");
      loadExpenses();
      setModalShipOpen(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    const { type } = await removeExpense(id);
    if (type === "Success") {
      updateNotification("success", "Delete expense successfully");
      loadExpenses();
    }
  };

  const handleOpenEdit = async (idExpense) => {
    const { type, expense } = await getExpenseDetails(idExpense);
    if (type === "Success") {
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
  return (
    <div className="container mx-auto p-4 bg-slate-50">
      <div className="p-4">
        <h1 class=" text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
          List of
          <span class=" ml-1 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            expense.
          </span>{" "}
        </h1>
        <h1 class="mb-4 mt-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          <mark class="px-2 text-white bg-yellow-400 rounded ">Help</mark>{" "}
          sellers in business strategy.
        </h1>
      </div>

      {expenses.length > 0 && expenses ? (
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
      ) : (
        ""
      )}
      <div className="flex md:justify-between flex-wrap gap-2 md:gap-0">
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

      {expenses.length === 0 && expenses && pagination === 1 ? (
        <NoItem
          title={"Welcome sellers to the expenses management page"}
          body={
            "This is the expense management page where you manage your business expenses. If you experience any difficulty managing your expenses, please contact us for assistance."
          }
        />
      ) : (
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
                {/* Thêm lớp hidden trên màn hình nhỏ */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans hidden sm:table-cell"
                >
                  Ngày tạo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans hidden sm:table-cell"
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense, index) => (
                <tr
                  key={expense._id}
                  onClick={() => handleOpenEdit(expense._id)}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-sans">
                    {expense.name}
                    <div className="sm:hidden text-xs text-gray-500 mt-1">
                      <div>Loại: {expense.typeExpense}</div>
                      <div>
                        Ngày: {convertISOToDateFormat(expense.createdAt)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-sans hidden sm:table-cell">
                    {expense.typeExpense}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-sans hidden sm:table-cell">
                    {convertISOToDateFormat(expense.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-sans hidden sm:table-cell">
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

          <div className="text-xs px-4 py-2">
            Page <strong>{pagination}</strong>
            <div class="flex mt-2">
              <div
                onClick={handlePre}
                class="flex mr-2 cursor-pointer items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </div>

              <div
                onClick={handleNext}
                class="flex cursor-pointer  items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      {modalOpen && (
        <ExpenseModal
          expense={handleAddExpense}
          onClose={() => setModalOpen(false)}
        />
      )}
      {modalUpdateOpen && (
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
