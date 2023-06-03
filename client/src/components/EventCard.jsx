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
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EventCard = ({ event, isPast }) => {
    // const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box
            component={motion.div}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut",
            }}
            sx={{
                width: isNonMobile ? "20rem" : "100%",
                // paddingBottom: "2rem",
            }}
        >
            <Card
                sx={{
                    // padding: "0rem 2rem",
                    // height: "25rem",
                    width: "100%",
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.alt,
                }}
            >
                <CardMedia
                    image={`${process.env.REACT_APP_BASE_URL}/assets/${event.bannerName}`}
                    title="Event Banner"
                    sx={{
                        height: 150,
                        padding: "1em 1em 0 1em",
                    }}
                />
                <CardContent>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="flex-start"
                        flexDirection="column"
                        p="0rem 0.5rem 0rem 0.5rem"
                    >
                        <Tooltip title={event.name}>
                            <Typography
                                fontSize="1.1rem"
                                textDecoration="underline"
                                fontWeight="bold"
                                p="1rem 0rem 1rem 0rem"
                                width="90%"
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
                            fontSize="0.8rem"
                            textDecoration="underline"
                            color={theme.palette.secondary}
                            paddingBottom="0.6rem"
                        >
                            <span style={{ fontWeight: "bold" }}>
                                Start Time:{" "}
                            </span>
                            {moment(event.startDate).format(
                                "MMMM Do YYYY, h:mm A"
                            )}
                        </Typography>
                        <Typography
                            fontSize="0.8rem"
                            textDecoration="underline"
                            color={theme.palette.secondary}
                        >
                            <span style={{ fontWeight: "bold" }}>
                                End Time:{" "}
                            </span>
                            {moment(event.endDate).format(
                                "MMMM Do YYYY, h:mm A"
                            )}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions
                    display="flex"
                    sx={{
                        marginBottom: "0.5rem",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            color: "black",
                            fontWeight: "bold",
                        }}
                        size="large"
                        color="secondary"
                        onClick={() => {
                            navigate(`/EventDetails/${event._id}`, {
                                state: { event, isPast },
                            });
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
