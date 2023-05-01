import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Alert,
    Box,
    Slide,
    Snackbar,
    Switch,
    Typography,
    useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import EventActions from "./EventActions";
const PastEvents = () => {
    const theme = useTheme();
    const [data, setData] = useState({ events: null, isLoading: true });
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    const getEvents = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/events/getApprovedEvents`
            );
            setData({ ...data, events: response.data, isLoading: false });
        } catch (error) {
            console.error(error);
        }
    };
    const handlePublishBtn = async (id, isPublished) => {
        const data = { id, isPublished };
        try {
            const savedCommitteeResponse = await axios({
                method: "post",

                url: `${process.env.REACT_APP_BASE_URL}/events/togglePublish`,
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(data),
            });
            const savedCommittee = await savedCommitteeResponse.data;
            if (savedCommittee) {
                getEvents();
                setMessage(
                    isPublished ? "Event Unpublished" : "Event Published"
                );
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 4000);
            }
        } catch (error) {
            alert("There is some error! Please try again later.");
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
                return params.row.committee[0].name;
            },
        },
        {
            field: "createdBy",
            headerName: "Created By",
            minWidth: 150,
            renderCell: (params) => {
                return params.row.createdBy[0].name;
            },
        },
        {
            field: "startDate",
            headerName: "Date",
            minWidth: 100,
            renderCell: (params) => {
                return moment(params.row.startDate).format("MMMM Do YYYY");
            },
        },
        {
            field: "isPublished",
            headerName: "Status",
            minWidth: 140,
            renderCell: (params) => {
                return (
                    <Box color="success">
                        {params.row.status ? (
                            <Typography
                                backgroundColor="#66bb6a"
                                variant="p"
                                color="#fff"
                                p={1}
                                borderRadius="5px"
                            >
                                Report Generated
                            </Typography>
                        ) : (
                            <Typography
                                variant="p"
                                backgroundColor="#f44336"
                                color="#fff"
                                p={1}
                                borderRadius="5px"
                            >
                                Report is Pending
                            </Typography>
                        )}
                    </Box>
                );
            },
        },
        {
            field: "display",
            headerName: "Show/Hide",
            type: "actions",
            width: 100,
            renderCell: (params) => (
                <Switch
                    color="success"
                    onClick={() =>
                        handlePublishBtn(params.row._id, params.row.isPublished)
                    }
                    checked={params.row.isPublished ? true : false}
                />
            ),
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
                    {message}
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
                ></DataGrid>
            </Box>
        </Box>
    );
};

export default PastEvents;
