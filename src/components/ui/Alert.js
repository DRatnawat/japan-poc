// components/ui/Alert.js
import React from 'react';

export const Alert = ({ children }) => {
  const alertStyle = {
    padding: '16px',
    backgroundColor: '#ffcc00',
    border: '1px solid #ffcc00',
    borderRadius: '4px',
    color: '#333',
  };

  return <div style={alertStyle}>{children}</div>;
};

export const AlertTitle = ({ children }) => {
  const alertTitleStyle = {
    fontWeight: 'bold',
    marginBottom: '8px',
  };

  return <h4 style={alertTitleStyle}>{children}</h4>;
};

export const AlertDescription = ({ children }) => {
  return <p>{children}</p>;
};
