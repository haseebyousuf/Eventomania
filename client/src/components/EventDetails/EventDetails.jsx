import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import EventHeader from "./EventHeader";
import EventDescription from "./EventDescription";

import Register from "./Register";
import EventImages from "../EventImages";
import Footer from "components/Footer";
import AnimateText from "animations/AnimateText";
import { useGetEventQuery } from "state/eventApiSlice";
import moment from "moment";
import EventDetailsShimmer from "components/EventDetailsShimmer";

const EventDetails = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { eventId } = useParams();
  const { data: event, isError } = useGetEventQuery({
    eventId,
  });
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Box>
      {event ? (
        <Grid width='90%' margin='auto' container mt={2}>
          <Grid
            sx={{ marginBottom: "1rem" }}
            item
            xs={12}
            sm={12}
            md={7}
            lg={8}
          >
            <EventHeader
              name={event.name}
              banner={event.bannerName}
              startDate={event.startDate}
              endDate={event.endDate}
              venue={event.venue}
              organizedBy={event.committee[0].name}
            />
            <Divider
              width={isNonMobile ? "90%" : "100%"}
              sx={{
                borderBottomWidth: 2,
                margin: "15px 0px",
              }}
            />
            <EventDescription description={event.description} />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={4}>
            <Box position={isNonMobile && "sticky"} top={isNonMobile && "5rem"}>
              {moment(new Date(event.startDate)).isAfter(moment()) ? (
                <Register event={event} />
              ) : event?.isPhotoUploaded ? (
                <EventImages photos={event.photos} />
              ) : (
                <Box
                  sx={{ display: "block", overflow: "auto" }}
                  marginBottom='1rem'
                >
                  <Box
                    sx={{
                      padding: " 0.7rem",
                      borderRadius: "0.55rem",
                      backgroundImage: "none",
                      backgroundColor: theme.palette.background.alt,
                    }}
                  >
                    <Typography
                      fontSize={isNonMobile ? "1.6rem" : "1.2rem"}
                      textDecoration='underline'
                      fontWeight='bold'
                      p='0.3rem 0rem 1rem 0rem'
                      color='#d12121'
                    >
                      <AnimateText text='EVENT CONCLUDED!' delayValue={0.05} />
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
            {!isNonMobile && <Footer />}
          </Grid>
        </Grid>
      ) : (
        <EventDetailsShimmer />
      )}
    </Box>
  );
};

export default EventDetails;
