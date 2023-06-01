import {
    Divider,
    Paper,
    Stack,
    Typography,
    styled,
    useMediaQuery,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const EventHeader = ({
    name,
    banner,
    startDate,
    endDate,
    venue,
    organizedBy,
}) => {
    const mode = useSelector((state) => state.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor:
            mode === "dark" ? "transparent" : theme.palette.background.alt,
        // ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));
    return (
        <>
            <img
                src={`${process.env.REACT_APP_BASE_URL}/assets/${banner}`}
                alt="banner"
                width={isNonMobile ? "90%" : "100%"}
            />
            <Typography
                mt={2}
                fontSize={isNonMobile ? "2rem" : "1.5rem"}
                varient="h1"
                fontWeight="bold"
                width={isNonMobile ? "90%" : "100%"}
            >
                {name}
            </Typography>
            <Stack
                width={isNonMobile ? "90%" : "100%"}
                mt={2}
                mb={2}
                direction={isNonMobile ? "row" : "column"}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
            >
                <Item
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <TodayIcon color="secondary" />{" "}
                    <Typography fontSize={!isNonMobile && "1rem"}>
                        {isNonMobile
                            ? `${moment(startDate).format(
                                  "MMMM Do YYYY, h:mm A"
                              )} - ${moment(endDate).format(
                                  "MMMM Do YYYY, h:mm A"
                              )}`
                            : moment(startDate).format("MMMM Do YYYY, h:mm A")}
                    </Typography>
                </Item>
                {!isNonMobile && (
                    <Item
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <EventIcon color="secondary" />{" "}
                        <Typography fontSize={!isNonMobile && "1rem"}>
                            {moment(endDate).format("MMMM Do YYYY, h:mm A")}
                        </Typography>
                    </Item>
                )}
                <Item
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <LocationOnIcon color="secondary" />
                    <Typography fontSize={!isNonMobile && "1rem"}>
                        {venue}
                    </Typography>
                </Item>
            </Stack>
            <Stack
                width={isNonMobile ? "90%" : "100%"}
                mt={2}
                mb={2}
                direction={isNonMobile ? "row" : "column"}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
            >
                <Item
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <Typography fontSize={!isNonMobile && "1rem"}>
                        Organized By:
                    </Typography>
                    <Typography
                        color="secondary"
                        fontSize={!isNonMobile && "1rem"}
                    >
                        {organizedBy}
                    </Typography>
                </Item>
            </Stack>
        </>
    );
};

export default EventHeader;
