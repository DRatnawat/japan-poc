// components/ui/Input.js
import React from 'react';

const Input = ({ placeholder, type = 'text', required }) => {
  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '12px',
    fontSize: '16px',
  };

  return <input type={type} placeholder={placeholder} style={inputStyle} required={required} />;
};

export default Input;
