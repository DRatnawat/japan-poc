import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip } from 'chart.js';
import { Card, CardContent, Typography } from "@mui/material";
import { getPerformanceGraph } from "../../api/auth";

// Register the chart.js elements
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const OnTimePerformance = () => {

  const [chartData, setChartData] = useState(null);

 
    // Fetch data from your Spring Boot API
    const fetchPerformanceGraph = async () => {
      try {
        const response = await getPerformanceGraph(); // Adjust this API URL
        const flightData = response;

        // Convert the map into labels and data arrays for the chart
        const labels = Object.keys(flightData); // ["On Time", "Delayed"]
        const data = Object.values(flightData); // [onTimePercentage, delayedPercentage]

        // Update chart data
        setChartData({
          labels: labels, // Use the map keys as labels
          datasets: [
            {
              label: "On Time Performance",
              data: data, // Use the map values as data
              backgroundColor: ["#36a2eb", "#ff6384","#D2042D"], // Colors for each part
              hoverBackgroundColor: ["#36a2eb", "#ff6384","#D2042D"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching flight performance data:", error);
      }
    };
    useEffect(() => {
      fetchPerformanceGraph();
    }, []); // Empty array ensures the effect runs only once when the component mounts
   
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPerformanceGraph();
       // Call fetchCardData to get new data
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Clean up on unmount
  });
  // Chart display options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 20,
          usePointStyle: true,
          pointStyle: 'rect', // Rectangle legend items
        },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <Card sx={{ minWidth: 600, maxWidth: 800, margin: "16px 0", backgroundColor: "#f0f4f8" }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          On-Time Performance
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          {chartData ? <Doughnut data={chartData} options={options} /> : <p>Loading...</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnTimePerformance;
