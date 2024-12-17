import React from "react";
import FlightCard from "./FlightCard";

const FlightTable = ({ columnNames = [], flights = [], isArrival }) => {
  // Check if columnNames is a function and call it, otherwise use it directly if it's an array
  const columns = typeof columnNames === 'function' ? columnNames() : columnNames;

  // Get the current time
  const currentTime = new Date();

  // Function to calculate arrived flights count based on the arrival time
  const getArrivedCount = () => {
    return flights.filter(flight => new Date(flight.arrivalTime) < currentTime).length;
  };

  // Function to calculate departed flights count based on the departure time
  const getDepartedCount = () => {
    return flights.filter(flight => new Date(flight.departureTime) < currentTime).length;
  };

  // Calculate total flights and counts based on the flight type (arrival or departure)
  const totalFlights = flights.length;
  const flightCountText = isArrival
    ? `${getArrivedCount()} of ${totalFlights} Arrived`
    : `${getDepartedCount()} of ${totalFlights} Departed`;


  return (
    <div className="w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md mt-10 relative">
      {/* Header */}
      <div className="relative mb-4">
        <h2 className="text-2xl font-bold text-center">
          {isArrival ? "Arrival Flights" : "Departure Flights"}
        </h2>
        {/* Position the "232 of 500 Arrived" text in the top-right */}
        <div className="absolute top-0 right-0 text-gray-600 text-sm border border-gray-300 bg-gray-100 rounded-md px-4 py-1 shadow-sm">
          {flightCountText}
        </div>
      </div>
      {/* Table headers */}
      <div className="bg-gray-100 p-1 rounded-t-lg flex justify-between items-center text-sm font-semibold">
          
        {columns && columns.length > 0 ? (
          columns.map((column, index) => (
            <div key={index} className="w-1/6 text-center">
              {column.name}
            </div>
          ))
        ) : (
          <div>No columns available</div>
        )}
      </div>

      {/* Flights data */}
      <div className="grid grid-cols-1 gap-6">
        <div
          className="col-span-1 p-2 space-y-4 overflow-y-auto"
          style={{ height: "500px" }}
        >
          {flights && flights.length > 0 ? (
            flights.map((flight, index) => (
              <FlightCard key={index} flight={flight} isArrival={isArrival} />
            ))
          ) : (
            <div className="text-center text-gray-500">No flights available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightTable;
