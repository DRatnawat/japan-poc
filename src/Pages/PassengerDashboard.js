import React, { useState, useEffect } from "react";
import {Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import BaggageTrackingVisualization from "../components/passenger/baggage-tracking-visualization";
import logo from "../img/logo.png";
import AirportNavigation from "../components/passenger/AirportNavigation";
import { getPassengerDetails } from "../api/auth";
import  Header  from "../components/ui/Header";
import  Footer  from "../components/ui/Footer";
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

// Function to generate random alphanumeric PNR
const generateRandomPNR = (length = 6) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pnr = "";
  for (let i = 0; i < length; i++) {
    pnr += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return pnr;
};

// const generateDummyData = () => {
//   return {
//     gate: `Gate ${Math.floor(Math.random() * 50) + 1}`,
//     flightStatus: ['On Time', 'Delayed', 'Boarding', 'Cancelled'][Math.floor(Math.random() * 4)],
//     waitTime: `${Math.floor(Math.random() * 45) + 5} min`,
//     notifications: [
//       'Flight departure has been rescheduled.',
//       'Cab service is ready for booking.',
//       'Enjoy 20% off at the airport lounge.'
//     ][Math.floor(Math.random() * 3)],
//     generalAnnouncement: 'Boarding for Flight 123 is now open at Gate 29.',
//     services: ['Book Cab', 'Reserve Lounge', 'Request Special Services']
//   };
// };

const generateDummyData = (flightStatus, baggageStatus) => {
  const notifications = [];
  const generalAnnouncements = [];

  // Sync notifications based on flight status
  if (flightStatus === "Delayed") {
    notifications.push("Your flight has been delayed.");
    generalAnnouncements.push("Flight departure has been delayed.");
  } else if (flightStatus === "Boarding") {
    notifications.push("Your flight is now boarding.");
    generalAnnouncements.push("Please proceed to your gate for boarding.");
  } else if (flightStatus === "On Time") {
    notifications.push("Your flight is on time.");
    generalAnnouncements.push("Please check the screens for updates.");
  } else if (flightStatus === "Cancelled") {
    notifications.push("Your flight has been cancelled.");
    generalAnnouncements.push("Please contact the airline for rescheduling.");
  }

  // Sync notifications based on baggage status
  if (baggageStatus === "In Transit") {
    notifications.push("Your baggage is in transit.");
  } else if (baggageStatus === "Delayed") {
    notifications.push("Your baggage has been delayed.");
    generalAnnouncements.push("There is a delay in baggage handling.");
  } else if (baggageStatus === "Lost") {
    notifications.push("We are looking for your baggage.");
    generalAnnouncements.push(
      "Please contact baggage services for assistance."
    );
  } else if (baggageStatus === "Delivered") {
    notifications.push("Your baggage has been delivered.");
  }

  // Add fallback notifications or announcements if needed
  if (notifications.length === 0) {
    notifications.push("No new notifications at the moment.");
  }

  if (generalAnnouncements.length === 0) {
    generalAnnouncements.push("No general announcements at this time.");
  }

  return {
    notifications,
    generalAnnouncements,

    waitTime: `${Math.floor(Math.random() * 45) + 5} min`,
  };
};

const PassengerDashboard = () => {
  const [error, setError] = useState(null); // Add error state
  const [loading, setLoading] = useState(null); // Add error state
  const [data, setData] = useState(null); // Add error state
  const [pnr, setPnr] = useState(""); // PNR input state
  const [passenger, setPassenger] = useState({
    name: "",
    flight: "",
    seat: "",
    pnr: "", // Random PNR generation
    gate: "",
    flightStatus: "",
    baggageStatus: "",
    waitTime: "",
    notifications: [],
    generalAnnouncement: [],
    services: ["Book Cab", "Reserve Lounge", "Request Special Services"],
    destination:"",
    source:"",
    travelDate:"",
  });

  // Function to handle status update from BaggageTrackingVisualization
  const handleBaggageStatusUpdate = (status) => {
    setPassenger((prevState) => ({
      ...prevState,
      baggageStatus: status,
    }));
  };
  const handlePNRChange = (event) => {
    setPnr(event.target.value); // Update PNR input
  };
  // useEffect(() => {
  //   const data = generateDummyData();
  //   setPassenger(prevState => ({ ...prevState, ...data }));
  // }, []);
  // Generate dummy data for personal notifications and general announcements

  const fetchPassengerData = async () => {
    if (!pnr) {
      setError("Please enter a valid PNR.");
      return;
    }

    setLoading(true);
    try {
      const response = await getPassengerDetails(pnr); // Pass the PNR to fetch details
      setData(response);
      setPassenger({
        ...passenger,
        name: `${response?.userId?.firstName} ${response?.userId?.lastName}`,
        flight: response?.flightScheduleId?.flightId?.flightNumber,
        seat: response?.onboarding?.seatNumber,
        pnr: response?.pnr,
        gate: response?.flightScheduleId?.gateNumber,
        flightStatus: response?.flightScheduleId?.status,
        baggageStatus: response?.baggageStatus,
        destination:response?.destination?.name,
        source:response?.source?.name,
        travelDate:response?.dateOfTravel,
      });
      setError(null); // Clear error
    } catch (err) {
      setError("Error fetching flight data.");
      console.error("Error fetching flight data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const {
      notifications,
      generalAnnouncements,

      waitTime,
    } = generateDummyData(passenger.flightStatus, passenger.baggageStatus);

    setPassenger((prevState) => ({
      ...prevState,
      notifications,
      generalAnnouncement: generalAnnouncements,

      waitTime: waitTime,
    }));
  }, [passenger.flightStatus, passenger.baggageStatus]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchPassengerData();
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <Header title={"Passenger Dashboard"}/>
      <Box sx={{ marginTop: "20px", textAlign: "right" }}>
        <TextField
          label="Enter PNR"
          variant="outlined"
          value={pnr}
          onChange={handlePNRChange}
          onKeyDown={handleKeyDown} // Fetch data on Enter key press
          sx={{ marginRight: "10px", minWidth: "300px" }}
        />
      </Box>
      {/* Single Column for Brand Logo and Current Time */}
      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        
        <Typography variant="h6" className="font-bold">
          Local Time: {new Date().toLocaleTimeString()}
        </Typography>
      </div>
      {/* PNR Input Field */}
      {/* <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <TextField
          label="Enter PNR"
          variant="outlined"
          value={pnr}
          onChange={handlePNRChange}
          style={{ marginRight: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchPassengerData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Details"}
        </Button>
      </div> */}

      {/* Display Error Message */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Two-Column Layout for Main Info */}
      <Grid container spacing={3}>
        {/* Column 1 */}
        <Grid item xs={12} sm={6}>
          {/* Passenger Info */}
          <Card
            className="shadow-lg rounded-xl"
            style={{ backgroundColor: "#f0f8ff" }}
          >
            <CardContent>
              <Typography variant="h5" className="font-bold">
                {data?.userId?.firstName} {data?.userId?.lastName}
              </Typography>
              <Typography variant="body2">PNR: {passenger.pnr}</Typography>
              <Typography variant="body2">
                Flight: {passenger.flight}
              </Typography>
              <Typography variant="body2">Seat: {passenger.seat}</Typography>
              <Typography variant="body2">Travel date: {passenger.travelDate}</Typography>
            </CardContent>
          </Card>

          <Card
            className="shadow-lg rounded-xl"
            style={{ marginTop: "16px", backgroundColor: "#fffacd" }}
          >
            <CardContent>
              <Typography variant="body2">
             Source Airport: {passenger.destination}
              </Typography>
              <Typography variant="body2">
             Destination Airport: {passenger.source}
              </Typography>
              
            </CardContent>
          </Card>

          {/* Gate Info */}
          <Card
            className="shadow-lg rounded-xl"
            style={{ marginTop: "16px", backgroundColor: "#ffe4e1" }}
          >
            <CardContent>
              <Typography variant="h6" className="font-bold">
                Gate Info
              </Typography>
              <Typography variant="body2">{passenger.gate}</Typography>
            </CardContent>
          </Card>

          {/* Flight Status */}
          <Card
            className="shadow-lg rounded-xl"
            style={{ marginTop: "16px", backgroundColor: "#e6e6fa" }}
          >
            <CardContent>
              <Typography variant="h6" className="font-bold">
                Flight Status
              </Typography>
              <Typography variant="body2">
                Status: {passenger.flightStatus}
              </Typography>
            </CardContent>
          </Card>

          {/* Baggage Status */}
          <Card
            className="shadow-lg rounded-xl"
            style={{ marginTop: "16px", backgroundColor: "#fffacd" }}
          >
            <CardContent>
              <Typography variant="h6" className="font-bold">
                Baggage Status
              </Typography>
              <Typography variant="body2">
                Status: {passenger.baggageStatus}
              </Typography>
            </CardContent>
          </Card>

          {/* Wait Time */}
          <Card
            className="shadow-lg rounded-xl"
            style={{ marginTop: "16px", backgroundColor: "#add8e6" }}
          >
            <CardContent>
              <Typography variant="h6" className="font-bold">
                Wait Time at Security
              </Typography>
              <Typography variant="body2">{passenger.waitTime}</Typography>
            </CardContent>
          </Card>

          {/* Personal Notifications */}
          <Card
            className="shadow-lg rounded-xl"
            style={{ marginTop: "16px", backgroundColor: "#ffe4b5" }}
          >
            <CardContent>
              <Typography variant="h6" className="font-bold">
                Personal Notifications
              </Typography>
              {passenger.notifications.map((notification, index) => (
                <Typography variant="body2" key={index}>
                  {notification}
                </Typography>
              ))}
            </CardContent>
          </Card>

          {/* General Announcement */}
          <Card
            className="shadow-lg rounded-xl"
            style={{ marginTop: "16px", backgroundColor: "#f5f5dc" }}
          >
            <CardContent>
              <Typography variant="h6" className="font-bold">
                General Announcements
              </Typography>
              {passenger.generalAnnouncement.map((announcement, index) => (
                <Typography variant="body2" key={index}>
                  {announcement}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Column 2 */}
        <Grid item xs={12} sm={6}>
          {/* Baggage Tracking */}
          <Card className="shadow-lg rounded-xl" style={{ marginTop: "0px" }}>
            <CardContent>
              <Typography variant="h6" className="font-bold"></Typography>
              <BaggageTrackingVisualization
                pnr={passenger.pnr}
                onStatusUpdate={handleBaggageStatusUpdate}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AirportNavigation/>
      
      <Footer />
    </div>
  );
};

export default PassengerDashboard;
