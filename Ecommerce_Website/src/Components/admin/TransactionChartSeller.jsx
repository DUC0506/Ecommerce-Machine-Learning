import React, { useEffect, useState } from "react";
import { getSalePredictionItem } from "../../api/chart";
import SalesChart from "./shared/SaleChart";
import { useNotification } from "../../hooks";
import { addPredict } from "../../api/predict";

import TextPredict from "./shared/TextPredict";
import ProductDrawer from "./ProductDrawer";
import SkeletonLoading from "./shared/SkeletonLoading";
import HeaderLoading from "./shared/HeaderLoading";

export default function TransactionChartSeller() {
  // const { authInfo } = useAuth();
  // const [formData, setFormData] = useState({
  //   start_date: "",
  //   end_date: " ",
  //   holidays: " ",
  //   productIndex: 1,
  //   productId: "",
  // });
  const [dataPre, setDataPre] = useState([]);
  const [date, setDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);
  const { updateNotification } = useNotification();
  // const [holidayData, setHolidayData] = useState([]);
  // const [products, setProducts] = useState([]);

  function generateLabels(startDate, length) {
    const start = new Date(startDate);
    const labels = [];
    for (let i = 0; i < length; i++) {
      // Tính toán ngày bắt đầu của tuần i
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i * 7);
      labels.push(formatDate(currentDate));
    }
    return labels;
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lưu ý: Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  }

  const labels = generateLabels(date.start_date, dataPre.length);
  const data = dataPre;

  // const handleHolidays = () => {
  //   setHolidayData([...holidayData, formatDate(formData.holidays)]);
  // };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  let dataPredict = {};
  const handleSummit = async (formData, holidays) => {
    const formattedFormData = {
      start_date: formatDate(formData.start_date),
      end_date: formatDate(formData.end_date),
    };
    if (
      formattedFormData.start_date === "NaN-NaN-NaN" ||
      formattedFormData.end_date === "NaN-NaN-NaN"
    ) {
      return updateNotification("error", "	Missing predicted date!");
    }
    console.log(formattedFormData);
    setLoading(true);
    setTimeout(async () => {
      const { predictions } = await getSalePredictionItem(
        formattedFormData,
        formData.productIndex
      );
      console.log(predictions);
      if (!predictions) {
        return updateNotification("error", "Predict failure");
      }
      updateNotification("success", "Predict success");
      setLoading(false);
      setDataPre(predictions);
      setDate({
        start_date: formData.start_date,
        end_date: formData.end_date,
      });
      dataPredict = {
        startDate: formattedFormData.start_date,
        endDate: formattedFormData.end_date,
        holidays: holidays,
        dataPredict: predictions,
        labels: generateLabels(formData.start_date, dataPre.length),
        product: formData.productId,
      };
      console.log(dataPredict.labels, dataPredict.holidays);
      await addPredict(dataPredict);
    }, 8000);
  };
  // const fetchProducts = async () => {
  //   const { type, products } = await getSellerProducts(authInfo.profile._id);
  //   if (type === "Success") {
  //     setProducts(products);
  //   }
  // };
  // const handleChangeProduct = (event) => {
  //   const selectedIndex = event.target.selectedIndex + 1;
  //   const selectedValue = event.target.value;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     productIndex: selectedIndex,
  //     productId: selectedValue,
  //   }));
  // };
  useEffect(() => {
    // fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex w-full bg-white rounded ">
        <div className="w-2/3">
          {loading ? (
            <SkeletonLoading />
          ) : data.length > 0 ? (
            <SalesChart labels={labels} data={data} />
          ) : (
            <HeaderLoading />
          )}
        </div>
        <ProductDrawer onSubmit={handleSummit} />
        {/* <div className="   flex flex-col justify-center items-center ml-4 mt-4 bg-slate-50 p-4 rounded">
          <select
            onChange={handleChangeProduct}
            defaultValue=""
            className="w-full font-sans md:w-auto px-4 py-2 mb-4 border rounded cursor-pointer focus:outline-none hover:border-yellow-500"
          >
            <option disabled value="" className="font-sans font-semibold ">
              Chọn sản phẩm dự đoán
            </option>

            {products.map((opt, index) => (
              <option key={index} value={opt._id} className="font-sans py-4">
                {opt.name}
              </option>
            ))}
          </select>
          <div className="flex items-center">
            <input
              type="date"
              className="mr-2 rounded px-3 py-2 appearance-none border border-yellow-300 focus:outline-none focus:border-yellow-500"
              name="start_date"
              onChange={handleChange}
              value={formData.startDay}
            />
            <div className="text-lg font-sans font-medium mr-1">-</div>
            <input
              type="date"
              className="mr-2 rounded px-3 py-2 appearance-none border border-yellow-300 focus:outline-none focus:border-yellow-500"
              name="end_date"
              onChange={handleChange}
              value={formData.endDay}
            />
          </div>

          <div className="flex mb-2 mt-2">
            <input
              type="date"
              className="mr-2 rounded px-3 py-2 appearance-none border border-yellow-300 focus:outline-none focus:border-yellow-500"
              name="holidays"
              onChange={handleChange}
              value={formData.holiday}
            />
            <button
              className="bg-yellow-400 py-2 px-4 rounded ml-2 font-sans font-medium "
              onClick={() => handleHolidays()}
            >
              {" "}
              Thêm ngày lễ
            </button>
          </div>
          <textarea
            name="arrayHoliday"
            id="arrayHoliday"
            className="font-sans w-full font-normal text-lg p-2 rounded mb-2 outline-none active:outline-yellow-500 hover:outline-yellow-500"
            value={holidayData}
          ></textarea>
          <button
            className="bg-yellow-400 py-2 px-4 w-1/2 rounded hover:bg-yellow-500  font-sans font-medium"
            onClick={() => handleSummit()}
          >
            {loading ? "Đang xử lý" : "Dự đoán "}{" "}
          </button>
        </div> */}
      </div>

      {dataPre.length > 0 && dataPre ? (
        <TextPredict
          startDate={date.start_date}
          endDate={date.end_date}
          dataPredict={dataPre}
        />
      ) : (
        ""
      )}
    </div>
  );
}
