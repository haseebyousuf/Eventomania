import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import Form from "./Form";

const AddCommiittees = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  return (
    <Box>
      <Box width={isNonMobile ? "80%" : "90%"} m="2rem auto">
        <Form />
      </Box>
    </Box>
  );
};

export default AddCommiittees;
