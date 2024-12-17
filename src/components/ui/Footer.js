// src/components/Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#3f51b5",
        padding: "10px",
        width: "100%",
        textAlign: "center",
        position: "relative", // Change to relative to stay within the layout
      }}
    >
      <Typography variant="body2" color="white">
        © 2024 Los Angeles International Airport. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
