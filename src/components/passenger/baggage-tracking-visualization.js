import React, { useState, useEffect } from 'react';
import { Luggage, Plane, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Typography } from '@mui/material';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const stepsData = [
  { title: 'Check-in', description: 'Baggage has been checked in.', icon: Luggage },
  { title: 'Security', description: 'Baggage is undergoing security check.', icon: XCircle },
  { title: 'Boarding', description: 'Baggage is being loaded onto the plane.', icon: Plane },
  { title: 'In Flight', description: 'Baggage is in the plane.', icon: Clock },
  { title: 'Arrival', description: 'Baggage has arrived at the destination.', icon: CheckCircle }
];

// Baggage step component with dynamic background color changes
const BaggageStep = ({ icon: Icon, title, description, status, event }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case 'current': return 'bg-green-300'; // Change the whole box color
      case 'completed': return 'bg-blue-300';
      case 'alert': return 'bg-red-300';
      case 'delayed': return 'bg-yellow-300';
      case 'wrong': return 'bg-purple-300';
      default: return 'bg-gray-100';
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'current': return 'text-green-700';
      case 'completed': return 'text-blue-700';
      case 'alert': return 'text-red-700';
      case 'delayed': return 'text-yellow-700';
      case 'wrong': return 'text-purple-700';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`w-48 ${getBackgroundColor()} border-2 border-gray-300 shadow-lg transition-colors duration-300 ease-in-out relative rounded-lg hover:shadow-2xl hover:scale-105 transform p-4`}>
      <Icon className={`w-6 h-6 ${getIconColor()} mx-auto`} />
      <div className="text-center mt-2">
        <Typography className="text-sm">{title}</Typography>
      </div>
      <div className="text-xs text-center text-gray-600 mt-2">{description}</div>
      {event && <div className="text-xs font-bold text-center mt-2 text-red-500">{event}</div>}
      {status === 'current' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      )}
    </div>
  );
};

// Main component with improved UI
const BaggageTrackingVisualization = ({ pnr, onStatusUpdate }) => {
  const [trackingData, setTrackingData] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [steps, setSteps] = useState(stepsData);
  const [currentStep, setCurrentStep] = useState(0);
  const [alert, setAlert] = useState('');
  const [status, setStatus] = useState('current');
  const [scenario, setScenario] = useState('');

  const scenarios = ['no-issues', 'delayed', 'lost', 'wrong-flight'];

  const handleTrack = () => {
    const data = generateTrackingData(pnr);
    setTrackingData(data);
    setIsTracking(true);
    setCurrentStep(0);

    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setScenario(randomScenario);
  };

  const generateTrackingData = (pnr) => {
    return [{ trackingId: pnr, status: 'current' }];
  };

  // Automatically trigger tracking when `pnr` changes
  useEffect(() => {
    if (pnr) {
      handleTrack();
    }
  }, [pnr]);

  useEffect(() => {
    if (isTracking && scenario && currentStep < steps.length) {
      const interval = setInterval(() => {
        setCurrentStep(prevStep => {
          const nextStep = prevStep + 1;

          if (nextStep === steps.length) {
            clearInterval(interval);
          }

          // Handle scenario-based status
          if (scenario === 'delayed' && nextStep === 2) {
            setAlert('Baggage is delayed.');
            setStatus('delayed');
            onStatusUpdate('delayed');
          } else if (scenario === 'lost' && nextStep === 3) {
            setAlert('Baggage is lost.');
            setStatus('alert');
            clearInterval(interval);
            onStatusUpdate('alert');
          } else if (scenario === 'wrong-flight' && nextStep === 4) {
            setAlert('Baggage is on the wrong flight.');
            setStatus('wrong');
            onStatusUpdate('wrong flight');
          } else if (scenario === 'no-issues') {
            setAlert('');
            setStatus('completed'); // Mark as completed for non-issue scenario
          }

          return nextStep;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isTracking, scenario, currentStep, onStatusUpdate]);

  const handleReset = () => {
    setIsTracking(false);
    setSteps([]);
    setCurrentStep(0);
    setAlert('');
    setStatus('');
  };

  return (
    <div className="p-8 min-h-screen flex flex-col items-center justify-center border-4 border-black rounded-lg bg-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Baggage Tracking Dashboard</h1>

      {isTracking && (
        <>
          <div className="mb-6 text-center">
            <strong className="text-lg">Tracking ID:</strong> <span className="text-yellow-300 font-mono">{pnr}</span>
          </div>

          <div className="flex flex-wrap justify-center items-center mb-8 gap-6">
            {steps.map((step, index) => {
              let stepStatus = '';
              if (index < currentStep) {
                stepStatus = 'completed';
              } else if (index === currentStep) {
                stepStatus = status; // Current status (current, delayed, etc.)
              }

              return (
                <React.Fragment key={index}>
                  <BaggageStep
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    status={stepStatus}
                    event={index === currentStep ? alert : ''}
                  />
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-400 self-center rounded-full" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {alert && (
            <div className={`mb-6 text-center p-4 rounded-lg shadow-md ${status === 'alert' || status === 'wrong' ? "bg-red-600" : "bg-yellow-400"}`}>
              <AlertTriangle className="inline-block h-6 w-6 mr-2" />
              <span className="font-bold">{alert}</span>
            </div>
          )}

          <Card className="bg-white text-black rounded-xl shadow-lg mb-6">
            <CardHeader
              title={<Typography className="text-xl text-center">Tracking Information</Typography>}
            />
            <CardContent>
              <Typography variant="body2"><strong>Current Location:</strong> {steps[currentStep]?.title || 'N/A'}</Typography>
              <Typography variant="body2"><strong>Status:</strong> {alert || 'No issues'}</Typography>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            onClick={handleReset}
            className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-red-500 transition-all"
          >
            Reset Tracking
          </Button>
        </>
      )}
    </div>
  );
};

export default BaggageTrackingVisualization;
