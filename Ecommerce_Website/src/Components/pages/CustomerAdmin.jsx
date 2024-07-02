import React, { useState, useEffect } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
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
  const handleSellerProduct = (id, role) => {
    if (role === "seller") {
      navigate(`/dashboard/sellers/seller-products/${id}`);
    }
  };

  return (
    <div className="h-full   bg-white">
      <div className=" mx-auto p-8  w-full h-full">
        <div className="flex justify-between mb-4 items-center ">
          <div>
            <h1 class="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
              Track your{" "}
              <span class="text-yellow-500 dark:text-blue-500">user's</span>{" "}
            </h1>
          </div>
          <button
            onClick={() => setAddUserModalOpen(true)}
            className="bg-yellow-400 text-white gap-2 px-4 py-2 rounded font-sans font-medium flex items-center"
          >
            <IoPersonAdd className="text-xl" /> Add user
          </button>
        </div>
        <div className="w-full">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  User name
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Role
                </th>
                <th scope="col" class="px-6 py-3">
                  Apartment
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Các dòng sản phẩm */}
              {users.map((user, index) => (
                <tr
                  key={index}
                  class="bg-white border-b cursor-pointer  hover:bg-gray-50 "
                  onClick={() => handleSellerProduct(user._id, user.role)}
                >
                  <th
                    scope="row"
                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div class="ps-3">
                      <div class="text-base font-semibold flex  justify-center items-center">
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-10 h-10 object-cover rounded-full  font-sans "
                        />
                        <span className=" ml-1 font-sans font-medium ">
                          {user.username}
                        </span>
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-4 font-sans font-medium  ">
                    {" "}
                    {user.name}
                  </td>
                  <td class="px-6 py-4 font-sans font-medium"> {user.email}</td>
                  <td class="px-6 py-4 font-sans font-medium"> {user.role}</td>
                  <td class="px-6 py-4 font-sans font-medium">
                    <div class="flex items-center">{user?.apartment?.name}</div>
                  </td>
                  <td class="px-6 py-4">
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
                  </td>
                </tr>
              ))}

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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerAdmin;
