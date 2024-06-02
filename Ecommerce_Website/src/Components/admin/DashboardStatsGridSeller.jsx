import React, { useEffect, useState } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import {
  getTotalOrders,
  getTotalSales,
  getTotalSalesBySeller,
} from "../../api/order";
import { getSellers } from "../../api/user";
import { TbCurrencyDong } from "react-icons/tb";
import { useAuth } from "../../hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { getTotalExpenses } from "../../api/expense";
export default function DashboardStatsGridSeller() {
  const [recentOrders, setRecentOrders] = useState([{}]);
  const [totalUsers, setTotalUsers] = useState([{}]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const { authInfo } = useAuth();
  const fetchRecentOrders = async () => {
    const { type, deliveredOrders } = await getTotalSalesBySeller(
      authInfo.profile._id
    );
    if (type === "Success") {
      setRecentOrders(deliveredOrders);
      console.log(deliveredOrders);
    }
  };
  let totalOrderPriceAll;
  if (recentOrders.length > 1) {
    totalOrderPriceAll = recentOrders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );
  } else {
    totalOrderPriceAll = 0;
  }
  console.log(recentOrders);

  const fetchTotalUsers = async () => {
    const { type, users } = await getSellers();
    if (type === "error") return type;
    setTotalUsers(users);
  };
  const fetchTotalOrders = async () => {
    const { type, orders } = await getTotalOrders(null, authInfo.profile._id);
    if (type === "error") return type;
    setTotalOrders(orders);
  };
  const fetchTotalExpenses = async () => {
    const { type, totalExpense } = await getTotalExpenses();
    if (type === "Success") {
      setTotalExpense(totalExpense);
    }
  };
  useEffect(() => {
    fetchRecentOrders();
    fetchTotalUsers();
    fetchTotalOrders();
    fetchTotalExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-4">
      {/* <BoxWrapper >
				<div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4 cursor-pointer">
					<span className="text-sm text-gray-500 font-sans font-normal">Total Sales</span>
					<div className="flex items-center cursor-pointer">
						<strong className="text-xl text-gray-700 font-semibold font-sans">{totalOrderPriceAll}</strong>
						<span className="text-xl text-yellow-500 pl-2"><TbCurrencyDong /></span>
					</div>
				</div>
			</BoxWrapper> */}
      <Card x-chunk="dashboard-01-chunk-0" className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-sans">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center font-sans">
            {totalOrderPriceAll}
            <TbCurrencyDong className="text-yellow-400" />
          </div>
          <p className="text-xs text-muted-foreground font-sans">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-0" className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-sans">
            Total Expenses
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-sans  flex items-center">
            {totalExpense} <TbCurrencyDong className="text-yellow-400" />
          </div>
          <p className="text-xs text-muted-foreground font-sans">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-0" className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-sans">
            {" "}
            Total Customer
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-sans">
            {" "}
            {totalUsers?.length}
          </div>
          <p className="text-xs text-muted-foreground font-sans">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-0" className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-sans">
            {" "}
            Total Orders
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-sans">
            {totalOrders?.length}
          </div>
          <p className="text-xs text-muted-foreground font-sans">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      {/* <BoxWrapper>
        <div className="rounded-full cursor-pointer h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4 cursor-pointer">
          <span className="text-sm text-gray-500  font-sans font-normal">
            Total Expenses
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold font-sans">
              3423
            </strong>
            <span className="text-xl text-yellow-500 pl-2">
              <TbCurrencyDong />
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
            Total Customer
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
      </BoxWrapper> */}
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
