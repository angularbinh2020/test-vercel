import "chart.js/auto";
import React, { useState } from "react";
import { Chart } from "react-chartjs-2";

const DoughnutChart = (props: any) => {
  const [options] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        boxWidth: 0,
        display: false,
      },
      title: {
        display: false,
      },

      width: "145px",
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  });

  return <Chart data={props.data} options={options} type={"doughnut"} />;
};

export default DoughnutChart;
