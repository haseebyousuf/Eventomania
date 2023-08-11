import { Box, useMediaQuery } from "@mui/material";
import React from "react";

import LoginForm from "./LoginForm";
import HomeNavbar from "../../components/HomeNavbar";

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <HomeNavbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Box width={isNonMobile ? "30%" : "90%"}>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
