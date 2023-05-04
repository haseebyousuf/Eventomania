import {
    Box,
    Card,
    CardContent,
    MenuItem,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import EventCard from "components/EventCard";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import moment from "moment";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setAllEvents } from "state";

const Home = () => {
    const mode = useSelector((state) => state.mode);
    const theme = useTheme();
    const dispatch = useDispatch();

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [events, setEvents] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState(null);
    const [pastEvents, setPastEvents] = useState(null);
    const [filteredPastEvents, setFilteredPastEvents] = useState(null);
    const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState(null);

    const [committees, setCommittees] = useState(null);
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    const [activeUpcomingFilter, setActiveUpcomingFilter] = useState("all");
    const [activePastFilter, setActivePastFilter] = useState("all");

    useEffect(() => {
        const getAllEvents = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/events/getEvents`
                );
                dispatch(
                    setAllEvents({
                        allEvents: response.data,
                    })
                );
            } catch (error) {
                console.log(error);
            }
        };
        getAllEvents();
        const getCommittees = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/committee/get-committees`
                );
                setCommittees({
                    ...committees,
                    committees: response.data.map(
                        (committee) => committee.name
                    ),
                    isLoading: false,
                });
            } catch (error) {
                console.error(error);
            }
        };
        const getEvents = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/events/getPublishedEvents`
                );
                setEvents(response.data);
                setUpcomingEvents(
                    response.data.filter((item) => {
                        if (
                            moment(item.startDate).isAfter(moment()) ||
                            moment(item.startDate).isSame(
                                moment(),
                                "day",
                                "month",
                                "year"
                            )
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
                            moment(item.startDate).isSame(
                                moment(),
                                "day",
                                "month",
                                "year"
                            )
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
        getEvents();
        getCommittees();
    }, []);

    const handleUpcomingEventFilter = ({ target }) => {
        setActiveUpcomingFilter(target.value);
        setAnimateCard([{ y: 100, opacity: 0 }]);

        setTimeout(() => {
            setAnimateCard([{ y: 0, opacity: 1 }]);
            if (target.value === "all") {
                setFilteredUpcomingEvents(upcomingEvents);
            } else {
                setFilteredUpcomingEvents(
                    upcomingEvents.filter(
                        (event) => event.committee[0].name === target.value
                    )
                );
            }
        }, 500);
    };
    const handlePastEventFilter = ({ target }) => {
        setActivePastFilter(target.value);
        setAnimateCard([{ y: 100, opacity: 0 }]);

        setTimeout(() => {
            setAnimateCard([{ y: 0, opacity: 1 }]);
            if (target.value === "all") {
                setFilteredPastEvents(pastEvents);
            } else {
                setFilteredPastEvents(
                    pastEvents.filter(
                        (event) => event.committee[0].name === target.value
                    )
                );
            }
        }, 500);
    };

    return (
        <>
            {events ? (
                <Box
                    sx={{
                        height: "100vh",
                    }}
                >
                    <HomeNavbar />
                    <Box
                        sx={{
                            margin: isNonMobile
                                ? "2rem 5rem 2rem 5rem"
                                : "1rem 2rem 1rem 2rem",
                        }}
                    >
                        <h1>Upcoming Events...</h1>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                paddingBottom: "2rem",
                            }}
                        >
                            <Typography>Filter:</Typography>
                            <TextField
                                margin="dense"
                                color="secondary"
                                name="upcomingFilter"
                                variant="outlined"
                                sx={{ width: isNonMobile ? "17rem" : "18rem" }}
                                notched="true"
                                value={activeUpcomingFilter}
                                id="committee"
                                select
                                label="Committee"
                                onChange={handleUpcomingEventFilter}
                            >
                                <MenuItem value="all" selected>
                                    All
                                </MenuItem>
                                {committees &&
                                    Object.values(committees.committees).map(
                                        (committee) => (
                                            <MenuItem
                                                key={committee}
                                                value={committee}
                                            >
                                                {committee}
                                            </MenuItem>
                                        )
                                    )}
                            </TextField>
                        </Box>

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
                                gap: "5rem",
                                flexWrap: "wrap",
                                paddingBottom: "2rem",
                            }}
                        >
                            {events && filteredUpcomingEvents.length > 0 ? (
                                filteredUpcomingEvents
                                    .sort(
                                        (a, b) =>
                                            moment(a.startDate) -
                                            moment(b.startDate)
                                    )
                                    .map((event) => {
                                        return (
                                            <EventCard
                                                isPast={false}
                                                key={event._id}
                                                event={event}
                                            />
                                        );
                                    })
                            ) : (
                                <Card
                                    sx={{
                                        width: "100%",
                                        padding: "0rem 2rem",
                                        backgroundColor:
                                            mode === "dark"
                                                ? "transparent"
                                                : theme.palette.background.alt,
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            flexDirection="row"
                                        >
                                            <Typography
                                                fontSize="1.8rem"
                                                textDecoration="underline"
                                                fontWeight="bold"
                                                p="1rem 0rem 1rem 0rem"
                                                color={
                                                    theme.palette.secondary.main
                                                }
                                            >
                                                NO UPCOMING EVENTS!
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            margin: isNonMobile
                                ? "1rem 5rem 1rem 5rem"
                                : "1rem 2rem 1rem 2rem",
                        }}
                    >
                        <h1>Past Events...</h1>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                paddingBottom: "2rem",
                            }}
                        >
                            <Typography>Filter:</Typography>
                            <TextField
                                margin="dense"
                                color="secondary"
                                name="pastFilter"
                                variant="outlined"
                                sx={{ width: isNonMobile ? "17rem" : "18rem" }}
                                notched="true"
                                value={activePastFilter}
                                id="committee"
                                select
                                label="Committee"
                                onChange={handlePastEventFilter}
                            >
                                <MenuItem value="all" selected>
                                    All
                                </MenuItem>
                                {committees &&
                                    Object.values(committees.committees).map(
                                        (committee) => (
                                            <MenuItem
                                                key={committee}
                                                value={committee}
                                            >
                                                {committee}
                                            </MenuItem>
                                        )
                                    )}
                            </TextField>
                        </Box>

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
                                gap: "5rem",
                                flexWrap: "wrap",
                                paddingBottom: "2rem",
                            }}
                        >
                            {events && filteredPastEvents.length > 0 ? (
                                filteredPastEvents
                                    .sort(
                                        (a, b) =>
                                            moment(b.startDate) -
                                            moment(a.startDate)
                                    )
                                    .map((event) => {
                                        return (
                                            <EventCard
                                                isPast={true}
                                                key={event._id}
                                                event={event}
                                            />
                                        );
                                    })
                            ) : (
                                <Card
                                    sx={{
                                        width: "100%",
                                        padding: "0rem 2rem",
                                        backgroundColor:
                                            mode === "dark"
                                                ? "transparent"
                                                : theme.palette.background.alt,
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            flexDirection="row"
                                        >
                                            <Typography
                                                fontSize="1.8rem"
                                                textDecoration="underline"
                                                fontWeight="bold"
                                                p="1rem 0rem 1rem 0rem"
                                                color={
                                                    theme.palette.secondary.main
                                                }
                                            >
                                                NO PAST EVENTS!
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            )}
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Rings
                        height="100"
                        width="100"
                        color={theme.palette.secondary.main}
                        radius="6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rings-loading"
                    />
                </Box>
            )}
        </>
    );
};

export default Home;
