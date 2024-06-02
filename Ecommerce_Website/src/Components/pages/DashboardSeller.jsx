import React, { useEffect, useState } from "react";

import RecentOrders from "../admin/RecentOrders";

import PopularProducts from "../admin/PopularProducts";
import { useAuth } from "../../hooks";
import TransactionChartSeller from "../admin/TransactionChartSeller";
import DashboardStatsGridSeller from "../admin/DashboardStatsGridSeller";
import SalesChart from "../admin/shared/SaleChart";
import { getPredict } from "../../api/predict";
import { getTotalSalesBySeller } from "../../api/order";

export default function DashboardSeller() {
  const { authInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [totalSale, setTotalSale] = useState(0);

  const fetchOrders = async () => {
    const { type, message, deliveredOrders, totalRevenue } =
      await getTotalSalesBySeller(authInfo.profile._id);
    if (type === "Success") {
      setTotalSale(totalRevenue);
      setOrders(deliveredOrders);
    }
  };
  const totalPriceByProduct = {};
  orders.forEach((order) => {
    order.products.forEach((product) => {
      const productId = product.nameProduct;
      const totalProductPrice = product.totalProductPrice;

      // Nếu sản phẩm đã tồn tại trong totalPriceByProduct, cập nhật tổng doanh thu
      if (totalPriceByProduct[productId]) {
        totalPriceByProduct[productId] += totalProductPrice;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào totalPriceByProduct
        totalPriceByProduct[productId] = totalProductPrice;
      }
    });
  });
  const labels2 = Object.keys(totalPriceByProduct);
  const data2 = Object.values(totalPriceByProduct);

  useEffect(() => {
    fetchOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGridSeller />

      <div className="flex flex-row gap-4 w-full">
        {/* <TransactionChartSeller /> */}
        {/* <div className=" mr-2 bg-slate-50 p-4 rounded shadow-md cursor-pointer mt-4"> */}
        <div className="w-4/6">
          <SalesChart
            labels={labels2}
            data={data2}
            label="Revenue by product"
            type="bar"
          />
        </div>
        <div className="w-2/6">
          <PopularProducts />
        </div>

        {/* </div> */}
      </div>

      <RecentOrders number={5} sellerId={authInfo.profile._id} />
    </div>
  );
}
