import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Divider,
    Grid,
    useMediaQuery,
    // useTheme,
} from "@mui/material";
// import { useSelector } from "react-redux";

import HomeNavbar from "../../components/HomeNavbar";
import EventHeader from "./EventHeader";
import EventDescription from "./EventDescription";
import RecomendedAudiance from "./RecomendedAudiance";
import Register from "./Register";
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
    }, []);
    // const mode = useSelector((state) => state.mode);
    // const theme = useTheme();

    const isNonMobile = useMediaQuery("(min-width: 600px)");

    return (
        <Box height="100vh">
            <HomeNavbar />
            {event && (
                <Grid width="90%" margin="auto" container spacing={2}>
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
                        <RecomendedAudiance event={event} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={4}>
                        <Box position="sticky" top="5rem">
                            {!location.state.isPast ? (
                                <Register />
                            ) : (
                                <Box> This Event Has Ended </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default EventDetails;
