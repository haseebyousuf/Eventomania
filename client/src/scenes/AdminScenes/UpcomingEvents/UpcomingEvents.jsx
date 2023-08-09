import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { motion } from "framer-motion";

import Actions from "./Actions";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Header from "components/Header";
import { useApprovedEventsQuery } from "state/eventApiSlice";
import { useGetUsersQuery } from "state/userApiSlice";

const filterAndSortData = (data) => {
  return data
    .filter(
      (event) =>
        event.isApproved === true && moment(event.startDate).isAfter(moment())
    )
    .sort((a, b) => moment(b.startDate) - moment(a.startDate));
};

const UpcomingEvents = () => {
  //state
  const [events, setEvents] = useState(null);

  //RTK query
  const { data, isLoading } = useApprovedEventsQuery();
  const { data: users } = useGetUsersQuery();

  //useEffect
  useEffect(() => {
    if (data) {
      const filteredData = filterAndSortData(data);
      setEvents(filteredData);
    }
  }, [data]);

  //hooks
  const theme = useTheme();

  //sort function
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
      headerName: "Event Date",
      minWidth: 120,
      flex: 0.8,
      valueGetter: (params) => params.row.startDate,
      valueFormatter: ({ value }) => moment(value).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(params.row.startDate).format("MMMM Do YYYY");
      },
      sortComparator: dayInMonthComparator,
    },

    {
      field: "registrations",
      headerName: "Registrations",
      type: "number",
      minWidth: 100,
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
      width: 190,
      renderCell: (params) => (
        <Actions users={users} data={events} {...{ params }} />
      ),
    },
  ];

  return (
    <Box
      m='1rem 2.5rem'
      position='relative'
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, ease: "easeInOut" }}
    >
      <Header title='UPCOMING EVENTS' subtitle='List of All Upcoming Events.' />
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={events || []}
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

export default UpcomingEvents;
