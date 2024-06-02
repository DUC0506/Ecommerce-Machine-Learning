import React, { useEffect, useState } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { getTotalOrders, getTotalSales } from "../../api/order";
import { getSellers } from "../../api/user";
import { TbCurrencyDong } from "react-icons/tb";
import { getAllApartments } from "../../api/apartment";
import { MdApartment } from "react-icons/md";

export default function DashboardStatsGrid() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalUsers, setTotalUsers] = useState([{}]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [apartments, setApartments] = useState();
  const fetchTotalSales = async () => {
    const { type, totalRevenue } = await getTotalSales();
    if (type === "error") return type;
    setTotalSales(totalRevenue);
  };
  const fetchTotalUsers = async () => {
    const { type, users } = await getSellers();
    if (type === "error") return type;
    setTotalUsers(users);
  };
  const fetchTotalOrders = async () => {
    const { type, orders } = await getTotalOrders();
    if (type === "error") return type;
    setTotalOrders(orders);
  };
  const fetchApartments = async () => {
    try {
      const { type, message, apartments } = await getAllApartments();
      if (type === "Error") return message;
      console.log(apartments);
      console.log(apartments.length); // Gọi hàm API để lấy danh sách apartment
      setApartments(apartments.length);
      // Cập nhật state apartments với dữ liệu apartment lấy được từ API
    } catch (error) {
      console.error("Error fetching apartments:", error);
      // Xử lý lỗi khi gọi API nếu cần
    }
  };
  useEffect(() => {
    fetchTotalSales();
    fetchTotalUsers();
    fetchTotalOrders();
    fetchApartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4 cursor-pointer">
          <span className="text-sm text-gray-500 font-sans font-normal">
            Total Sales
          </span>
          <div className="flex items-center cursor-pointer">
            <strong className="text-xl text-gray-700 font-semibold font-sans">
              {totalSales}
            </strong>
            <span className="text-xl text-yellow-500 pl-2">
              <TbCurrencyDong />
            </span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4 cursor-pointer">
          <span className="text-sm text-gray-500  font-sans font-normal">
            Total Apartment
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold font-sans">
              {apartments}
            </strong>
            <span className="text-xl text-yellow-500 pl-2">
              <MdApartment />
            </span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4 cursor-pointer">
          <span className="text-sm text-gray-500 font-normal font-sans">
            Total Seller
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold font-sans">
              {totalUsers?.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper className="rounded">
        <div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4 cursor-pointer">
          <span className="text-sm text-gray-500 font-normal font-sans">
            Total Orders
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold font-sans">
              {totalOrders?.length}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
