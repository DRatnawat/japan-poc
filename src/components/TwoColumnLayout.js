import React from 'react';
import { Grid } from '@mui/material';
import BaggageTrackingVisualization from './baggage-tracking-visualization'; // Import baggage tracking component
import PassengerDashboard from './PassengerDashboard'; // Import passenger dashboard component

const TwoColumnLayout = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Passenger & Baggage Dashboard</h1>

      {/* Create a two-column layout using Material-UI Grid */}
      <Grid container spacing={4}>
        {/* Left Column - Baggage Tracking */}
        <Grid item xs={12} md={6}>
          <div className="p-4 bg-white text-black rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Baggage Tracking</h2>
            <BaggageTrackingVisualization />
          </div>
        </Grid>

        {/* Right Column - Passenger Dashboard */}
        <Grid item xs={12} md={6}>
          <div className="p-4 bg-white text-black rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Passenger Dashboard</h2>
            <PassengerDashboard />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TwoColumnLayout;
