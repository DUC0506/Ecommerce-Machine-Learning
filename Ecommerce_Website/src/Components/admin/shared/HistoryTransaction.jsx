/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
// import { getCategory } from '../../../api/category';
import { IoSearchOutline } from "react-icons/io5";
// import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useParams } from "react-router-dom";
import { getAllOrders } from "../../../api/order";
import { getUser } from "../../../api/user";

const HistoryTransaction = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});
  let { id } = useParams();

  const fetchOrders = async () => {
    const { type, message, orders } = await getAllOrders(id);

    if (type === "Error") return message;
    setOrders(orders);
  };
  const fetchUser = async () => {
    const { type, message, user } = await getUser(id);

    if (type === "Error") return message;
    setUser(user);
  };

  useEffect(() => {
    fetchOrders();
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full ">
      <div className=" mx-auto p-8 relative w-full h-full">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-medium font-sans">{`Lịch sử giao dịch ${user.username}`}</h1>
          {/* <button className="bg-yellow-400 text-white px-4 py-2 rounded font-sans font-medium">
                Thêm người dùng
                </button> */}
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
                Số lượng thấp đến cao
              </option>
              <option className="font-sans py-2 ">Số lượng cao đến thấp</option>
            </select>
            <select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
              <option className="font-sans  ">Vận chuyển</option>
              <option className="font-sans  ">Chưa vận chuyển</option>
              <option className="font-sans  ">Đã vận chuyển</option>
              {/* Thêm các lựa chọn loại sản phẩm vào đây */}
            </select>
            <select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
              <option className="font-sans p-4 hover:bg-yellow-500">
                Trạng thái
              </option>
              <option className="font-sans py-2  ">Not Processed</option>
              <option className="font-sans py-2 ">Processing</option>
              <option className="font-sans py-2 ">Shipped</option>
              <option className="font-sans py-2 ">Delivered</option>
              <option className="font-sans py-2 ">Cancelled</option>
              {/* Thêm các lựa chọn loại sản phẩm vào đây */}
            </select>
          </div>
        </div>
        <div className="w-full">
          {/* Dòng tiêu đề */}
          <div className="flex bg-gray-200 mb-2 ">
            <div className="w-1/4 py-2 px-4 font-sans font-medium  items-center flex ">
              Tình trạng
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium   items-center flex">
              Số lượng{" "}
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">
              {" "}
              Phương thức thanh toán
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center  items-center flex">
              Thanh toán
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">
              Vận chuyển
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">
              Địa chỉ
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center  items-center flex">
              Tổng hóa đơn
            </div>
            {/* <div className="w-1/6 py-2 px-4 font-sans font-medium ">Hành động</div> */}
          </div>

          {/* Các dòng sản phẩm */}
          {orders.map((order, index) => (
            <div
              key={order._id}
              className={`flex rounded bg-white ${index !== 0 ? "mt-2" : ""}`}
            >
              <div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">
                {order.status}
              </div>
              <div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">
                {order.products.length}
              </div>
              <div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">
                {order.paymentMethod}
              </div>
              <div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">
                {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}{" "}
              </div>
              <div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">
                {order.isDelivered ? "Đã vận chuyển" : "Chưa vận chuyển"}{" "}
              </div>
              <div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">
                {order.shippingAddress.address +
                  " " +
                  order.shippingAddress.city}{" "}
              </div>
              <div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">
                {order.totalPrice}{" "}
              </div>
              {/* <div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
							<button onClick={() => handleDeleteUser(order._id)} className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded">
                            <MdDeleteForever />
							</button>
                            <button  onClick={() => handleInfo(order._id)} className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded">
                            <MdEdit />
							</button>
						</div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HistoryTransaction;
