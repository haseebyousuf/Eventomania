import React, { useState, useEffect } from "react";
import { Box, Button, Switch, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import EventActions from "./EventActions";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Header from "components/Header";
import {
  useApprovedEventsQuery,
  useTogglePublishMutation,
} from "state/eventApiSlice";
import { useGetUsersQuery } from "state/userApiSlice";

const filterAndSortData = (data) => {
  return data
    .filter(
      (event) =>
        event.isApproved === true &&
        moment(new Date(event.startDate)).isBefore(moment())
    )
    .sort(
      (a, b) => moment(new Date(b.startDate)) - moment(new Date(a.startDate))
    );
};

const PastEvents = () => {
  //state
  const [events, setEvents] = useState(null);

  //RTK query
  const { data, isLoading } = useApprovedEventsQuery();
  const { data: users } = useGetUsersQuery();
  const [togglePublish] = useTogglePublishMutation();

  //useEffect
  useEffect(() => {
    if (data) {
      const filteredData = filterAndSortData(data);
      setEvents(filteredData);
    }
  }, [data]);

  //hooks
  const theme = useTheme();

  //handlers
  const handlePublishBtn = async (id, isPublished) => {
    const data = { id, isPublished };
    try {
      const res = await togglePublish(data).unwrap();
      if (res) {
        toast(
          isPublished
            ? "Event Unpublished from Home Page"
            : "Event Published on Home Page",
          {
            type: isPublished ? "error" : "success",
          }
        );
      }
    } catch (error) {
      toast.error("There was some error! Please Try again.");
    }
  };

  //sort function
  const dayInMonthComparator = (v1, v2) =>
    moment(new Date(v1)) - moment(new Date(v2));

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
      valueFormatter: ({ value }) =>
        moment(new Date(value)).format("Do MMM YYYY"),
      renderCell: (params) => {
        return moment(new Date(params.row.startDate)).format("Do MMM YYYY");
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
      field: "isPublished",
      headerName: "Status",
      minWidth: 160,
      flex: 0.3,
      valueGetter: (params) => params.row.status,
      renderCell: (params) => {
        return (
          <Box color='success'>
            {params.row.status ? (
              <Button
                disabled
                variant='contained'
                color='success'
                sx={{
                  width: "8.5rem",
                  "&.Mui-disabled": {
                    backgroundColor: "#388e3c",
                    color: "#fff",
                  },
                }}
              >
                COMPLETED
              </Button>
            ) : (
              <Button
                disabled
                variant='contained'
                color='error'
                sx={{
                  width: "8.5rem",
                  "&.Mui-disabled": {
                    backgroundColor: "#f44336",
                    color: "#fff",
                  },
                }}
              >
                REPORT PENDING
              </Button>
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
          color='success'
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
        <EventActions users={users} data={events} {...{ params }} />
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
      transition={{ delay: 0.1, ease: "easeInOut" }}
    >
      <Header title='PAST EVENTS' subtitle='List of All Past Events.' />
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

export default PastEvents;
