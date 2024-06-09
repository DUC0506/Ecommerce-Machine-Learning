import React, { useState, useEffect } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import {
  createUser,
  getUser,
  getUsers,
  removeUser,
  updateUser,
} from "../../api/user";
import UpdateUserModal from "../admin/shared/UpdateUserModal";
import AddUserModal from "../admin/shared/AddUserModal";
import { useNavigate } from "react-router-dom";
// Import hàm để lấy danh sách apartment từ API

const CustomerAdmin = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [isUpdateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // Gọi API để lấy danh sách apartment khi component được render
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { type, message, users } = await getUsers();
      if (type === "Error") return message;
      console.log(users); // Gọi hàm API để lấy danh sách apartment
      setUsers(users); // Cập nhật state apartments với dữ liệu apartment lấy được từ API
    } catch (error) {
      console.error("Error fetching apartments:", error);
      // Xử lý lỗi khi gọi API nếu cần
    }
  };
  const handleInfo = async (userId) => {
    const { type, message, user } = await getUser(userId);
    if (type === "Error") return message;
    setUser(user);
    setUpdateUserModalOpen(true);
  };
  const handleDeleteUser = async (apartmentId) => {
    const { type, message } = await removeUser(apartmentId);
    if (type === "Error") return message;
    fetchUsers();
  };
  const handleUpdateUser = async (user1) => {
    console.log(user1);
    const id = user1._id;
    const { type, message } = await updateUser(id, user1);
    if (type === "Error") return message;
    fetchUsers();
  };
  const handleAddUser = async (newUser) => {
    console.log(newUser);
    const { type, message } = await createUser(newUser);
    if (type === "Error") return message;
    fetchUsers();
  };
  const handleNavigate = (id) => {
    navigate(`history-transactions/${id}`);
  };

  return (
    <div className="h-full ">
      <div className=" mx-auto p-8 relative w-full h-full">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-medium font-sans">Quản lý người dùng</h1>
          <button
            onClick={() => setAddUserModalOpen(true)}
            className="bg-yellow-400 text-white px-4 py-2 rounded font-sans font-medium"
          >
            Thêm người dùng
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
        <div className="w-full">
          {/* Dòng tiêu đề */}
          <div className="flex bg-gray-200 mb-2 ">
            <div className="w-1/4 py-2 px-4 font-sans font-medium justify-center flex ">
              User
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">
              User name
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">
              Email
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">
              role
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">
              Chung cư
            </div>

            <div className="w-1/6 py-2 px-4 font-sans font-medium ">
              Hành động
            </div>
          </div>

          {/* Các dòng sản phẩm */}
          {users.map((user, index) => (
            <div
              key={user._id}
              className={`flex rounded cursor-pointer bg-white ${
                index !== 0 ? "mt-2" : ""
              }`}
            >
              <div
                onClick={() => {
                  handleNavigate(user._id);
                }}
                className="w-1/4  p-4 flex items-center space-x-4 cursor-pointer"
              >
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-10 h-10 object-cover  font-sans "
                />
                <span className=" font-sans font-medium ">{user.name}</span>
              </div>
              <div
                onClick={() => {
                  handleNavigate(user._id);
                }}
                className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center"
              >
                {user.username}
              </div>
              <div
                onClick={() => {
                  handleNavigate(user._id);
                }}
                className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center"
              >
                {user.email}
              </div>
              <div
                onClick={() => {
                  handleNavigate(user._id);
                }}
                className="w-1/6  font-sans font-medium justify-center flex items-center  p-4"
              >
                {user.role}{" "}
              </div>
              <div
                onClick={() => {
                  handleNavigate(user._id);
                }}
                className="w-1/6  font-sans font-medium justify-center flex items-center  p-4"
              >
                {user?.apartment?.name}{" "}
              </div>
              <div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded"
                >
                  <MdDeleteForever />
                </button>
                <button
                  onClick={() => handleInfo(user._id)}
                  className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded"
                >
                  <MdEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onRequestClose={() => setAddUserModalOpen(false)}
          onAddUser={handleAddUser}
        />
        {user && (
          <UpdateUserModal
            isOpen={isUpdateUserModalOpen}
            onRequestClose={() => setUpdateUserModalOpen(false)}
            user={{ ...user }}
            onUpdateUser={handleUpdateUser}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerAdmin;
