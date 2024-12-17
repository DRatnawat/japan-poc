import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import logo from '../../img/logo.png'
import { Link } from "react-router-dom"; // Import Link from react-router-dom
const Header = ({title}) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo or Title */}
      
        {logo && (
          <img
            src={logo}
            alt="Logo"
            style={{ height: "100px", marginRight: "20px" }} // Adjust height as needed
          />
        )}
      
        <Typography variant="h3" component="div">
        {title}
        </Typography>

        {/* Buttons on the right side */}
        <Box>
        <Button color="inherit" sx={{ marginX: 1 }} component={Link} to="/">
            Passenger
          </Button>
          <Button color="inherit" sx={{ marginX: 1 }} component={Link} to="/dashboard">
            Airport 
          </Button>
          <Button color="inherit" sx={{ marginX: 1 }} component={Link} to="/3dmap">
            3D Map
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
