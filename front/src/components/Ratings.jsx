import React from "react";
import { Bar } from "react-chartjs-2";

const RatingGraph = () => {
  const ratings = [4, 3, 4, 3, 3, 5, 1, 3, 4, 3, 2];
  const data = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Number of Ratings",
        data: [
          ratings.filter((r) => r === 1).length,
          ratings.filter((r) => r === 2).length,
          ratings.filter((r) => r === 3).length,
          ratings.filter((r) => r === 4).length,
          ratings.filter((r) => r === 5).length,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default RatingGraph;
