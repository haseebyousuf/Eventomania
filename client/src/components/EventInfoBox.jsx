import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const EventInfoBox = ({ icon, title, value, last }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <>
      <Box>
        <Box display='flex' gap={1}>
          {icon}
          <Box>
            <Typography
              color='secondary'
              fontSize={!isNonMobile && "1rem"}
              fontWeight='bold'
            >
              {title}
            </Typography>
            <Typography fontSize={!isNonMobile && "1rem"}>{value}</Typography>
          </Box>
        </Box>
      </Box>
      {!last && (
        <Divider
          orientation={isNonMobile ? "vertical" : "horizontal"}
          flexItem
        />
      )}
    </>
  );
};

export default EventInfoBox;
