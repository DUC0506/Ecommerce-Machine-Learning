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
      <div className=" mx-auto p-8 relative w-full h-full">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-medium font-sans">
            Quản lý khu chung cư
          </h1>
          <button
            onClick={() => setAddApartmentModalOpen(true)}
            className="bg-yellow-400 text-white px-4 py-2 rounded font-sans font-medium"
          >
            Thêm Apartment
          </button>
        </div>
        <div>
          <div className="flex items-center space-x-4  ">
            <span className="font-sans  font-medium">Tất cả</span>
            <span className="font-sans  font-medium text-yellow-400 underline  underline-offset-8   ">
              Đang hoạt động
            </span>
            <span className="font-sans  font-medium">Bị hủy bỏ</span>
            <span className="font-sans  font-medium">Đang xét duyệt</span>
            <span className="font-sans  font-medium">Bị đình chỉ</span>
            <span className="font-sans  font-medium">Nháp</span>
            <span className="font-sans  font-medium">Đã xóa</span>
          </div>
        </div>

        <div className="mb-4 mt-4 font-sans border rounded flex flex-col md:flex-row md:justify-between pt-8 pb-8 pl-4 pr-4 bg-gray-200">
          <div className="w-full  mb-4 md:mb-0 mr-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full px-4 py-2 border rounded focus:outline-none hover:border-yellow-500"
              />
              <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                <IoSearchOutline />
              </span>
            </div>
          </div>
          <div className="w-full font-sans  md:w-auto flex space-x-4 ">
            <select className="w-full md:w-auto px-4 py-2 border rounded  cursor-pointer focus:outline-none hover:border-yellow-500 ">
              <option className="font-sans py-4  ">
                Số lượng tòa thấp đến cao
              </option>
              <option className="font-sans py-2 ">
                Số lượng tòa cao đến thấp
              </option>
            </select>
            <select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
              <option className="font-sans  ">Địa chỉ</option>

              {/* Thêm các lựa chọn loại sản phẩm vào đây */}
            </select>
            <select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
              <option className="font-sans p-4 hover:bg-yellow-500">
                Trạng thái
              </option>
              <option className="font-sans py-2  ">Cũ</option>
              <option className="font-sans py-2 ">Mới</option>
              {/* Thêm các lựa chọn loại sản phẩm vào đây */}
            </select>
          </div>
        </div>
        {apartments.map((apartment) => (
          <div
            key={apartment.id}
            className={
              isUpdateApartmentModalOpen || isAddApartmentModalOpen
                ? ` hidden `
                : `bg-white rounded-lg shadow-md p-6 mb-2 flex justify-between `
            }
          >
            <div>
              <h3 className="text-xl font-medium font-sans mb-2">
                {apartment.name}
              </h3>
              <p className="text-gray-600 mb-2">{apartment.address}</p>
            </div>

            <div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
              <button
                className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded"
                onClick={() => handleDeleteApartment(apartment._id)}
              >
                <MdDeleteForever />
              </button>
              <button
                className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded"
                onClick={() => handleInfo(apartment._id)}
              >
                <MdEdit />
              </button>
            </div>

            {/* Hiển thị các thông tin khác của apartment nếu cần */}
          </div>
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
      </div>
    </div>
  );
};

export default ApartmentDashboard;
