import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import moment from "moment";
import EventContainer from "components/EventContainer";

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [pastEvents, setPastEvents] = useState(null);
  const [filteredPastEvents, setFilteredPastEvents] = useState(null);
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState(null);
  const [committees, setCommittees] = useState(null);

  useEffect(() => {
    getEvents();
    getCommittees();
    // eslint-disable-next-line
  }, []);
  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/events/getPublishedEvents`
      );
      setUpcomingEvents(
        response.data.filter((item) => {
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
      setPastEvents(
        response.data.filter((item) =>
          moment(item.startDate).isBefore(moment())
        )
      );
      setFilteredUpcomingEvents(
        response.data.filter(
          (item) =>
            moment(item.startDate).isAfter(moment()) ||
            moment(item.startDate).isSame(moment(), "day", "month", "year")
        )
      );
      setFilteredPastEvents(
        response.data.filter((item) =>
          moment(item.startDate).isBefore(moment())
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getCommittees = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/committee/get-committees`
      );
      setCommittees({
        ...committees,
        committees: response.data.map((committee) => committee.name),
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
        committees={committees}
        isPast={false}
      />
      <EventContainer
        title='PAST EVENTS'
        filteredEvents={filteredPastEvents}
        setFilteredEvents={setFilteredPastEvents}
        events={pastEvents}
        committees={committees}
        isPast={true}
      />
    </Box>
  );
};

export default Home;
