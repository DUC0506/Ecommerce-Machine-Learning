import React, { useEffect, useState } from "react";
// import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import {
  getAllTotalSalesBySeller,
  getTotalOrders,
  // getTotalSales,
} from "../../api/order";
import { getSellers } from "../../api/user";
import { TbCurrencyDong } from "react-icons/tb";
import { useAuth } from "../../hooks";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { getTotalExpenses } from "../../api/expense";
import { formatCurrency } from "../../utils/hepler";
export default function DashboardStatsGridSeller() {
  const [recentOrders, setRecentOrders] = useState();
  const [totalUsers, setTotalUsers] = useState([{}]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const { authInfo } = useAuth();
  const fetchRecentOrders = async () => {
    const { type, totalRevenue } = await getAllTotalSalesBySeller(
      authInfo.profile._id
    );
    if (type === "Success") {
      setRecentOrders(totalRevenue);
      console.log(totalRevenue);
    }
  };

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
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      <Card x-chunk="dashboard-01-chunk-0" className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-sans">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center font-sans">
            {formatCurrency(recentOrders)}
            <TbCurrencyDong className="text-yellow-400" />
          </div>
          <p className="text-xs text-muted-foreground font-sans">
            {recentOrders > 0 ? " +2.1% from last month" : ""}
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-0" className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-sans">
            Total Expenses
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-sans  flex items-center">
            {formatCurrency(totalExpense)}{" "}
            <TbCurrencyDong className="text-yellow-400" />
          </div>
          <p className="text-xs text-muted-foreground font-sans">
            {totalExpense > 0 ? " +12.1% from last month" : ""}
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-0" className="col-span-1">
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
            {totalUsers?.length > 0 ? " +20% from last month" : ""}
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-0" className="col-span-1">
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
            {totalOrders?.length > 0 ? " +8% from last month" : ""}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// function BoxWrapper({ children }) {
//   return (
//     <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
//       {children}
//     </div>
//   );
// }
