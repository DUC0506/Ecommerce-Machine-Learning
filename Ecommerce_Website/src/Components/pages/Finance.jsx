import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import {
  getOrder,
  getTotalOrders,
  getTotalSalesBySeller,
  orderStatus,
} from "../../api/order";
import NavbarAdmin from "../admin/shared/NavbarAdmin";
import { TbCurrencyDong } from "react-icons/tb";
import { IoCard } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { BsFillPlusSquareFill } from "react-icons/bs";
import CardCredit from "../admin/shared/CardCredit";
import { getTotalExpenses } from "../../api/expense";

export default function Finance() {
  const [recentOrders, setRecentOrders] = useState([{}]);
  const [hideModal, setHideModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);
  const [order, setOrder] = useState({});
  const [totalExpense, setTotalExpense] = useState(0);
  const { authInfo } = useAuth();
  const sellerId = authInfo.profile._id;

  //   const option1 = [
  //     { value: "Doanh thu thấp đến cao" },
  //     { value: "Doanh thu  cao đến thấp" },
  //   ];
  //   const option2 = [
  //     { value: "Khoảng thời gian" },
  //     { value: "1 tuần " },
  //     { value: "1 tháng" },
  //   ];
  //   const option3 = [
  //     { value: "Ngày đặt hàng" },
  //     { value: "Từ thấp đến cao" },
  //     { value: "Từ cao đến thấp" },
  //   ];
  const fetchRecentOrders = async () => {
    const { type, deliveredOrders } = await getTotalSalesBySeller(sellerId);
    if (type === "Success") {
      setRecentOrders(deliveredOrders);
      console.log(deliveredOrders);
    }
  };
  const handleInfo = async (id) => {
    const { type, order } = await getOrder(id);
    console.log(order);
    setOrder(order);
    setHideModal(true);
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log(newStatus);
    const { type, message } = await orderStatus(id, newStatus);
    if (type === "error") return message;
    console.log(message);
    fetchRecentOrders();
  };

  let time = new Date();
  // Tính tổng totalPrice của tất cả các đơn hàng
  console.log(recentOrders);
  let totalOrderPriceAll;
  if (recentOrders.length > 0) {
    totalOrderPriceAll = recentOrders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );
  } else {
    totalOrderPriceAll = 0;
  }
  const convertISOToDateFormat = (isoDateString, settlement) => {
    const date = new Date(isoDateString);
    const formattedDate = `${date.getDate() + (settlement ? 1 : 0)}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };
  const handleAddCreditCard = () => {
    setOpenCardModal(false);
  };
  const fetchTotalExpenses = async () => {
    const { type, totalExpense } = await getTotalExpenses();
    if (type === "Success") {
      setTotalExpense(totalExpense);
    }
  };

  useEffect(() => {
    fetchRecentOrders();
    fetchTotalExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white">
      <div className="w-full ">
        {/* <h2 className="font-sans text-2xl font-semibold">Số tiền rút</h2> */}
        <div className="flex w-full justify-between overflow-x-auto shadow-md rounded ">
          <div className=" rounded bg-white w-1/2 p-8 m-2">
            <p className="font-sans font-medium text-sm flex items-center">
              Updated data on date{" "}
              <p className=" ml-2 text-yellow-500 underline underline-offset-4">
                {" "}
                {time.toLocaleString()}
              </p>
            </p>
            <div className="font-sans font-medium text-xl">
              Available withdrawal amount
            </div>
            <div className="font-sans font-medium text-xl flex items-center justify-between mt-2">
              <div className="flex items-center">
                {totalOrderPriceAll * 0.98 - totalExpense} <TbCurrencyDong />{" "}
              </div>
              <div className="font-sans font-medium text-lg bg-yellow-400 hover:bg-yellow-500  py-2 px-4 rounded justify-center items-center cursor-pointer">
                Withdraw money
              </div>
            </div>
          </div>
          <div className="rounded bg-white w-1/2 p-8 m-2">
            <div className="font-sans font-medium text-xl mb-2 ">
              Bank account
            </div>
            <div className="font-sans font-normal text-normal flex items-center mt-2">
              {" "}
              <IoCard className="mr-1 text-xl" /> Bank account number{" "}
              <BsFillPlusSquareFill
                className="text-yellow-500 text-xl ml-2 cursor-pointer"
                onClick={() => setOpenCardModal(true)}
              />
            </div>
            <div
              className={`${
                openCardModal
                  ? "block  bg-white h-auto rounded  py-6 cursor-pointer z-10  "
                  : "hidden"
              }`}
            >
              <CardCredit addCreditCard={handleAddCreditCard} />
            </div>
          </div>
        </div>
        <div className="p-4 bg-white  mb-4 mt-2 cursor-pointer overflow-x-auto shadow-md rounded">
          <div className="text-xl font-medium font-sans mb-2">Settlement</div>
          <div className="flex w-full text-xs font-sans font-medium">
            <div className="w-1/6 font-sans font-semibold text-xl p-2 mr-2 rounded  hover:bg-yellow-200">
              Total settlement amount
              <div className="font-normal font-sans mt-4 text-sm">
                Last week/Last month
              </div>
            </div>
            <div className="w-1/6 font-sans font-medium p-2 mr-2 rounded text-2xl flex items-center justify-center  hover:bg-yellow-200">
              =
            </div>
            <div className="w-1/6 font-sans font-semibold text-xl p-2 mr-2 rounded  hover:bg-yellow-200">
              Total revenue
              <div className="font-normal font-sans mt-4 text-sm ">
                Last week/Last month
              </div>
            </div>
            <div className="w-1/6 font-sans font-medium p-2 mr-2 rounded text-2xl flex items-center justify-center  hover:bg-yellow-200 ">
              +
            </div>
            <div className="w-1/6 font-sans font-semibold text-xl p-2 mr-2 rounded  hover:bg-yellow-200">
              Total payment fee
              <div className="font-normal font-sans text-sm mt-4 ">
                Last week/Last month
              </div>
            </div>
          </div>
        </div>
        {/* <NavbarAdmin option1={option1} option2={option2} option3={option3} /> */}

        {/* <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
          <div className="flex bg-gray-200 mb-2 w-full">
            <div className="w-1/6 py-2 px-4 font-sans font-medium  items-center justify-center  flex ">
              ID
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">
              Order date
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">
                Settlement date
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium items-center justify-center flex">
                Payment amount
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">
              {" "}
             Revenue
            </div>
            <div className="w-1/6 py-2 px-4 font-sans font-medium justify-center items-center flex">
              Hành động
            </div>

           
          </div> */}
        {/* {recentOrders.map((order, index) => (
            <div
              key={order._id}
              className={`flex rounded w-full bg-slate-100  ${
                index !== 0 ? "mt-2" : ""
              }`}
            >
              <div className="w-1/6 font-sans font-medium flex p-4 items-center justify-center">
                {order._id}
              </div>
              <div className="w-1/6 font-sans font-medium justify-center flex p-4 items-center">
                {convertISOToDateFormat(order.createdAt)}
              </div>
              <div className="w-1/6 font-sans font-medium justify-center flex p-4 items-center">
                {convertISOToDateFormat(order.createdAt, 1)}
              </div>
              <div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">
                {order.totalPrice * 0.98}
                <TbCurrencyDong />{" "}
              </div>
              <div className="w-1/6 font-sans font-medium justify-center flex items-center p-4">
                {order.totalPrice}
                <TbCurrencyDong />{" "}
              </div>
              <div
                className="w-1/6  font-sans font-medium justify-center flex items-center  cursor-pointer "
                onClick={() => handleInfo(order._id)}
              >
                <div className="bg-yellow-400 py-2 px-4 rounded font-sans font-medium justify-center flex items-center  cursor-pointer">
                  {" "}
                  Xem chi tiết
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Order date
                </th>
                <th scope="col" class="px-6 py-3">
                  Settlement date
                </th>
                <th scope="col" class="px-6 py-3">
                  Payment amount
                </th>
                <th scope="col" class="px-6 py-3">
                  Revenue
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr
                  key={index}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans"
                  >
                    {order._id}
                  </th>
                  <td class="px-6 py-4 font-sans">
                    {" "}
                    {convertISOToDateFormat(order.createdAt)}
                  </td>
                  <td class="px-6 py-4 font-sans">
                    {convertISOToDateFormat(order.createdAt, 1)}
                  </td>
                  <td class="px-6 py-4 font-sans ">
                    <div className="flex items-center font-sans">
                      {order.totalPrice * 0.98}
                      <TbCurrencyDong />
                    </div>
                  </td>
                  <td class="px-6 py-4 r">
                    <div className="flex items-center font-sans">
                      {order.totalPrice}
                      <TbCurrencyDong />
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right font-sans">
                    <div
                      onClick={() => handleInfo(order._id)}
                      class="font-medium text-yellow-400  hover:underline cursor-pointer"
                    >
                      Detail
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={
            hideModal
              ? "absolute bg-white w-1/2 h-auto rounded top-1/3 right-10 p-6 cursor-pointer z-10 border-2 border-yellow-400 "
              : "hidden"
          }
        >
          <div className="flex justify-between">
            <h1 className="font-sans font-semibold text-2xl">
              Chi tiết quyết toán
            </h1>
            <ImCancelCircle
              className="text-yellow-400 text-xl "
              onClick={() => setHideModal(false)}
            />
          </div>
          <div className="flex w-full justify-between mt-4 border-t-2 border-yellow-400 pt-8 ">
            <div className="font-sans font-medium text-sm">
              <div className="font-sans">Ngày đặt hàng</div>
              <div className="mt-2 font-sans">
                {convertISOToDateFormat(order.createdAt)}
              </div>
            </div>
            <div className="font-sans font-medium text-sm">
              <div className=" font-sans">Ngày quyết toán</div>
              <div className="mt-2 font-sans">
                {convertISOToDateFormat(order.createdAt, 1)}
              </div>
            </div>
            <div className="font-sans font-medium text-sm ">
              <div className="font-sans flex justify-center">ID</div>
              <div className="mt-2 font-sans">{order._id}</div>
            </div>
          </div>
          <div className="flex justify-between  w-full border-b-2 border-yellow-400 pb-8">
            <div className="font-sans font-medium text-sm">
              <div className="mt-2 font-sans">Doanh thu</div>
              <div className="mt-2 font-sans flex items-center">
                {order.totalPrice}
                <TbCurrencyDong />{" "}
              </div>
            </div>
            <div className="font-sans font-medium text-sm">
              <div className="mt-2 font-sans">Phí</div>
              <div className="mt-2 font-sans flex items-center">
                {order.totalPrice * 0.02}
                <TbCurrencyDong />{" "}
              </div>
            </div>
            <div className="font-sans font-medium text-sm">
              <div className="mt-2 font-sans flex justify-center">
                Quyết toán
              </div>
              <div className="mt-2 font-sans flex items-center">
                {order.totalPrice * 0.98}
                <TbCurrencyDong />{" "}
              </div>
            </div>
          </div>
          <div className="flex  w-full">
            <div className="flex justify-between  w-full font-sans font-medium text-sm border-b-2 border-yellow-400 pb-6 pt-2 ">
              <div className="mt-2 font-sans">Tổng Doanh thu</div>
              <div className="mt-2 font-sans flex items-center">
                {order.totalPrice}
                <TbCurrencyDong />{" "}
              </div>
            </div>
          </div>
          <div className="  w-full border-b-2 border-yellow-400 pb-8">
            <div className="font-sans font-medium text-sm flex justify-between">
              <div className="mt-2 font-sans">Phí</div>
              <div className="mt-2 font-sans flex items-center">
                {order.totalPrice * 0.02}
                <TbCurrencyDong />{" "}
              </div>
            </div>
            <div className="flex justify-between  w-full font-sans font-medium text-sm">
              <div className=" ml-2 mt-2 font-sans">
                Phí hoa hồng cho nền tảng
              </div>
              <div className=" ml-2 mt-2 font-sans flex items-center">
                {order.totalPrice * 0.012}
                <TbCurrencyDong />{" "}
              </div>
            </div>
            <div className="flex justify-between font-sans font-medium text-sm">
              <div className=" ml-2 mt-2 font-sans">Phí hoa giao dịch</div>
              <div className=" ml-2 mt-2 font-sans flex items-center">
                {order.totalPrice * 0.008}
                <TbCurrencyDong />{" "}
              </div>
            </div>
          </div>
          <div className="flex  w-full">
            <div className="flex justify-between  w-full font-sans font-semibold text-xl border-b-2 border-yellow-400 pb-4">
              <div className="mt-2 font-sans">Tổng tiền quyết toán</div>
              <div className="mt-2 font-sans flex items-center">
                {order.totalPrice * 0.98}
                <TbCurrencyDong />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
