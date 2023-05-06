import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Alert,
    Box,
    Button,
    IconButton,
    Slide,
    Snackbar,
    Switch,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EventActions from "./EventActions";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
const AdminEventLog = () => {
    const theme = useTheme();
    const navigate = useNavigate();

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
    const columns = [
        {
            field: "name",
            headerName: "Event Name",
            resizable: true,
            minWidth: 250,
        },
        {
            field: "committee",
            headerName: "Organized By",
            valueFormatter: ({ value }) => value[0].name,
            minWidth: 250,
            renderCell: (params) => {
                return params.row.committee[0].name;
            },
        },
        {
            field: "startDate",
            headerName: "Date",
            valueFormatter: ({ value }) => moment(value).format("Do MMMM YYYY"),

            minWidth: 150,
            renderCell: (params) => {
                return moment(params.row.startDate).format("MMMM Do YYYY");
            },
        },
        {
            field: "registrations",
            headerName: "Registrations",
            type: "number",
            minWidth: 120,
            valueGetter: (params) => {
                return users.filter(
                    (user) => user.event[0].id === params.row._id
                ).length;
            },
            renderCell: (params) => {
                return users.filter(
                    (user) => user.event[0].id === params.row._id
                ).length;
            },
        },

        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            minWidth: 250,
            renderCell: (params) => (
                <EventActions data={data} users={users} {...{ params }} />
            ),
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
                    components={{ Toolbar: DataGridCustomToolbar }}
                    sx={{
                        "@media print": {
                            "& .MuiDataGrid-root": {
                                border: "none",
                                color: "#000",
                            },
                            "& .MuiDataGrid-cell": {
                                color: "#000",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                color: "#000",
                                textAlign: "center",
                                fontWeight: "bold",
                            },
                            "& .MuiDataGrid-main": {
                                color: "#000",
                            },
                            "& 	.MuiDataGrid-overlay": {
                                backgroundColor: `red !important`,
                            },
                        },
                    }}
                ></DataGrid>
            </Box>
        </Box>
    );
};

export default AdminEventLog;
