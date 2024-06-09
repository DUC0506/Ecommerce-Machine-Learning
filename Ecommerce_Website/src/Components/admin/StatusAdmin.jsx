import { useEffect } from "react";
import {
  addStatus,
  getStatus,
  getStatuses,
  updateStatus,
} from "../../api/status";
import React, { useState } from "react";
import AddStatusModal from "./shared/AddStatusModal";
import UpdateStatusModal from "./shared/UpdateStatusModal";
import { BsPencilSquare } from "react-icons/bs";
import NoItem from "./shared/NoItem";

export default function StatusAdmin({ isSeller }) {
  const [status, setStatus] = useState([]);
  const [statusInfo, setStatusInfo] = useState({});
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const fetchStatuses = async () => {
    const { type, statuses } = await getStatuses();
    if (type === "Success") {
      setStatus(statuses);
    }
  };

  const handleAddStatus = async (data) => {
    const { type, status } = await addStatus(data);
    if (type === "Success") {
      console.log(status);
      fetchStatuses();
    }
  };
  const handleOpenStatusModal = () => {
    console.log(1);
    setIsOpenAddModal(true);
  };
  const handleGetStatus = async (id) => {
    console.log(id);
    const { type, status } = await getStatus(id);
    if (type === "Success") {
      console.log(status);
      setStatusInfo(status);
    }
    setIsOpenUpdateModal(true);
  };
  const handleUpdateStatus = async (body, id) => {
    console.log(body, id);
    const { type, status } = await updateStatus(body, id);
    if (type === "Success") {
      console.log(status);
      fetchStatuses();
    }
  };
  useEffect(() => {
    fetchStatuses();
  }, []);
  return (
    <div>
      <AddStatusModal
        isOpen={isOpenAddModal}
        isClose={() => setIsOpenAddModal(false)}
        submit={handleAddStatus}
      />
      <UpdateStatusModal
        isOpen={isOpenUpdateModal}
        isClose={() => setIsOpenUpdateModal(false)}
        status={statusInfo}
        updateStatus={handleUpdateStatus}
        isSeller={isSeller}
      />
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
          <div>
            <h1 class="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
              Track your{" "}
              <span class="text-yellow-500 dark:text-blue-500">
                seller's status
              </span>{" "}
            </h1>
          </div>

          {isSeller ? (
            ""
          ) : (
            <div class="relative">
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center pl-3 pointer-events-none"></div>
              <button
                onClick={handleOpenStatusModal}
                className="bg-yellow-400 flex items-center rounded p-2 text-white font-sans font-semibold"
              >
                <BsPencilSquare className="text-xl mr-1" /> Add Status
              </button>
            </div>
          )}
        </div>

        {status.length > 0 && status ? (
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
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {status.map((s, index) => (
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
                          {s.seller.username}
                        </div>
                        <div class="font-normal text-gray-500">
                          {s.seller.email}
                        </div>
                      </div>
                    </th>
                    <td class="px-6 py-4">{s.seller.apartment.name}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
                        {s.typeOfViolation}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        onClick={() => handleGetStatus(s._id)}
                        class="font-medium text-yellow-600  hover:underline cursor-pointer"
                      >
                        {isSeller ? "View" : " Edit status"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs px-4 py-2">
              Page <strong>1</strong>
              <div class="flex mt-2">
                <div class="flex mr-2 cursor-pointer items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Previous
                </div>

                <div class="flex cursor-pointer  items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NoItem
            title={"Welcome sellers to your store status tracking page"}
            body={
              "You will be able to monitor the seller status if there are complaints or reports from customers or platform managers."
            }
          />
        )}
      </div>
    </div>
  );
}
