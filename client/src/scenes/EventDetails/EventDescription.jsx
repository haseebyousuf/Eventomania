import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const EventDescription = ({ description }) => {
  const theme = useTheme();
  const mode = useSelector((state) => state.mode);

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
    <>
      {/* <Box
        height="3rem"
        pl={1}
        width={isNonMobile ? "90%" : "100%"}
        sx={{
          borderRadius: "5px",
          backgroundColor: theme.palette.background.alt,
        }}
      > */}
      <Typography
        fontSize="1.7rem"
        varient="h2"
        fontWeight="bold"
        color="secondary"
      >
        About This Event
      </Typography>
      {/* </Box> */}
      <Box mt={1} width={isNonMobile ? "90%" : "100%"}>
        <Card
          sx={{
            // padding: "0rem 2rem",
            backgroundColor:
              mode === "dark" ? "transparent" : theme.palette.background.alt,
          }}
        >
          <CardContent>
            <Typography textAlign="justify" fontSize="1rem" varient="p">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default EventDescription;
