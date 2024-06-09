import React from "react";
import DashboardStatsGrid from "../admin/DashboardStatsGrid";
import TransactionChart from "../admin/TransactionChart";
import RecentOrders from "../admin/RecentOrders";

import PopularProducts from "../admin/PopularProducts";

// import { getPredicts } from "../../api/predict";

export default function Dashboard() {
  // const [predicts, setPredicts] = useState([]);
  // const [historyPredict, setHistoryPredict] = useState({});

  // const handleChangePredict = async (event) => {
  //   const selectedValue = event.target.value;
  //   const { type, predict } = await getPredict(selectedValue);
  //   if (type === "Success") {
  //     setHistoryPredict(predict);
  //   }
  // };
  // const fetchPredict = async () => {
  //   const { type, predicts } = await getPredicts();
  //   if (type === "Success") {
  //     setPredicts(predicts);
  //   }
  // };
  // useEffect(() => {
  //   fetchPredict();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row  w-full">
        <TransactionChart />
        {/* <BuyerProfilePieChart /> */}
      </div>
      <div className="flex flex-row gap-4 w-full">
        {/* <div className="flex-col justify-center bg-slate-50 rounded p-4  shadow-md w-5/6">
          <div className="font-sans text-xl font-semibold">Lịch sử dự đoán</div>
          {predicts.length > 0 ? (
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
          ) : (
            ""
          )}
          {historyPredict && historyPredict.product && (
            <SalesChart
              labels={historyPredict.labels}
              data={historyPredict.dataPredict}
              label="Dự đoán "
            />
          )}
        </div> */}
        <div className="w-2/3">
          <RecentOrders number={5} />
        </div>
        <div className="w-1/3">
          <PopularProducts />
        </div>
      </div>
    </div>
  );
}
