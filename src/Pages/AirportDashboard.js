import React, { useState, useEffect } from "react";
 
import PassengerMovementChart from "../components/flight/PassengerMovementChart";
import OnTimePerformance from "../components/flight/OnTimePerformance";
import { Typography, Box, Stack } from "@mui/material";
import { getCardsData } from "../api/auth";
import InfoCard from "../components/ui/InfoCard";
import Header from "../components/ui/Header"
import Footer from "../components/ui/Footer"; // Importing Footer
import {
  FaUsers,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaUserFriends,
} from "react-icons/fa"; // Icon for incoming flights
import FlightDetails from "../components/flight/FlightDetails";
import FlightMap from "./FlightMap";

// const AirportDashboard = () => {
//   const [cardData, setCardData] = useState({});

//   const fetchCard = async () => {
//     try {
//       const response = await getCardsData();
//       setCardData(response);
//       console.log(response);
//     } catch (error) {
//       console.error("Error fetching flight schedules:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCard();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchCard();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh", // Ensure full height for the flexbox
//       }}
//     >
//       {/* Header Component */}
//       <Header title={"Los Angeles International Airport Dashboard"} />

//       {/* Main content area */}
//       <Box
//         sx={{
//           flex: 1, // Allow the main content to grow and fill the available space
//           padding: 0,
//           margin: 0,
//           width: "100%",
//           overflow: "auto",
//         }}
//       >
//         {/* Full-width title */}
//         <Box sx={{ mb: 4, padding: "20px", backgroundColor: "#f5f5f5", width: "100%" }}>
//           <Typography variant="h4" component="h1" align="center">
            
//           </Typography>
//         </Box>

//         {/* Full-width cards */}
//         <Stack
//           direction="row"
//           justifyContent="space-around"
//           spacing={3}
//           mb={4}
//           sx={{ width: "100%", paddingX: "10px" }}
//         >
//           <InfoCard
//             count={cardData["Arrival Flights"] || 0}
//             title="Arrival Flights"
//             Icon={FaPlaneDeparture}
//             color="#4caf50"
//             sx={{ width: "15%" }}
//           />
//           <InfoCard
//             count={cardData["Departure Flights"] || 0}
//             title="Departure Flights"
//             Icon={FaPlaneDeparture}
//             color="#f44336"
//             sx={{ width: "15%" }}
//           />
//           <InfoCard
//             count={cardData["Arrival Passengers"] || 0}
//             title="Arrival Passengers"
//             Icon={FaUsers}
//             color="#4caf50"
//             sx={{ width: "15%" }}
//           />
//           <InfoCard
//             count={cardData["Departure Passengers"] || 0}
//             title="Departure Passengers"
//             Icon={FaUserFriends}
//             color="#f44336"
//             sx={{ width: "15%" }}
//           />
//           <InfoCard
//             count={cardData["Delayed Flights"] || 0}
//             title="Delayed Flights"
//             Icon={FaPlaneArrival}
//             color="#ff9800"
//             sx={{ width: "15%" }}
//           />
//           <InfoCard
//             count={cardData["Cancelled Flights"] || 0}
//             title="Cancelled Flights"
//             Icon={FaPlaneArrival}
//             color="#ff9800"
//             sx={{ width: "15%" }}
//           />

//         </Stack>

//         <Box display="flex" justifyContent="space-around" my={10} sx={{ width: "100%", paddingX: "10px" }}>
//           <FlightDetails />
//         </Box>

//         {/* Full-width charts */}
//         <Stack direction="row" spacing={4} mb={4} justifyContent="space-around" sx={{ width: "100%", paddingX: "10px" }}>
//           <Box sx={{ width: "48%" }}>
//             <PassengerMovementChart />
//           </Box>
//           <Box sx={{ width: "48%" }}>
//             <OnTimePerformance />
//           </Box>
//         </Stack>
//       </Box>
//       <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center', // Centers horizontally
//         alignItems: 'center', // Centers vertically
//         height: '100vh', // Full viewport height
//       }}
//     >
     
//       <Box sx={{ width: "80%" }}>
//         <FlightMap />
//       </Box>

//     </Box>
//       {/* Footer Component */}
//       <Footer />
//     </Box>

//   );
// };

// export default AirportDashboard;


 

const AirportDashboard = () => {
  const [cardData, setCardData] = useState({});

  const fetchCard = async () => {
    try {
      const response = await getCardsData();
      setCardData(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching flight schedules:", error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCard();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Adjust for full screen
      }}
    >
      
      <Header title={"Airport"} /> 

      
      <Box
        sx={{
          flex: 1, // Allow the main content to grow and fill the available space
          padding: 0,
          margin: 0,
          width: "100%",
          overflow: "auto",
        }}
      >
 
        <Box
          sx={{
            mb: 4,
            padding: "20px",
            backgroundColor: "#f5f5f5",
            width: "100%",
          }}
        >
          <Typography variant="h4" component="h1" align="center">
            Los Angeles International Airport Dashboard
          </Typography>
        </Box>
 
        <Stack
          direction={{ xs: "column", sm: "row" }} // Stack cards vertically on small screens
          justifyContent="space-around"
          spacing={3}
          mb={4}
          sx={{ width: "100%", paddingX: { xs: "10px", sm: "10px" } }}
        >
          <InfoCard
            count={cardData["Arrival Flights"] || 0}
            title="Arrival"
            Icon={FaPlaneDeparture}
            color="#4caf50"
            sx={{ width: { xs: "100%", sm: "15%" } }} // Full width on mobile, 15% on larger screens
          />
          <InfoCard
            count={cardData["Departure Flights"] || 0}
            title="Departure"
            Icon={FaPlaneDeparture}
            color="#f44336"
            sx={{ width: { xs: "100%", sm: "15%" } }}
          />
          <InfoCard
            count={cardData["Arrival Passengers"] || 0}
            title="Arrival Passengers"
            Icon={FaUsers}
            color="#4caf50"
            sx={{ width: { xs: "100%", sm: "15%" } }}
          />
          <InfoCard
            count={cardData["Departure Passengers"] || 0}
            title="Departure Passengers"
            Icon={FaUserFriends}
            color="#f44336"
            sx={{ width: { xs: "100%", sm: "15%" } }}
          />
          <InfoCard
            count={cardData["Delayed Flights"] || 0}
            title="Delayed Flights"
            Icon={FaPlaneArrival}
            color="#ff9800"
            sx={{ width: { xs: "100%", sm: "15%" } }}
          />
          <InfoCard
            count={cardData["Canceled Flights"] || 0}
            title="Canceled Flights"
            Icon={FaPlaneArrival}
            color="#ff9800"
            sx={{ width: { xs: "100%", sm: "15%" } }}
          />
        </Stack>

        
        <Box
  display="flex"
  justifyContent="center" // Center on mobile
  mt={-5} // Reduce the margin value from 10 to 4
  sx={{ width: "100%", paddingX: { xs: "10px", sm: "10px" } }}
>
  <FlightDetails />
</Box>


        
        <Stack
          direction={{ xs: "column", sm: "row" }} // Stack vertically on small screens
          spacing={4}
          mb={4}
          justifyContent="space-around"
          sx={{ width: "100%", paddingX: { xs: "10px", sm: "10px" } }}
        >
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <PassengerMovementChart />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
            <OnTimePerformance />
          </Box>
        </Stack>
      </Box>
  
      <Footer />
    </Box>
  );
};

export default AirportDashboard;
