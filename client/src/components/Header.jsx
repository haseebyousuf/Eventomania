import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import AnimateText from "animations/AnimateText";
import { motion } from "framer-motion";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box overflow='hidden'>
      <Box>
        <Typography
          component={motion.div}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          variant={isNonMobile ? "h2" : "h3"}
          color={theme.palette.secondary.dark}
          fontWeight='bold'
          sx={{ mb: "5px" }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ mb: "5px" }}
          variant={isNonMobile ? "h5" : "h6"}
          fontWeight='bold'
          color={theme.palette.secondary.accent}
        >
          <AnimateText text={subtitle} delayValue={0.05} />
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
