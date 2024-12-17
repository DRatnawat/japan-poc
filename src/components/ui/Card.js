// components/ui/Card.js
import React from 'react';
const Card = ({ children }) => {
    const cardStyle = {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };
  
    return <div style={cardStyle}>{children}</div>;
  };
  
  export const CardHeader = ({ children }) => {
    const headerStyle = {
      marginBottom: '16px',
    };
  
    return <div style={headerStyle}>{children}</div>;
  };
  
  export const CardTitle = ({ children }) => {
    const titleStyle = {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    };
  
    return <h2 style={titleStyle}>{children}</h2>;
  };
  
  export const CardContent = ({ children }) => {
    return <div>{children}</div>;
  };
  
  export default Card;  // This line is correct
  