"use client";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Revenue() {
  // Bar Chart Data (Monthly Revenue)
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue ($)",
        data: [12000, 15000, 18000, 13000, 17000, 20000],
        backgroundColor: "rgba(139, 92, 246, 0.7)", // Violet
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: "Revenue Over Time", font: { size: 18 } },
    },
  };

  // Doughnut Chart Data (Revenue by Category)
  const doughnutData = {
    labels: ["Furniture", "Electronics", "Clothing", "Accessories"],
    datasets: [
        {
            data: [40000, 25000, 18000, 12000],
            backgroundColor: ["#8B5CF6", "#DB2777", "#F59E0B", "#60A5FA"], // Violet, Pink-600, Amber-500, Blue-400
            hoverBackgroundColor: ["#6D28D9", "#BE185D", "#D97706", "#3B82F6"], // Darker shades on hover
            borderWidth: 2,
          },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "bottom" as const },
      title: { display: true, text: "Revenue Distribution by Category", font: { size: 18 } },
    },
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-violet-700">Revenue Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
