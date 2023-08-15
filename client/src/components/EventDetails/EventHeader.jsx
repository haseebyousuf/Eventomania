import { Box, Typography, useTheme, useMediaQuery, Grid } from "@mui/material";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";
import moment from "moment";
import EventInfoBox from "components/EventInfoBox";

const EventHeader = ({ name, banner, startDate, venue, organizedBy }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  const eventDetails = [
    {
      icon: <TodayIcon color='secondary' />,
      title: "Date",
      value: moment(new Date(startDate)).format("Do MMMM YYYY, h:mm A"),
      last: false,
    },
    {
      icon: <LocationOnIcon color='secondary' />,
      title: "Venue",
      value: venue,
      last: false,
    },
    {
      icon: <Diversity1Icon color='secondary' />,
      title: "Organizers",
      value: organizedBy,
      last: true,
    },
  ];

  return (
    <>
      <img
        src={`${process.env.REACT_APP_BASE_URL}assets/${banner}`}
        alt='banner'
        width={isNonMobile ? "90%" : "100%"}
      />
      <Typography
        mt={2}
        fontSize={isNonMobile ? "2rem" : "1.5rem"}
        variant='h1'
        fontWeight='bold'
        width={isNonMobile ? "90%" : "100%"}
        color='secondary'
      >
        {name}
      </Typography>
      <Box
        borderRadius='0.55rem'
        width={isNonMobile ? "90%" : "100%"}
        mt={2}
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          p: "1rem ",
        }}
      >
        <Grid container spacing={isNonMobile ? 2 : 3}>
          {eventDetails.map((item, index) => (
            <EventInfoBox
              index={index}
              key={index}
              icon={item.icon}
              title={item.title}
              value={item.value}
              last={item.last}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default EventHeader;
