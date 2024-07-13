import {
  getTransactions,
  updateStatusTransactions,
} from "../../api/transaction";
import React, { useEffect, useState } from "react";
import NoItem from "./shared/NoItem";

export default function TransactionsFinance() {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(1);
  const fetchTransactions = async () => {
    const { type, transactions } = await getTransactions(pagination);
    if (type === "Success") {
      console.log(transactions);
      setTransactions(transactions);
    }
  };
  const handlePre = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  };
  const handleNext = () => {
    setPagination(pagination + 1);
  };
  const handleStatusChange = async (e, id) => {
    const { value } = e.target;
    const body = {
      status: value,
    };
    console.log(body, id);
    const { type } = await updateStatusTransactions(id, body);
    if (type === "Success") {
      fetchTransactions();
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [pagination]);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
        <div>
          <h1 class="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
            Track your{" "}
            <span class="text-yellow-500 dark:text-blue-500">
              admin's transaction
            </span>{" "}
          </h1>
        </div>
      </div>

      {transactions.length > 0 && transactions ? (
        <div>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Position
                </th>
                <th scope="col" class="px-6 py-3">
                  Type
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((s, index) => (
                <tr
                  key={index}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="ps-3">
                      <div class="text-base font-semibold">
                        {s.user.username}
                      </div>
                      <div class="font-normal text-gray-500">
                        {s.user.email}
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4">{s.user.apartment.name}</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">{s.type}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      {" "}
                      {new Date(s.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center ">
                      <select
                        id="default"
                        value={s.status}
                        onChange={(e) => {
                          handleStatusChange(e, s._id);
                        }}
                        class="bg-gray-50 border outline-yellow-500 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block  p-2.5 "
                      >
                        <option selected>Choose status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
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
      ) : (
        <NoItem
          title={"Welcome admin to your store transaction tracking page"}
          body={
            "You will be able to monitor the admin transaction if there are complaints or reports from customers or platform managers."
          }
        />
      )}
    </div>
  );
}
