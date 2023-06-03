import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { Diversity3Outlined } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EventIcon from "@mui/icons-material/Event";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import StatBox from "components/StatBox";
import OverallStats from "components/OverallStats";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import BreakdownChart from "components/BreakdownChart";
const Dashboard = () => {
    const [data, setData] = useState(null);
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    useEffect(() => {
        const getStats = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/dashboard/adminDashboardStats`
                );

                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getStats();
    }, []);
    const columns = [
        {
            field: "name",
            headerName: "Event Name",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "venue",
            headerName: "Venue",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "startDate",
            headerName: "Starts On",
            minWidth: 100,
            flex: 1,
            sortable: false,
            valueGetter: (params) => params.row.startDate,
            valueFormatter: ({ value }) => moment(value).format("Do MMMM YYYY"),
            renderCell: (params) => {
                return moment(params.row.startDate).format("MMMM Do YYYY");
            },
        },
        {
            field: "committee",
            headerName: "Organized By",
            minWidth: 150,
            flex: 1,
            valueFormatter: ({ value }) => value[0].name,
            renderCell: (params) => {
                return params.row.committee[0].name;
            },
        },
    ];

    return (
        <>
            {data && (
                <Box m="1.5rem 2.5rem">
                    <Header
                        title="DASHBOARD"
                        subtitle="Welcome to your dashboard"
                    />

                    <Box
                        mt="20px"
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gridAutoRows="160px"
                        gap="20px"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMediumScreens
                                    ? undefined
                                    : "span 12",
                            },
                        }}
                    >
                        {/* ROW 1 */}
                        <StatBox
                            title="Total Events"
                            value={data && data.approvedEventsCount}
                            description="This Year"
                            icon={
                                <EventIcon
                                    sx={{
                                        color: theme.palette.secondary[300],
                                        fontSize: "26px",
                                    }}
                                />
                            }
                        />
                        <StatBox
                            title="Pending"
                            value={data && data.unapprovedEventsCount}
                            description="Not Approved"
                            icon={
                                <PendingActionsIcon
                                    sx={{
                                        color: theme.palette.secondary[300],
                                        fontSize: "26px",
                                    }}
                                />
                            }
                        />
                        <Box
                            gridColumn="span 8"
                            gridRow="span 2"
                            backgroundColor={theme.palette.background.alt}
                            p="1rem"
                            borderRadius="0.55rem"
                        >
                            <OverallStats data={data.eventsPerMonth} />
                        </Box>
                        <StatBox
                            title="Management"
                            value={data && data.adminsCount}
                            description="Members"
                            icon={
                                <ManageAccountsIcon
                                    sx={{
                                        color: theme.palette.secondary[300],
                                        fontSize: "26px",
                                    }}
                                />
                            }
                        />
                        <StatBox
                            title="Committees"
                            value={data && data.committeesCount}
                            description="Total"
                            icon={
                                <Diversity3Outlined
                                    sx={{
                                        color: theme.palette.secondary[300],
                                        fontSize: "26px",
                                    }}
                                />
                            }
                        />

                        {/* ROW 2 */}
                        <Box
                            gridColumn="span 7"
                            gridRow="span 3"
                            sx={{
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor:
                                        theme.palette.background.alt,
                                    color: theme.palette.secondary[100],
                                    borderBottom: "none",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor:
                                        theme.palette.primary.light,
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    backgroundColor:
                                        theme.palette.background.alt,
                                    color: theme.palette.secondary[100],
                                    borderTop: "none",
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text":
                                    {
                                        color: `${theme.palette.secondary[200]} !important`,
                                    },
                            }}
                        >
                            <DataGrid
                                loading={!data}
                                getRowId={(row) => row._id}
                                rows={(data && data.upcomingEvents) || []}
                                columns={columns}
                            />
                        </Box>
                        <Box
                            gridColumn="span 5"
                            gridRow="span 3"
                            backgroundColor={theme.palette.background.alt}
                            p="1.5rem"
                            borderRadius="0.55rem"
                        >
                            <Typography
                                variant="h6"
                                sx={{ color: theme.palette.secondary[100] }}
                            >
                                Events By Committees
                            </Typography>
                            <BreakdownChart data={data.eventsPerCommittee} />
                            <Typography
                                p="0 0.6rem"
                                fontSize="0.8rem"
                                sx={{ color: theme.palette.secondary[200] }}
                            >
                                Breakdown of information via Committees for
                                Events organized for this year.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Dashboard;
