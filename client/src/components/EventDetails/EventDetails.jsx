import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import HomeNavbar from "../HomeNavbar";
import EventHeader from "./EventHeader";
import EventDescription from "./EventDescription";
import RecommendedAudience from "./RecommendedAudience";

import Register from "./Register";
import { motion } from "framer-motion";
const EventDetails = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      setEvent(location.state.event);
    }
    // eslint-disable-next-line
  }, []);
  const theme = useTheme();

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box height='100vh'>
      <HomeNavbar />
      {event && (
        <Grid width='90%' margin='auto' container spacing={2}>
          <Grid item xs={12} sm={12} md={7} lg={8}>
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
            <RecommendedAudience event={event} />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={4}>
            <Box position='sticky' top='5rem'>
              {!location.state.isPast ? (
                <Register event={event} />
              ) : (
                <Card
                  component={motion.div}
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  sx={{
                    padding: "0rem 2rem",
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.alt,
                  }}
                >
                  <CardContent>
                    <Box
                      display='flex'
                      justifyContent='center'
                      alignItems='flex-start'
                      flexDirection='column'
                    >
                      <Typography
                        fontSize='1.8rem'
                        textDecoration='underline'
                        fontWeight='bold'
                        p='1rem 0rem 1rem 0rem'
                        // color={
                        //     theme.palette.secondary.main
                        // }
                        color='#d12121'
                      >
                        THIS EVENT HAS CONCLUDED!
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default EventDetails;
