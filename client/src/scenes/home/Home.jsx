import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";

import HomeNavbar from "../../components/HomeNavbar";
import EventContainer from "components/EventContainer";
import { usePublishedEventsQuery } from "state/eventApiSlice";

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [pastEvents, setPastEvents] = useState(null);
  const [filteredPastEvents, setFilteredPastEvents] = useState(null);
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState(null);
  const { data: events, isLoading } = usePublishedEventsQuery();

  useEffect(() => {
    if (!isLoading && events && events.length > 0) {
      setUpcomingEvents(
        events.filter((item) => {
          if (
            moment(item.startDate).isAfter(moment()) ||
            moment(item.startDate).isSame(moment(), "day", "month", "year")
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
            moment(item.startDate).isAfter(moment()) ||
            moment(item.startDate).isSame(moment(), "day", "month", "year")
        )
      );
      setPastEvents(
        events.filter((item) => moment(item.startDate).isBefore(moment()))
      );

      setFilteredPastEvents(
        events.filter((item) => moment(item.startDate).isBefore(moment()))
      );
    }
  }, [events, isLoading]);

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <HomeNavbar />
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
    </Box>
  );
};

export default Home;
