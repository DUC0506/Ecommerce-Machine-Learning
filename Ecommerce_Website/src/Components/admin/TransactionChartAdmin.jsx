import { addPredict } from "../../api/predict";
import { getSalePrediction, getSalePredictionItem } from "../../api/chart";
import { useNotification } from "../../hooks";
import React, { useEffect, useState } from "react";
import SkeletonLoading from "./shared/SkeletonLoading";
import TextPredict from "./shared/TextPredict";
import HeaderLoading from "./shared/HeaderLoading";
import SalesChart from "./shared/SaleChart";
import ProductDrawerAdmin from "./ProductDrawerAdmin";

export default function TransactionChartAdmin() {
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
    console.log(formData);
    if (
      formattedFormData.start_date === "NaN-NaN-NaN" ||
      formattedFormData.end_date === "NaN-NaN-NaN"
    ) {
      return updateNotification("error", "	Missing predicted date!");
    }

    setLoading(true);
    setTimeout(async () => {
      const { prediction } = await getSalePrediction(
        formattedFormData,
        formData.productIndex
      );
      console.log(prediction);
      if (!prediction) {
        return updateNotification("error", "Predict failure");
      }
      updateNotification("success", "Predict success");
      setLoading(false);
      setDataPre(prediction);
      setDate({
        start_date: formData.start_date,
        end_date: formData.end_date,
      });

      const lb = generateLabels(formData.start_date, prediction.length);
      dataPredict = {
        startDate: formattedFormData.start_date,
        endDate: formattedFormData.end_date,
        holidays: holidays,
        dataPredict: prediction,
        labels: lb,
        apartment: formData.productId,
      };
      console.log(dataPredict);

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
        <ProductDrawerAdmin onSubmit={handleSummit} />
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
