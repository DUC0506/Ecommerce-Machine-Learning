import React, { useEffect, useState } from "react";
import SalesChart from "../admin/shared/SaleChart";
import { getTotalSalesBySeller } from "../../api/order";
import { useAuth } from "../../hooks";
import { FaDongSign, FaArrowDownLong } from "react-icons/fa6";
import { FaLevelUpAlt, FaUsers } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { getSellerSoldProducts } from "../../api/products";
import ProductRevenueTable from "../admin/shared/ProductRevenueTable";
import { getPredict, getPredicts } from "../../api/predict";
import NoItem from "../admin/shared/NoItem";

export default function Report() {
  const { authInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [products, setProducts] = useState([]);
  const [predicts, setPredicts] = useState([]);
  const [historyPredict, setHistoryPredict] = useState({});
  const [pagination, setPagination] = useState(1);

  const fetchOrders = async () => {
    const { type, deliveredOrders, totalRevenue } = await getTotalSalesBySeller(
      authInfo.profile._id
    );
    if (type === "Success") {
      setTotalSale(totalRevenue);
      setOrders(deliveredOrders);
    }
  };
  const fetchProducts = async () => {
    const { type, products } = await getSellerSoldProducts(
      authInfo.profile._id,
      pagination
    );
    if (type === "Success") {
      console.log(products);
      setProducts(products);
    }
  };
  const fetchPredict = async () => {
    const { type, predicts } = await getPredicts();
    if (type === "Success") {
      setPredicts(predicts);
    }
  };
  const handleChangePredict = async (event) => {
    const selectedValue = event.target.value;
    const { type, predict } = await getPredict(selectedValue);
    if (type === "Success") {
      setHistoryPredict(predict);
    }
  };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
    const day = dateObject.getDate();
    return `${day}/${month}/${year}`;
  };
  const dailyTotal = {};
  const userTotal = {};

  // Lặp qua mỗi đơn hàng và tính tổng của từng ngày
  orders.forEach((order) => {
    const date = formatDate(order.createdAt);
    if (!dailyTotal[date]) {
      dailyTotal[date] = 0;
    }
    dailyTotal[date] += order.totalPrice;
  });
  orders.forEach((order) => {
    const date = formatDate(order.createdAt);
    if (!userTotal[date]) {
      userTotal[date] = 0;
    }
    userTotal[date] += 1;
  });
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
  const handlePre = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  };
  const handleNext = () => {
    setPagination(pagination + 1);
  };

  const labels2 = Object.keys(totalPriceByProduct);

  const data2 = Object.values(totalPriceByProduct);

  const labels = Object.keys(dailyTotal);
  const data = Object.values(dailyTotal);
  const labels1 = Object.keys(userTotal);
  const data1 = Object.values(userTotal);
  let percentRevenue = ((data[data.length - 1] - data[0]) / data[0]) * 100;
  let percentUser = ((data1[data1.length - 1] - data1[0]) / data1[0]) * 100;

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchPredict();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);
  return (
    <div className="bg-white">
      <div className="p-4 ">
        <h1 class=" text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
          List of
          <span class=" ml-1 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            chart report .
          </span>{" "}
        </h1>
        <h1 class="mb-4 mt-2 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          <mark class="px-2 text-white bg-yellow-400 rounded ">Help</mark>{" "}
          sellers in business strategy.
        </h1>
      </div>

      {orders.length > 0 && orders ? (
        <div className="w-full">
          <div className="flex w-full">
            <div className="w-1/2 mr-2 bg-slate-50 p-4 rounded shadow-md cursor-pointer">
              <div className="font-sans font-semibold text-xl bg-yellow-500 w-fit rounded p-1 hover:bg-yellow-400">
                Total revenue
              </div>
              <div className="flex justify-between items-center">
                <div className="font-sans font-bold text-xl text-yellow-400 flex items-center">
                  {totalSale}
                  <FaDongSign />
                </div>
                <div
                  className={`font-sans font-semibold text-lg ${
                    percentRevenue > 0 ? "text-green-400" : "text-red-400"
                  } flex items-center`}
                >
                  {percentRevenue > 0 ? <FaLevelUpAlt /> : <FaArrowDownLong />}{" "}
                  {percentRevenue.toFixed(2)}%
                </div>
              </div>

              <SalesChart
                labels={labels}
                data={data}
                label="Revenue over time"
              />
              <div className="flex justify-center items-center mt-4">
                <div className="text-slate-500">{labels[0]}</div>
                <div className="text-yellow-400 font-bold p-2">
                  <GoDash />
                </div>
                <div className="text-slate-500">
                  {labels[labels.length - 1]}
                </div>
              </div>
            </div>

            <div className="w-1/2 mr-2 bg-slate-50 p-4 rounded shadow-md cursor-pointer">
              <div className="font-sans font-semibold text-xl bg-yellow-500 w-fit rounded p-1 hover:bg-yellow-400">
                Total customers
              </div>
              <div className="flex justify-between items-center">
                <div className="font-sans font-bold text-xl text-yellow-400 flex items-center">
                  {orders.length}
                  <FaUsers className="ml-2 text-2xl" />
                </div>
                <div
                  className={`font-sans font-semibold text-lg ${
                    percentUser > 0 ? "text-green-400" : "text-red-400"
                  } flex items-center`}
                >
                  {percentUser > 0 ? <FaLevelUpAlt /> : <FaArrowDownLong />}{" "}
                  {percentUser.toFixed(2)}%
                </div>
              </div>

              <SalesChart
                labels={labels1}
                data={data1}
                label="Customers over time"
              />
              <div className="flex justify-center items-center mt-4">
                <div className="text-slate-500">{labels1[0]}</div>
                <div className="text-yellow-400 font-bold p-2">
                  <GoDash />
                </div>
                <div className="text-slate-500">
                  {labels1[labels1.length - 1]}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mr-2 bg-slate-50 p-4 rounded shadow-md cursor-pointer mt-4">
            <SalesChart
              labels={labels2}
              data={data2}
              label="Revenue by product"
              type="bar"
            />
          </div>
          <div className="flex-col justify-center bg-slate-50 mt-4 rounded p-4  shadow-md ">
            <div className="font-sans text-xl font-semibold bg-yellow-500 w-fit rounded p-1 hover:bg-yellow-400">
              Prediction history
            </div>
            <select
              onChange={handleChangePredict}
              defaultValue=""
              className="w-full  font-sans md:w-auto font-semibold px-4 py-2 mt-4 border rounded cursor-pointer focus:outline-none hover:border-yellow-500"
            >
              <option disabled value="" className="font-sans font-semibold ">
                Chọn sản phẩm đã dự đoán
              </option>
              {predicts.map((opt, index) => (
                <option
                  key={index}
                  value={opt._id}
                  className="font-sans py-4 font-semibold"
                >
                  <div className="font-sans font-bold">{opt.product.name}</div>{" "}
                  ({opt.startDate}/{opt.endDate})
                </option>
              ))}
            </select>
            {historyPredict && historyPredict.product && (
              <SalesChart
                labels={historyPredict.labels}
                data={historyPredict.dataPredict}
                label="Dự đoán "
              />
            )}
          </div>
          <div className="w-full mr-2 bg-slate-50 p-4 rounded shadow-md cursor-pointer mt-4">
            <ProductRevenueTable data={products} />
            <div className="text-xs px-4 py-2">
              Page <strong>{pagination}</strong>
              <div class="flex mt-2">
                <div
                  onClick={handlePre}
                  class="flex mr-2 cursor-pointer items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </div>

                <div
                  onClick={handleNext}
                  class="flex cursor-pointer  items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoItem
          title={
            "Welcome merchants to the page that reports your business performance with charts"
          }
          body={
            "This page helps you more visually monitor how your business is doing so you can make adjustments to it"
          }
        />
      )}
    </div>
  );
}
