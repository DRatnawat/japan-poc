import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArrivalFlights, getDepartureFlights } from "../../api/auth";
import { Box } from "@mui/material";
import FlightTable from "./FlightTable";

const FlightDetails = () => {
  const [selectedFlightType, setSelectedFlightType] = useState("Passenger");

  // Fetch arrival flights based on selected flight type
  const {
    data: fetchArrivalFlights,
    isLoading: isLoadingArrival,
    refetch: refetchArrival,
  } = useQuery({
    queryFn: async () => {
      const response = await getArrivalFlights(selectedFlightType,"destination");
      return response;
    },
    queryKey: ["arrivalFlight", selectedFlightType], // Include flight type in query key
  });

  // Fetch departure flights based on selected flight type
  const {
    data: fetchDepartureFlights,
    isLoading: isLoadingDeparture,
    refetch: refetchDeparture,
  } = useQuery({
    queryFn: async () => {
      const response = await getDepartureFlights(selectedFlightType,"source");
      return response;
    },
    queryKey: ["departureFlights", selectedFlightType], // Include flight type in query key
  });

  // Set up polling interval for both arrival and departure flights
  useEffect(() => {
    const interval = setInterval(() => {
      refetchArrival();
      refetchDeparture();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [refetchArrival, refetchDeparture]);

  // Trigger refetch when flight type is changed
  useEffect(() => {
    refetchArrival();
    refetchDeparture();
  }, [selectedFlightType, refetchArrival, refetchDeparture]);

  // Function to get column names for arrival flights
  const getArrivalColumnNames = () => {
    return [
      { name: "Airline" },
      { name: "Flight No." },
      { name: "From" },
      { name: "STA" },
      { name: "ATA" },
      { name: "Mode" },
      { name: "Delay" },
     
      { name: "Status" },
      { name: "Reason" },
      { name: "Pax" },
      { name: "Bags" },
    ];
  };

  // Function to get column names for departure flights
  const getDepartureColumnNames = () => {
    return [
      { name: "Airline" },
      { name: "Flight No." },
      { name: "To" },
      { name: "STD" },
      { name: "ATD" },
      { name: "Mode" },
      { name: "Delay" },
    
      { name: "Status" },
      { name: "Reason" },
      { name: "Pax" },
      { name: "Bags" },
    ];
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-center text-2xl font-bold mb-0"> {selectedFlightType} Flight Details</h2>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center ml-4">
          <select
            value={selectedFlightType}
            onChange={(e) => setSelectedFlightType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="Passenger">Passenger</option>
            <option value="Cargo">Cargo</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>
      <Box display="flex" justifyContent="space-around" my={0} sx={{ width: "100%", paddingX: "10px" }}>
        {isLoadingArrival ? (
          <div className="text-center text-gray-600">Loading flights...</div>
        ) : (
          <FlightTable columnNames={getArrivalColumnNames} flights={fetchArrivalFlights} isArrival={true} />
        )}
        {isLoadingDeparture ? (
          <div className="text-center text-gray-600">Loading flights...</div>
        ) : (
          <FlightTable columnNames={getDepartureColumnNames} flights={fetchDepartureFlights} isArrival={false} />
        )}
      </Box>
    </div>
  );
};

export default FlightDetails;
