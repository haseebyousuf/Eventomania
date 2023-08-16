import React, { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { useCommitteeApprovedEventsQuery } from "state/eventApiSlice";
import { useGetUsersQuery } from "state/userApiSlice";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EventActions from "./EventActions";

const filterEvents = (data) => {
  return data.filter((event) => event.status === true);
};

const CommitteeEventLog = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const user = useSelector((state) => state.global.user);
  //state
  const [events, setEvents] = useState(null);

  //rtk query
  const { data: users } = useGetUsersQuery();
  const { data, isLoading } = useCommitteeApprovedEventsQuery({
    committeeId: user.committeeId,
  });

  useEffect(() => {
    if (!isLoading && data) {
      const filteredData = filterEvents(data);
      setEvents(filteredData);
    }
  }, [data, isLoading]);

  //sort function
  const dayInMonthComparator = (v1, v2) =>
    moment(new Date(v1)) - moment(new Date(v2));

  const columns = [
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 120,
      flex: 1,
      valueFormatter: ({ value }) => value[0].name,
      renderCell: (params) => {
        return params.row.createdBy[0].name;
      },
    },
    {
      field: "startDate",
      headerName: "Date",
      minWidth: 150,
      flex: 0.3,
      valueGetter: (params) => params.row.startDate,
      valueFormatter: ({ value }) =>
        moment(new Date(value)).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(new Date(params.row.startDate)).format("MMMM Do YYYY");
      },
      sortComparator: dayInMonthComparator,
    },
    {
      field: "registrations",
      headerName: "Registrations",
      type: "number",
      minWidth: 120,
      flex: 0.3,
      valueGetter: (params) => {
        return users?.filter((user) => user.event[0].id === params.row._id)
          .length;
      },
      renderCell: (params) => {
        return users?.filter((user) => user.event[0].id === params.row._id)
          .length;
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 250,
      renderCell: (params) => (
        <EventActions data={events} users={users} {...{ params }} />
      ),
    },
  ];
  const csvOptions = { fileName: "event-log" };

  return (
    <Box
      m={isNonMobile ? "1rem 2.5rem" : "0.8rem"}
      position='relative'
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "easeInOut" }}
    >
      <Header title='EVENT LOGS' subtitle='Generate Event Reports.' />
      <Box
        mt='20px'
        pb='20px'
        height='75vh'
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
          loading={isLoading || !events}
          getRowId={(row) => row._id}
          rows={events || []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { csvOptions, showExport: true, events },
          }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default CommitteeEventLog;
