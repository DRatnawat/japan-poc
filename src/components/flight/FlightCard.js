import React, { useState } from "react";
function extractTime(dateTimeString) {
  const date = new Date(dateTimeString);

  // Extract time (HH:MM AM/PM)
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // If hour is 0, set it to 12 (for 12 AM/PM)

  return `${hours}:${minutes} ${ampm}`;
}

function extractDate(dateTimeString) {
  const date = new Date(dateTimeString);

  // Extract date (YYYY-MM-DD)
  return date.toISOString().split("T")[0];
}

const FlightCard = ({ flight, isArrival }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleFlightClick = () => {
    setSelectedFlight(flight);
  };

  const handleCloseModel = () => {
    setSelectedFlight(null);
  };

  return (
    <>
      <div
        className="bg-white p-2 rounded-lg shadow cursor-pointer"
        onClick={handleFlightClick}
        style={{ marginBottom: "10px" }} // Adjust margin between cards
      >
        <div className="flex justify-between items-center">
          <div className="w-1/6">
            {flight?.flightId?.airlineId?.airlineName}
          </div>
          <div className="w-1/6">
            <p className="text-xs text-gray-600">
              {flight?.flightId?.flightNumber}
              <br></br>
              {flight?.scheduleId}
            </p>
          </div>
          {/* {/ Conditionally render source or destination based on flight type /} */}
          {isArrival ? (
            <>
              <div className="w-1/6">
                <p className="font-bold text-sm">
                  {flight?.sourceAirportId?.code}
                </p>
              </div>
              <div className="w-1/6">
                <p className="text-xs text-gray-600">
                  {extractTime(flight?.arrivalTime)}
                </p>
              </div>
              <div className="w-1/6">
                <p className="text-xs text-gray-600">
                  {extractTime(flight?.actualArrivalTime)}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-1/6">
                <p className="font-bold text-sm">
                  {flight?.destinationAirportId?.code}
                </p>
              </div>
              <div className="w-1/6">
                <p className="text-xs text-gray-600">
                  {extractTime(flight?.departureTime)}
                </p>
              </div>
              <div className="w-1/6">
                <p className="text-xs text-gray-600">
                  {extractTime(flight?.actualDepartureTime)}
                </p>
              </div>
            </>
          )}

          {flight?.isDirect ? (
            <div className="w-1/6">
              <p className="text-xs text-gray-600">Non-Stop</p>
            </div>
          ) : (
            <div className="w-1/6">
              <p className="text-xs text-gray-600">Connecting</p>
            </div>
          )}
          <div className="w-1/6">
            <p className="text-xs text-gray-600 text-center relative">
              {flight?.delay ? flight.delay + " min" : "-"}
            </p>
          </div>
          <div className="w-1/6 text-center relative">
            <p
              className={`text-white px-2 py-1 rounded-lg text-xs ${flight?.status === "Arrived"
                  ? "bg-green-500"
                  : flight?.status === "Delayed"
                    ? "bg-red-500"
                    : flight?.status === "OnTime"
                      ? "bg-blue-500"
                      : flight?.status === "InFlying"
                        ? "bg-yellow-500"
                        : flight?.status === "Cancelled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                }`}
            >
              {flight?.status}
            </p>
          </div>
          <div className="w-1/6 text-center relative">
            <p className="text-xs text-gray-600 text-center relative">
              {flight?.reason ? flight.reason?.code : "-"}
            </p>
          </div>
          <div className="w-1/6 text-center relative">
            <p className="text-xs text-gray-600">{flight?.totalPassenger}</p>
          </div>
          <div className="w-1/6 text-center relative">
            <p className="text-xs text-gray-600">{flight?.totalBaggage}</p>
          </div>
        </div>
        {/* <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
           
           
            <img
              alt="Airline logo"
              className="rounded-full"
              height="30" // Decrease size of the logo
              src="https://storage.googleapis.com/a1aa/image/pedch4nCmuUaRSvrpcMPN7RMOG5E94zfY0X0pkKnojlPXXnTA.jpg"
              width="30"
            />
          </div>
          <div className="w-1/6">
            <p className="font-bold text-sm">
              
              Airline: {flight?.flightId?.airlineId?.airlineName}
            </p>
            <p className="text-xs text-gray-600">
               
              Flight: {flight?.flightId?.flightNumber}
            </p>
          </div>
          <div className="flex items-center space-x-2">
           
            <div>
              <p className="font-bold text-sm">
                {flight?.sourceAirportId?.city}
              </p>
              <p className="text-xs text-gray-600">
                {extractTime(flight?.departureTime)}
              </p>

              <p className="text-xs text-gray-600">
                {extractDate(flight?.departureTime)}
              </p>
            </div>
          </div>
          <div className="text-center relative">
            <p className="text-gray-600 text-xs">
              {flight?.flightDuration} min
            </p>
            <p className="text-xs text-gray-600">
              {flight?.isDirect ? "Non-stop" : "Connecting"}
            </p>
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-gray-300"></div>
          </div>

          <div>
            <p
              className={`text-white px-2 py-1 rounded-lg text-xs ${
                flight?.status === "Arrived"
                  ? "bg-green-500"
                  : flight?.status === "Delayed"
                  ? "bg-red-500"
                  : flight?.status === "OnTime"
                  ? "bg-blue-500"
                  : flight?.status === "Flying"
                  ? "bg-yellow-500"
                  : flight?.status === "Cancelled"
                  ? "bg-red-500"
                  : "bg-gray-500"
              }`}
            >
              {flight?.status}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">
              Total Passenger: {flight?.totalPassenger}
            </p>
          </div>
        </div> */}
      </div>

      {selectedFlight && (
        <Model flight={selectedFlight} onClose={handleCloseModel} />
      )}
    </>
  );
};

const Model = ({ flight, onClose }) => {
  const hasConnectingFlight = !flight?.isDirect;
  return (
    <div
      style={styles.ModelOverlay}
      className="flex justify-center items-center"
    >
      <div
        style={styles.ModelContent}
        className="relative bg-white shadow-lg rounded-lg"
      >
        {/* {/ Header /} */}
        <div className="bg-gradient-to-r from-purple-400 to-blue-500 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">
                {flight?.sourceAirportId?.city} to{" "}
                {flight?.destinationAirportId?.city}
              </h2>
              <p className="text-sm"> {extractDate(flight?.departureTime)}</p>
            </div>
            <button onClick={onClose} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>

        {/* {/ Body - Scrollable /} */}
        <div
          style={styles.scrollableContent}
          className="bg-white p-4 rounded-b-lg"
        >
          {hasConnectingFlight ? (
            <div className="grid grid-cols-2 gap-4">
              {flight?.flightSegments.map((connectingFlight, index) => (
                <FlightDetails flight={connectingFlight} />
              ))}


            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <FlightDetails flight={flight} />
            </div>
          )}

          {/* {/ Cashback and Payment Details /} */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Traveller Info */}
            <div className="border p-4 rounded-lg">
              <div className="mb-4 flex items-center">
                <i className="fas fa-users text-gray-500 mr-2"></i>
                <p className="text-sm text-gray-500">Trip ID: ARETX200WV3</p>
              </div>
              <h3 className="text-lg font-semibold mb-2">Passenger Info</h3>
              <div className="flex justify-between text-sm text-gray-500">
                <div>
                  <p className="font-semibold">Total Passengers</p>
                  <p className="font-semibold">LOS - IND</p>
                  <p className="font-semibold">IND - Dubai</p>
                </div>
                <div>
                  <p className="font-semibold">1263</p>
                  <p className="font-semibold">500</p>
                  <p className="font-semibold">500</p>
                </div>
              </div>
            </div>

            {/* Baggages Info */}
            <div className="border p-4 rounded-lg">
              <div className="mb-4 flex items-center">
                <i className="fas fa-suitcase-rolling text-gray-500 mr-2"></i>
                <p className="text-sm text-gray-500">Trip ID: ARETX200WV3</p>
              </div>
              <h3 className="text-lg font-semibold mb-2">Baggage Info</h3>
              <div className="flex justify-between text-sm text-gray-500">
                <div>
                  <p className="font-semibold">Total Baggage</p>
                  <p className="font-semibold">LOS - IND</p>
                  <p className="font-semibold">IND - Dubai</p>
                </div>
                <div>
                  <p className="font-semibold">1263</p>
                  <p className="font-semibold">500</p>
                  <p className="font-semibold">500</p>
                </div>
              </div>
            </div>

            {/* {/ Footer /} */}
            <div className="flex justify-between p-4 border-t">
              <button className="text-blue-500 font-semibold">NEED HELP</button>
              <button className="text-blue-500 font-semibold">
                CASHBACK FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      );
};

      const FlightDetails = ({flight}) => {
  return (
      <div className="border p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <img
            src="https://storage.googleapis.com/a1aa/image/oSfuqHbLNmzjQqHAjgRY0ZKkfLF6cBYTNebl6MfQ0Jjjm7oOB.jpg"
            alt="Airline logo"
            width="24"
            height="24"
            className="mr-2"
          />
          <span className="text-lg font-semibold">{flight?.flightId?.flightNumber} {flight?.flightId?.airlineId?.airlineName}</span>
          <span className="ml-auto text-sm text-gray-500">Economy class</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          {/* {/ Departure Info /} */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold">{flight?.sourceAirportId?.code}</h3>
            <p className="text-sm text-gray-500">{flight?.sourceAirportId?.name}</p>
            <p className="text-sm text-gray-500">Terminal 1</p>
            <p className="font-semibold mt-2">31 Mar 05:27 pm</p>
          </div>

          {/* {/ Plane Icon /} */}
          <i className="fas fa-plane text-gray-500 text-2xl mx-4"></i>

          {/* {/ Arrival Info /} */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-bold">  {flight?.destinationAirportId?.code}</h3>
            <p className="text-sm text-gray-500">
              {flight?.destinationAirportId?.name}
            </p>
            <p className="text-sm text-gray-500">Terminal 1</p>
            <p className="font-semibold mt-2">31 Mar 07:30 pm</p>
          </div>
        </div>
      </div>
      );
};

      const styles = {
        ModelOverlay: {
        position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
  },
      ModelContent: {
        width: "90%",
      maxWidth: "1000px",
      maxHeight: "80vh",
      display: "flex",
      flexDirection: "column",
  },
      scrollableContent: {
        overflowY: "auto",
      flex: 1,
  },
      closeButton: {
        backgroundColor: "#007BFF",
      color: "white",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
  },
};

      export default FlightCard;
