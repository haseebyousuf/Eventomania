import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import React, { useState } from "react";

import EventCard from "./EventCard";
import EventCardShimmer from "./EventCardShimmer";
import EventFilter from "./EventFilter";

const EventContainer = ({
  title,
  filteredEvents,
  setFilteredEvents,
  events,
  isPast,
}) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  //STATES
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  return (
    <Box
      sx={{
        margin: isNonMobile ? "2rem 5rem 2rem 5rem" : "1rem 2rem 1rem 2rem",
      }}
    >
      <Typography
        fontSize='1.4rem'
        fontWeight='bold'
        variant='h2'
        p='1rem 0rem 1rem 0rem'
        color={theme.palette.secondary.main}
      >
        {title}
      </Typography>
      <EventFilter
        setAnimateCard={setAnimateCard}
        setFilteredEvents={setFilteredEvents}
        events={events}
        // committees={committees}
      />

      <Box
        component={motion.div}
        animate={animateCard}
        transition={{
          duration: 0.5,
          delayChildren: 0.5,
          ease: "easeInOut",
        }}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "7rem",
          flexWrap: "wrap",
          paddingBottom: "2rem",
        }}
      >
        {filteredEvents ? (
          filteredEvents.length > 0 ? (
            filteredEvents
              .sort((a, b) => {
                if (isPast) {
                  return (
                    moment(new Date(b.startDate)) -
                    moment(new Date(a.startDate))
                  );
                }
                return (
                  moment(new Date(a.startDate)) - moment(new Date(b.startDate))
                );
              })
              .map((event) => {
                return (
                  <EventCard isPast={isPast} key={event._id} event={event} />
                );
              })
          ) : (
            <Card
              sx={{
                width: "100%",
                padding: "0rem 2rem",
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
              }}
            >
              <CardContent>
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  flexDirection='row'
                >
                  <Typography
                    fontSize={isNonMobile ? "1.8rem" : "1.1rem"}
                    textDecoration='underline'
                    fontWeight='bold'
                    p='1rem 0rem 1rem 0rem'
                    color={theme.palette.secondary.main}
                  >
                    {isPast ? "NO PAST EVENTS!" : "NO UPCOMING EVENTS!"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )
        ) : (
          Array.from({ length: 6 }).map((element, index) => {
            return <EventCardShimmer key={index} />;
          })
        )}
      </Box>
    </Box>
  );
};

export default EventContainer;
