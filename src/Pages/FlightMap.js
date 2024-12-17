import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinIcon from '../img/placeholder.png'; // Path to your pin icon image
import airplaneIconImg from '../img/airplane.png'; // Path to your airplane icon image

const airplaneIcon = new L.Icon({
  iconUrl: airplaneIconImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const sourceIcon = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const destinationIcon = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

// Flight data with source and destination
const flights = [
  {
    id: 1,
    source: {
      lat: 50.0379, // Frankfurt, Germany
      lng: 8.5622,
      name: "Frankfurt Airport (FRA)",
    },
    destination: {
      lat: 28.6139, // New Delhi, India
      lng: 77.2090,
      name: "Indira Gandhi International Airport (DEL)",
    },
    path: [
      { lat: 50.0379, lng: 8.5622 },   // Frankfurt, Germany
      { lat: 48.8851, lng: 9.1977 },   // Southern Germany
      { lat: 47.1745, lng: 12.5373 },  // Approx. midpoint in Europe
      { lat: 45.4118, lng: 15.1936 },  // Croatia
      { lat: 43.0461, lng: 16.4307 },  // Over the Adriatic Sea
      { lat: 41.9034, lng: 20.2674 },  // Near North Macedonia
      { lat: 39.9435, lng: 22.3485 },  // Over Greece
      { lat: 37.8798, lng: 29.8230 },  // Over Turkey
      { lat: 35.7454, lng: 34.5683 },  // Over Cyprus
      { lat: 33.8903, lng: 35.7433 },  // Near the Mediterranean Sea
      { lat: 31.5480, lng: 34.8035 },  // Over Egypt
      { lat: 30.3799, lng: 32.5320 },  // Near the Nile River
      { lat: 27.2500, lng: 31.7989 },  // Central Egypt
      { lat: 25.1236, lng: 36.7856 },  // Over the Red Sea
      { lat: 22.0906, lng: 39.4970 },  // Near Saudi Arabia
      { lat: 20.5937, lng: 78.9629 },  // Central India
      { lat: 28.6139, lng: 77.2090 },  // New Delhi, India
    ],
  },
];

const FlightMap = () => {
  const [currentPosition, setCurrentPosition] = useState(flights[0].source);
  const flightPath = flights[0].path;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentPosition(flightPath[index]);
      index++;
      if (index >= flightPath.length) {
        clearInterval(interval);
      }
    }, 1000); // Change position every second

    return () => clearInterval(interval);
  }, [flightPath]);

  const resetFlight = () => {
    setCurrentPosition(flights[0].source);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Flight Path from Los Angeles to Frankfurt</h1>
      <button onClick={resetFlight} style={{ marginBottom: '20px', padding: '10px 20px' }}>
        Reset Flight
      </button>
      <div style={{ border: '2px solid #000', borderRadius: '8px', overflow: 'hidden' }}>
        <MapContainer center={flights[0].source} zoom={5} style={{ height: '600px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {flights.map((flight) => (
            <React.Fragment key={flight.id}>
              <Marker position={flight.source} icon={sourceIcon}>
                <Popup>
                  Source: {flight.source.name} <br />
                  Coordinates: {flight.source.lat}, {flight.source.lng}
                </Popup>
              </Marker>

              <Marker position={flight.destination} icon={destinationIcon}>
                <Popup>
                  Destination: {flight.destination.name} <br />
                  Coordinates: {flight.destination.lat}, {flight.destination.lng}
                </Popup>
              </Marker>

              <Marker position={currentPosition} icon={airplaneIcon}>
                <Popup>Current Location: {currentPosition.lat}, {currentPosition.lng}</Popup>
              </Marker>

              <Polyline
                positions={flight.path}
                color="blue"
                dashArray="5, 10" // Dotted line style
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default FlightMap;
