import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const Footer = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      borderRadius='0.55rem'
      sx={{
        backgroundColor: theme.palette.background.alt,
        m: "1rem auto",
        p: "1rem 0 ",
      }}
    >
      <Typography textAlign='center' fontSize={!isNonMobile && "0.7rem"}>
        Developed and maintained by{" "}
        <Typography variant='span' fontWeight='bold' color='secondary'>
          Department of IT
        </Typography>
        , SP College
      </Typography>
    </Box>
  );
};

export default Footer;
