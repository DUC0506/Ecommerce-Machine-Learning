import React, { useEffect, useState } from "react";
import DashboardStatsGrid from "../admin/DashboardStatsGrid";
import TransactionChart from "../admin/TransactionChart";
import RecentOrders from "../admin/RecentOrders";
import chartGif from "../../assets/chart2.gif";
import PopularProducts from "../admin/PopularProducts";
import { getTotalOrders } from "../../api/order";
import SalesChart from "../admin/shared/SaleChart";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const fetchTotalOrders = async () => {
    const { type, orders } = await getTotalOrders();
    if (type === "error") return type;
    setOrders(orders);
  };
  const totalPriceByProduct = {};
  orders.forEach((order) => {
    order.products.forEach((product) => {
      const productId = product.nameProduct;
      const totalProductPrice = product.totalProductPrice;

      if (totalPriceByProduct[productId]) {
        totalPriceByProduct[productId] += totalProductPrice;
      } else {
        totalPriceByProduct[productId] = totalProductPrice;
      }
    });
  });
  const labels2 = Object.keys(totalPriceByProduct);
  const data2 = Object.values(totalPriceByProduct);
  useEffect(() => {
    fetchTotalOrders();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        {/* <TransactionChartSeller /> */}
        {/* <div className=" mr-2 bg-slate-50 p-4 rounded shadow-md cursor-pointer mt-4"> */}
        <div className="w-4/6">
          {data2.length > 0 && data2 ? (
            <SalesChart
              labels={labels2}
              data={data2}
              label="Revenue by product in all apartments"
              type="bar"
            />
          ) : (
            <div className="bg-white flex items-center justify-center">
              <img src={chartGif} alt="chart" className="" />
            </div>
          )}
        </div>
        <div className="w-2/6">
          <PopularProducts />
        </div>

        {/* </div> */}
      </div>

      <RecentOrders number={5} />
    </div>
  );
}
