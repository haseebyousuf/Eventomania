import React, { useEffect, useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EventIcon from "@mui/icons-material/Event";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useSelector } from "react-redux";

import { useCommitteeDashboardStatsMutation } from "state/dashboardApiSlice";
import Header from "components/Header";
import StatBox from "components/StatBox";
import OverallStats from "components/OverallStats";
import BreakdownChart from "components/BreakdownChart";
import DashboardShimmer from "components/DashboardShimmer";
import Footer from "components/Footer";

const CommitteeDashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isNonMobile = useMediaQuery("(min-width: 700px)");
  const user = useSelector((state) => state.global.user);

  //state
  const [data, setData] = useState(null);
  // rtk query
  const [committeeDashboardStats] = useCommitteeDashboardStatsMutation();

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await committeeDashboardStats({
          committeeId: user.committeeId,
        }).unwrap();
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    getStats();
  }, [committeeDashboardStats, user.committeeId]);

  const columns = [
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 200,
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
      valueFormatter: ({ value }) =>
        moment(new Date(value)).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(new Date(params.row.startDate)).format("MMMM Do YYYY");
      },
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 150,
      flex: 1,
      valueFormatter: ({ value }) => value[0].name,
      renderCell: (params) => {
        return params.row.createdBy[0].name;
      },
    },
  ];

  return (
    <>
      {data ? (
        <Box m={isNonMobile ? "1.5rem 2.5rem" : "1.5rem 1.8rem"}>
          <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />

          <Box
            mt='20px'
            display='grid'
            gridTemplateColumns='repeat(12, 1fr)'
            gridAutoRows='160px'
            gap='20px'
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
            {/* ROW 1 */}
            <StatBox
              title='Total Events'
              value={data && data.approvedEventsCount}
              description='This Year'
              icon={
                <EventIcon
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: "26px",
                  }}
                />
              }
            />
            <StatBox
              title='Pending'
              value={data && data.unapprovedEventsCount}
              description='Unapproved'
              icon={
                <PendingActionsIcon
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: "26px",
                  }}
                />
              }
            />
            <Box
              gridColumn='span 8'
              gridRow='span 2'
              backgroundColor={theme.palette.background.alt}
              p='1rem 0rem'
              borderRadius='0.55rem'
            >
              <OverallStats
                data={
                  isNonMobile ? data.eventsPerMonth : data.eventsPerMonthMobile
                }
              />
            </Box>
            <StatBox
              title='Management'
              value={data && data.adminsCount}
              description='Members'
              icon={
                <ManageAccountsIcon
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: "26px",
                  }}
                />
              }
            />
            <StatBox
              title='Report'
              value={data && data.pendingReportCount}
              description='Pending Reports'
              icon={
                <AssessmentIcon
                  sx={{
                    color: theme.palette.secondary.light,
                    fontSize: "26px",
                  }}
                />
              }
            />

            {/* ROW 2 */}
            <Box
              gridColumn='span 7'
              gridRow='span 3'
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary.main,
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
                  color: `${theme.palette.secondary.main} !important`,
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
              gridColumn='span 5'
              gridRow='span 3'
              backgroundColor={theme.palette.background.alt}
              p='1.5rem'
              borderRadius='0.55rem'
            >
              <Typography
                variant='h6'
                sx={{ color: theme.palette.secondary.dark }}
              >
                Events By Members
              </Typography>
              <BreakdownChart
                data={data.eventsPerMember}
                totalEvents={data.approvedEventsCount}
              />
              <Typography
                p='0 0.6rem'
                fontSize='0.8rem'
                sx={{ color: theme.palette.secondary.accent }}
              >
                Breakdown of information via Members for Events organized for
                this year.
              </Typography>
            </Box>
          </Box>
          <Footer />
        </Box>
      ) : (
        <DashboardShimmer isNonMediumScreens={isNonMediumScreens} />
      )}
    </>
  );
};

export default CommitteeDashboard;
