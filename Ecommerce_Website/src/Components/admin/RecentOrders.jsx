import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../lib/helpers";
import { getTotalOrders, orderStatus } from "../../api/order";
import { TbCurrencyDong } from "react-icons/tb";

export default function RecentOrders({ number, sellerId }) {
  const [recentOrders, setRecentOrders] = useState([]);

  const fecthRecentOrders = async () => {
    const { type, orders } = await getTotalOrders(number, sellerId);
    if (type === "Success") {
      setRecentOrders(orders);
      console.log(orders);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log(newStatus);
    const { type, message } = await orderStatus(id, newStatus);
    if (type === "error") return message;
    console.log(message);
    fecthRecentOrders();
  };
  const convertISOToDateFormat = (isoDateString) => {
    const date = new Date(isoDateString);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };
  useEffect(() => {
    fecthRecentOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* <div className="w-full"> */}
      {/* Dòng tiêu đề */}
      {/* <div className="flex bg-gray-200 mb-2 w-full ">
					<div className="w-1/6 py-2 px-4 font-sans font-medium  items-center justify-center  flex ">Thời gian giao hàng</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Sản phẩm</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">Khách hàng</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">Ngày đặt </div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex"> Tổng tiền</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Địa chỉ</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">Trạng thái</div> */}
      {/* <div className="w-1/6 py-2 px-4 font-sans font-medium ">Hành động</div> */}
      {/* </div> */}
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 font-sans">
              Product name
            </th>
            <th scope="col" class="px-6 py-3 font-sans">
              Delivery time
            </th>
            <th scope="col" class="px-6 py-3 font-sans">
              User name
            </th>
            <th scope="col" class="px-6 py-3 font-sans">
              Order date
            </th>
            <th scope="col" class="px-6 py-3 font-sans">
              Price
            </th>
            <th scope="col" class="px-6 py-3 font-sans">
              Address
            </th>
            <th scope="col" class="px-6 py-3 font-sans">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order, index) => (
            <tr
              key={index}
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className=" flex items-center font-sans justify-between"
                  >
                    <div>
                      <div className="font-sans">{product.nameProduct}</div>
                      <div className="font-sans text-sm font-thin text-slate-400">
                        {product.selectedSize?.size}
                      </div>
                    </div>

                    <div className="text-sm font-sans text-slate-400">
                      x {product.totalProductQuantity}
                    </div>
                  </div>
                ))}
              </td>
              <td class="px-6 py-4 font-sans">{order.timeDelivery}</td>
              <td class="px-6 py-4 font-sans">{order.user?.username}</td>
              <td class="px-6 py-4 font-sans">
                {convertISOToDateFormat(order.createdAt)}
              </td>
              <td class="px-6 py-4 font-sans ">
                <div className="flex items-center font-sans">
                  {order.totalPrice}
                  <TbCurrencyDong className="text-yellow-400" />
                </div>
              </td>
              <td class="px-6 py-4 font-sans">
                {order.shippingAddress?.address}
              </td>
              <td class="px-6 py-4 font-sans">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className=" py-2  bg-yellow-500 rounded cursor-pointer"
                >
                  <option
                    value="Not Processed"
                    className="py-2 hover:bg-red-500"
                  >
                    Not Processed
                  </option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// {recentOrders.map((order, index) => (
// 	<div key={order._id} className={`flex rounded w-full bg-slate-100 cursor-pointer ${index !== 0 ? 'mt-2' : ''}`}>
// 		<div className="w-1/6 font-sans font-medium flex p-4 items-center underline underline-offset-2 text-yellow-500">{order.timeDelivery}</div>
// 		<div className="w-1/6 font-sans font-medium justify-center  p-4 items-center ">{order.products.map((product)=>(
// 			<div className=" flex items-center font-sans justify-between">
// 				<div>
// 					<div className='font-sans'>{product.nameProduct}</div>
// 					<div  className='font-sans text-sm font-thin text-slate-400'>{product.selectedSize?.size}</div>
// 				</div>

// 				<div className='text-sm font-sans text-slate-400'>x {product.totalProductQuantity}</div></div>

// 		))}</div>
// 		<div className="w-1/6 font-sans font-medium justify-center flex p-4 items-center ">{order.user?.username}</div>
// 		<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{convertISOToDateFormat(order.createdAt)} </div>
// 		<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{order.totalPrice}<TbCurrencyDong className='text-yellow-400' /> </div>
// 		<div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">{order.shippingAddress?.address} </div>
// 		<div className="w-1/6 font-sans font-medium  justify-center flex items-center py-4   ">
// 			<select
// 				value={order.status}
// 				onChange={(e) => handleStatusChange(order._id, e.target.value)}
// 				className=' py-2  bg-yellow-500 rounded cursor-pointer'
// 			>
// 				<option value="Not Processed" className='py-2 hover:bg-red-500'>Not Processed</option>
// 				<option value="Processing">Processing</option>
// 				<option value="Shipped">Shipped</option>
// 				<option value="Delivered">Delivered</option>
// 				<option value="Cancelled">Cancelled</option>
// 			</select>
// 		</div>
// 	</div>
// ))}
// </div>
