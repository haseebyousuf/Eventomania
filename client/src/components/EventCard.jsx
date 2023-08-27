import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EventCard = ({ event, isPast }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      component={motion.div}
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      sx={{
        width: isNonMobile ? "20rem" : "100%",
      }}
    >
      <Card
        sx={{
          width: "100%",
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <CardMedia
          image={`${process.env.REACT_APP_BASE_URL}assets/${event.bannerName}`}
          title='Event Banner'
          crossOrigin='anonymous'
          sx={{
            height: 150,
            padding: "1em 1em 0 1em",
          }}
        />
        <CardContent>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='flex-start'
            flexDirection='column'
            p='0rem 0.5rem 0rem 0.5rem'
          >
            <Tooltip title={event.name}>
              <Typography
                fontSize='1.1rem'
                textDecoration='underline'
                fontWeight='bold'
                p='1rem 0rem 1rem 0rem'
                width='90%'
                color={theme.palette.secondary.main}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                }}
              >
                {event.name}
              </Typography>
            </Tooltip>
            <Typography
              fontSize='0.8rem'
              textDecoration='underline'
              color={theme.palette.secondary}
              paddingBottom='0.6rem'
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                <EventIcon color='secondary' />{" "}
              </span>
              {moment(new Date(event.startDate)).format("Do MMM YYYY, h:mm A")}
            </Typography>
            <Typography
              fontSize='0.8rem'
              textDecoration='underline'
              color={theme.palette.secondary}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                <LocationOnIcon color='secondary' />{" "}
              </span>
              {event.venue}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          display='flex'
          sx={{
            marginBottom: "0.5rem",
            justifyContent: "center",
          }}
        >
          <Button
            name='event_btn'
            variant='contained'
            type='submit'
            sx={{
              fontWeight: "bold",
            }}
            size='large'
            color='secondary'
            onClick={() => {
              navigate(`/EventDetails/${event._id}`);
            }}
          >
            {!isPast ? "Register Now" : "View Details"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EventCard;
