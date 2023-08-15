import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";

import EventContainer from "components/EventContainer";
import { usePublishedEventsQuery } from "state/eventApiSlice";
import Footer from "components/Footer";

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [pastEvents, setPastEvents] = useState(null);
  const [filteredPastEvents, setFilteredPastEvents] = useState(null);
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState(null);
  const { data: events, isLoading } = usePublishedEventsQuery();

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    if (!isLoading && events && events.length > 0) {
      setUpcomingEvents(
        events.filter((item) => {
          if (
            moment(new Date(item.startDate)).isAfter(moment()) ||
            moment(new Date(item.startDate)).isSame(moment())
          ) {
            return true;
          } else {
            return false;
          }
        })
      );
      setFilteredUpcomingEvents(
        events.filter(
          (item) =>
            moment(new Date(item.startDate)).isAfter(moment()) ||
            moment(new Date(item.startDate)).isSame(moment())
        )
      );
      setPastEvents(
        events.filter((item) =>
          moment(new Date(item.startDate)).isBefore(moment())
        )
      );

      setFilteredPastEvents(
        events.filter((item) =>
          moment(new Date(item.startDate)).isBefore(moment())
        )
      );
    }
  }, [events, isLoading]);

  return (
    <Box sx={{ display: "block", overflow: "auto" }}>
      <EventContainer
        title='UPCOMING EVENTS'
        filteredEvents={filteredUpcomingEvents}
        setFilteredEvents={setFilteredUpcomingEvents}
        events={upcomingEvents}
        isPast={false}
      />
      <EventContainer
        title='PAST EVENTS'
        filteredEvents={filteredPastEvents}
        setFilteredEvents={setFilteredPastEvents}
        events={pastEvents}
        isPast={true}
      />
      <Box sx={{ marginX: isNonMobile ? "5rem" : "2rem" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
