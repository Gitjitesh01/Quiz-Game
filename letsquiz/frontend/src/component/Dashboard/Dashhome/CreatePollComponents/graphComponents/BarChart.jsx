// BarChart.js
import React from "react";
import swal from "sweetalert";

("react");
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./BarChart.css"; // Import your external CSS file

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Votes",
        data: data.values,
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Adjust color as needed
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Votes", // Your y-axis label
        },
      },
      x: {
        title: {
          display: true,
          text: "Options", // Your y-axis label
        },
      },
    },
  };

  // const chartOptions = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     }
  //   }
  // };
  // <Bar data={chartData} options={chartOptions} />

  return (
    <div className="Bar-container">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
