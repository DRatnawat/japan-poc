import React, { useState ,useEffect} from 'react';
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { getPassengerMovementGraph } from '../../api/auth';
// Your passenger movement data from the database
// const passengerData = {
//   "4": { "incoming": 12 },
//   "6": { "incoming": 9 },
//   "15": { "outgoing": 88 },
//   "17": { "incoming": 23 },
//   "19": { "incoming": 70, "outgoing": 36 },
//   "21": { "incoming": 53, "outgoing": 13 },
//   "22": { "outgoing": 9 },
//   "23": { "incoming": 6 },
// };

function PassengerMovementChart() {
  const [passengerData , setPassengerData ] = useState([]);
 
  const fetchPassengerData = async () => {
    try {
      const response = await getPassengerMovementGraph(); // Replace with your API URL
      console.log(response," data movement")
      setPassengerData(response); // Update state with the API response
    } catch (error) {
      console.error('Error fetching flight schedules:', error);
    }
  };
  useEffect(() => {
    fetchPassengerData();
  }, []); // Empty array ensures the effect runs only once when the component mounts
 
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPassengerData();
       // Call fetchCardData to get new data
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Clean up on unmount
  });
  // Process the data for Chart.js format
  const labels = Object.keys(passengerData); // ["4", "6", "15", "17", "19", "21", "22", "23"]
  
  const incomingData = labels.map((key) => passengerData[key]?.incoming || 0);
  const outgoingData = labels.map((key) => passengerData[key]?.outgoing || 0);

  const data = {
    labels: labels, // Label each bar based on the stop IDs (or whatever is appropriate)
    datasets: [
      {
        label: "Incoming Passengers",
        data: incomingData, // Data for incoming passengers
        backgroundColor: "#36a2eb", // Blue color for incoming passengers
      },
      {
        label: "Outgoing Passengers",
        data: outgoingData, // Data for outgoing passengers
        backgroundColor: "#ff6384", // Pink color for outgoing passengers
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Passenger Movement
        </Typography>
        <Bar data={data} options={{ responsive: true }} />
      </CardContent>
    </Card>
  );
}

export default PassengerMovementChart;
