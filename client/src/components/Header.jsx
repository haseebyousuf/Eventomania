import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box overflow='hidden'>
      <Box
        component={motion.div}
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Typography
          variant={isNonMobile ? "h2" : "h3"}
          color={theme.palette.secondary[100]}
          fontWeight='bold'
          sx={{ mb: "5px" }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ mb: "5px" }}
          variant={isNonMobile ? "h5" : "h6"}
          fontWeight='bold'
          color={theme.palette.secondary[300]}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
