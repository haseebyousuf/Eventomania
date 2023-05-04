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
const AdminEventLog = () => {
    const theme = useTheme();
    const [users, setUsers] = useState(null);
    const [data, setData] = useState({ events: null, isLoading: true });

    const getEvents = async () => {
        try {
            const eventResponse = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/events/getApprovedEvents`
            );
            const sortedEvents = eventResponse.data.sort(
                (a, b) => moment(b.startDate) - moment(a.startDate)
            );
            const userResponse = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/user/getUsers`
            );
            setUsers(userResponse.data);
            setData({
                ...data,
                events: sortedEvents.filter((item) => item.status === true),
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
    console.log(users);
    console.log(data.events);
    const columns = [
        {
            field: "name",
            headerName: "Event Name",
            resizable: true,
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
            field: "startDate",
            headerName: "Date",
            minWidth: 100,
            renderCell: (params) => {
                return moment(params.row.startDate).format("MMMM Do YYYY");
            },
        },
        {
            field: "registrations",
            headerName: "Total Registrations",
            minWidth: 150,
            renderCell: (params) => {
                return users.filter(
                    (user) => user.event[0].id === params.row._id
                ).length;
            },
        },
        {
            field: "students",
            headerName: "Students",
            minWidth: 150,
            renderCell: (params) => {
                return users.filter(
                    (user) =>
                        user.event[0].id === params.row._id &&
                        user.type === "student"
                ).length;
            },
        },
        {
            field: "faculty",
            headerName: "Faculty",
            minWidth: 150,
            renderCell: (params) => {
                return users.filter(
                    (user) =>
                        user.event[0].id === params.row._id &&
                        user.type === "faculty"
                ).length;
            },
        },
        {
            field: "report",
            headerName: "Report",
            minWidth: 150,
        },
    ];

    return (
        <Box m="1rem 2.5rem" position="relative">
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
                    EVENT LOGS
                </Typography>
                <Typography
                    fontSize="1rem"
                    textDecoration="underline"
                    fontWeight="bold"
                    color={theme.palette.secondary.main}
                >
                    Generate Event Reports
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

export default AdminEventLog;
