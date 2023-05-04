import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Alert,
    Box,
    Button,
    Slide,
    Snackbar,
    Typography,
    useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import EventActions from "./EventActions";
import { useSelector } from "react-redux";
import UploadReport from "components/UploadReport";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
const ConvenorPastEvents = () => {
    const theme = useTheme();
    const user = useSelector((state) => state.user);

    const [data, setData] = useState({ events: null, isLoading: true });
    const [open, setOpen] = useState(false);

    const getEvents = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/events/getApprovedEvents`
            );
            const sortedEvents = response.data
                .sort((a, b) => moment(b.startDate) - moment(a.startDate))
                .filter((event) => event.committee[0].id === user.committeeId);
            setData({
                ...data,
                events: sortedEvents,
                isLoading: false,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getEvents();
        // eslint-disable-next-line
    }, []);
    const columns = [
        {
            field: "name",
            headerName: "Event Name",
            minWidth: 200,
        },
        {
            field: "committee",
            headerName: "Organized By",
            minWidth: 150,
            renderCell: (params) => {
                return <p color="#fff">{params.row.committee[0].name}</p>;
            },
        },
        {
            field: "createdBy",
            headerName: "Created By",
            minWidth: 150,
            renderCell: (params) => {
                return JSON.stringify(params.row.createdBy[0].name);
            },
        },
        {
            field: "startDate",
            headerName: "Date",
            minWidth: 120,
            renderCell: (params) => {
                return moment(params.row.startDate).format("MMMM Do YYYY");
            },
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 170,
            disableExport: true,
            renderCell: (params) => {
                return (
                    <Box color="success">
                        {params.row.status ? (
                            <Button>
                                <Typography
                                    backgroundColor="#66bb6a"
                                    variant="p"
                                    color="#fff"
                                    p={1}
                                    borderRadius="5px"
                                >
                                    REPORT GENERATED
                                </Typography>
                            </Button>
                        ) : moment(params.row.startDate).isAfter(moment()) ? (
                            <Button onClick={() => {}}>
                                <Typography
                                    variant="p"
                                    backgroundColor="rgb(255 167 38)"
                                    color="#fff"
                                    p={1}
                                    borderRadius="5px"
                                >
                                    Event Yet To Begin
                                </Typography>
                            </Button>
                        ) : (
                            <Box>
                                <UploadReport
                                    setOpen={setOpen}
                                    getEvents={getEvents}
                                    id={params.row._id}
                                />
                            </Box>
                        )}
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            width: 190,
            renderCell: (params) => (
                <EventActions setData={setData} data={data} {...{ params }} />
            ),
        },
    ];
    const SlideTransition = (props) => {
        return <Slide {...props} direction="down" />;
    };

    return (
        <Box m="1rem 2.5rem" position="relative">
            <Snackbar
                sx={{ position: "absolute" }}
                open={open}
                autoHideDuration={4000}
                TransitionComponent={SlideTransition}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Alert variant="filled" severity="success">
                    Report Uploaded Successfully
                </Alert>
            </Snackbar>
            <Box
                flexDirection="column"
                display="flex"
                justifyContent="center"
                alignItems="flex-center"
            >
                <Typography
                    fontSize="1.5rem"
                    textDecoration="underline"
                    fontWeight="bold"
                    color={theme.palette.secondary.main}
                >
                    PAST EVENTS
                </Typography>
                <Typography
                    fontSize="1rem"
                    textDecoration="underline"
                    fontWeight="bold"
                    color={theme.palette.secondary.main}
                >
                    List of All Past Events
                </Typography>
            </Box>
            <Box
                mt="20px"
                pb="20px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={data.isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data.events || []}
                    columns={columns}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    sx={{
                        "@media print": {
                            ".MuiDataGrid-main": { color: "#fff" },
                            ".MuiDataGrid-cellContent": { color: "#fff" },
                        },
                    }}
                ></DataGrid>
            </Box>
        </Box>
    );
};

export default ConvenorPastEvents;
