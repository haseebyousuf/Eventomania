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
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Header from "components/Header";
import { motion } from "framer-motion";
const PastEvents = () => {
    const theme = useTheme();
    const [data, setData] = useState({ events: null, isLoading: true });
    const [users, setUsers] = useState(null);
    const [snackbarData, setSnackbarData] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const getEvents = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/events/getApprovedEvents`
            );
            const sortedEvents = response.data.sort(
                (a, b) => moment(b.startDate) - moment(a.startDate)
            );
            setData({ ...data, events: sortedEvents, isLoading: false });
            const userResponse = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/user/getUsers`
            );
            setUsers(userResponse.data);
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
                setSnackbarData({
                    ...snackbarData,
                    open: true,
                    message: isPublished
                        ? "Event Unpublished"
                        : "Event Published",
                    severity: "success",
                });
                // setMessage(
                //     isPublished ? "Event Unpublished" : "Event Published"
                // );
                // setOpen(true);
                setTimeout(() => {
                    setSnackbarData({
                        ...snackbarData,
                        open: false,
                    });
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
    const dayInMonthComparator = (v1, v2) => moment(v1) - moment(v2);
    const columns = [
        {
            field: "name",
            headerName: "Event Name",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "committee",
            headerName: "Organized By",
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => params.value[0].name,
            valueFormatter: ({ value }) => value[0].name,
            renderCell: (params) => {
                return params.row.committee[0].name;
            },
        },
        {
            field: "createdBy",
            headerName: "Created By",
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => params.value[0].name,
            valueFormatter: ({ value }) => value[0].name,
            renderCell: (params) => {
                return params.row.createdBy[0].name;
            },
        },
        {
            field: "startDate",
            headerName: "Date",
            minWidth: 100,
            flex: 0.5,
            valueGetter: (params) => params.row.startDate,
            valueFormatter: ({ value }) => moment(value).format("Do MMMM YYYY"),
            renderCell: (params) => {
                return moment(params.row.startDate).format("MMMM Do YYYY");
            },
            sortComparator: dayInMonthComparator,
        },
        {
            field: "isPublished",
            headerName: "Status",
            minWidth: 140,
            flex: 0.3,
            valueGetter: (params) => params.row.status,
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
                <EventActions
                    users={users}
                    getEvents={getEvents}
                    snackbarData={snackbarData}
                    setSnackbarData={setSnackbarData}
                    setData={setData}
                    data={data}
                    {...{ params }}
                />
            ),
        },
    ];
    const SlideTransition = (props) => {
        return <Slide {...props} direction="down" />;
    };

    return (
        <Box
            m="1rem 2.5rem"
            position="relative"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, ease: "easeInOut" }}
        >
            <Snackbar
                sx={{ position: "absolute" }}
                open={snackbarData.open}
                autoHideDuration={4000}
                TransitionComponent={SlideTransition}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Alert variant="filled" severity={snackbarData.severity}>
                    {snackbarData.message}
                </Alert>
            </Snackbar>
            <Header title="PAST EVENTS" subtitle="List of All Past Events." />
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
                    componentsProps={{
                        toolbar: { showExport: false, data },
                    }}
                ></DataGrid>
            </Box>
        </Box>
    );
};

export default PastEvents;
