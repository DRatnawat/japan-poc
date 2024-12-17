import axios from "../config/axios";

export const getPassengerDetails = async (pnr) => {
  const response = await axios.get(`passengerservice/v1/passenger?pnr=${pnr}`);
  return response.data;
};
export const getFlightSchedules = async () => {
  const response = await axios.get(`airportservice/v1/airport/flights?airportId=1`);
  return response.data;
};
export const  getArrivalFlights = async (selectedFlightType,direction) => {
  const response = await axios.get(`airportservice/v1/airport/flights?airportId=1&flightType=${selectedFlightType}&direction=${direction}`);
  return response.data;
};
export const getDepartureFlights = async (selectedFlightType,direction) => {
  const response = await axios.get(`airportservice/v1/airport/flights?airportId=1&flightType=${selectedFlightType}&direction=${direction}`);
  return response.data;
};

 
export const getPassengerMovementGraph = async ()=> {
  const response = await axios.get(`airportservice/v1/airport/passengers/graph?airportId=1`);
  return response.data;
};
export const getCardsData = async ()=> {
  const response = await axios.get(`airportservice/v1/airport/cards?airportId=1`);
  return response.data;
};

export const getPerformanceGraph = async ()=> {
  const response = await axios.get(`airportservice/v1/airport/flightperformances?airportId=1`);
  return response.data;
};

 