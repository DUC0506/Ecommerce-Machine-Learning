import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SalesChart = ({ labels, data, label, type }) => {
  const chartRef = useRef();
  let myChart = null;

  useEffect(() => {
    if (myChart) {
      myChart.destroy(); // Tiêu diệt biểu đồ cũ trước khi tạo một biểu đồ mới
    }

    const ctx = chartRef.current.getContext("2d");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    myChart = new Chart(ctx, {
      type: type ? type : "line",
      data: {
        labels: labels,

        datasets: [
          {
            label: label ? label : "Predicted Sales",
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            backgroundColor: ["rgba(75, 192, 192, 0.4)", "rgb(255, 99, 132)"], // Màu nền cho các cột
            borderRadius: 2,

            borderWidth: 2,
          },
        ],
      },
    });

    return () => {
      if (myChart) {
        myChart.destroy(); // Tiêu diệt biểu đồ khi component bị unmount
      }
    };
  }, [labels, data]);

  return (
    <div class="w-full  bg-white  p-5 rounded">
      <canvas ref={chartRef} />
    </div>
  );
};

export default SalesChart;
