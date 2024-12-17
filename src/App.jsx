import React from 'react';
import './App.css'; // Custom styles

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import PassengerDashboard from './Pages/PassengerDashboard';
import AirportDashboard from './Pages/AirportDashboard';
 
import FlightMap from './Pages/FlightMap';
import ThreeDViewer from './Pages/ThreeDViewer';
 
const App = () => {
 

  return (
    <Router>
      

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<PassengerDashboard />} />  {/* Default route */}
        <Route path="/dashboard" element={<AirportDashboard />} />
      
        <Route path="/flightmap" element={<FlightMap  />} /> 
        <Route path="/3dmap" element={<ThreeDViewer  />} /> 
        
      </Routes>

      
      
    </Router>
  
  );
};

export default App;
