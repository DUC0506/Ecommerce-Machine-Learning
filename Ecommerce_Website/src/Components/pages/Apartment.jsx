import React, { useState, useEffect } from "react";
import {
  createApartment,
  getAllApartments,
  getApartment,
  removeApartment,
  updateApartment,
} from "../../api/apartment";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import UpdateApartmentModal from "../admin/shared/UpdateApartmentModal";
import AddApartmentModal from "../admin/shared/AddApartmentMode";
import { IoSearchOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
// Import hàm để lấy danh sách apartment từ API

const ApartmentDashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [apartment, setApartment] = useState();
  const [isUpdateApartmentModalOpen, setUpdateApartmentModalOpen] =
    useState(false);
  const [isAddApartmentModalOpen, setAddApartmentModalOpen] = useState(false);
  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const { type, message, apartments } = await getAllApartments();
      if (type === "Error") return message;
      setApartments(apartments);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };
  const handleInfo = async (apartmentId) => {
    const { type, message, apartment } = await getApartment(apartmentId);
    if (type === "Error") return message;
    setApartment(apartment);
    setUpdateApartmentModalOpen(true);
  };
  const handleDeleteApartment = async (apartmentId) => {
    const { type, message } = await removeApartment(apartmentId);
    if (type === "Error") return message;
    fetchApartments();
  };
  const handleUpdateApartment = async (apartment1) => {
    const id = apartment1._id;
    const { type, message } = await updateApartment(id, apartment1);
    if (type === "Error") return message;
    fetchApartments();
  };
  const handleAddApartment = async (newApartment) => {
    const { type, message } = await createApartment(newApartment);
    if (type === "Error") return message;
    fetchApartments();
  };

  return (
    <div className="h-full ">
      <div className=" mx-auto p-8  w-full h-full">
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
          <div>
            <h1 class="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
              Track your{" "}
              <span class="text-yellow-500 dark:text-blue-500">
                apartment's
              </span>{" "}
            </h1>
          </div>

          <div class="relative">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center pl-3 pointer-events-none"></div>
            <button
              onClick={() => setAddApartmentModalOpen(true)}
              className="bg-yellow-400 flex items-center rounded p-2 text-white font-sans font-semibold"
            >
              <BsPencilSquare className="text-xl mr-1" /> Add Apartment
            </button>
          </div>
        </div>
        <div>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                {/* <th scope="col" class="px-6 py-3">
                    Status
                  </th> */}
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment, index) => (
                // <div
                //   key={apartment.id}
                //   className={
                //     isUpdateApartmentModalOpen || isAddApartmentModalOpen
                //       ? ` hidden `
                //       : `bg-white rounded-lg shadow-md p-6 mb-2 flex justify-between `
                //   }
                // >
                //   <div>
                //     <h3 className="text-xl font-medium font-sans mb-2">
                //       {apartment.name}
                //     </h3>
                //     <p className="text-gray-600 mb-2">{apartment.address}</p>
                //   </div>

                //   <div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
                //     <button
                //       className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded"
                //       onClick={() => handleDeleteApartment(apartment._id)}
                //     >
                //       <MdDeleteForever />
                //     </button>
                //     <button
                //       className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded"
                //       onClick={() => handleInfo(apartment._id)}
                //     >
                //       <MdEdit />
                //     </button>
                //   </div>

                //   {/* Hiển thị các thông tin khác của apartment nếu cần */}
                // </div>
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
                        {apartment.name}
                      </div>
                      <div class="font-normal text-gray-500">
                        {apartment.name}
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4">{apartment.address}</td>
                  {/* <td class="px-6 py-4">
             <div class="flex items-center">
               <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
               {s.typeOfViolation}
             </div>
           </td> */}
                  <td class="px-6 py-4">
                    <button
                      className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded"
                      onClick={() => handleDeleteApartment(apartment._id)}
                    >
                      {" "}
                      <MdDeleteForever />
                    </button>
                    <button
                      className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded"
                      onClick={() => handleInfo(apartment._id)}
                    >
                      <MdEdit />
                    </button>
                  </td>
                </tr>
              ))}
              <AddApartmentModal
                isOpen={isAddApartmentModalOpen}
                onRequestClose={() => setAddApartmentModalOpen(false)}
                onAddApartment={handleAddApartment}
              />
              {apartment && (
                <UpdateApartmentModal
                  isOpen={isUpdateApartmentModalOpen}
                  onRequestClose={() => setUpdateApartmentModalOpen(false)}
                  apartment={{ ...apartment }}
                  onUpdateApartment={handleUpdateApartment}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDashboard;
