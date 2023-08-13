import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import HomeNavbar from "components/HomeNavbar";

const Layout = () => {
  return (
    <Box>
      <HomeNavbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
