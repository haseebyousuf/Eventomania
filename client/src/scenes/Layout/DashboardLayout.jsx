import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

const DashboardLayout = () => {
  const user = useSelector((state) => state.global.user);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  //state
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    isNonMobile ? true : false
  );

  return (
    <Box
      width='100%'
      sx={{ display: isNonMobile ? "flex" : "block", overflow: "auto" }}
    >
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={user}
      />
      <Box flexGrow={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
