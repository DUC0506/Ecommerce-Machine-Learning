import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = ({ labels, data }) => {
    const chartRef = useRef();
    let myChart = null;

    useEffect(() => {
        if (myChart) {
            myChart.destroy(); // Tiêu diệt biểu đồ cũ trước khi tạo một biểu đồ mới
        }

        const ctx = chartRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Predicted Sales',
                    data: data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });

        return () => {
            
            if (myChart) {
                myChart.destroy(); // Tiêu diệt biểu đồ khi component bị unmount
            }
        };
    }, [labels, data]);

    return (
        <div class="w-2/3  bg-slate-50 p-2 rounded">
        <canvas ref={chartRef} />
        </div>
    );
};

export default SalesChart;
