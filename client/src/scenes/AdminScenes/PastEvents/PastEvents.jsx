import React, { useState, useEffect } from "react";
import { Box, Switch, Typography, useTheme } from "@mui/material";
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
    .filter((item) => item.isApproved === true)
    .sort((a, b) => moment(b.startDate) - moment(a.startDate));
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
      field: "isPublished",
      headerName: "Status",
      minWidth: 140,
      flex: 0.3,
      valueGetter: (params) => params.row.status,
      renderCell: (params) => {
        return (
          <Box color='success'>
            {params.row.status ? (
              <Typography
                backgroundColor='#66bb6a'
                variant='p'
                color='#fff'
                p={1}
                borderRadius='5px'
              >
                Report Generated
              </Typography>
            ) : (
              <Typography
                variant='p'
                backgroundColor='#f44336'
                color='#fff'
                p={1}
                borderRadius='5px'
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
      transition={{ delay: 0.3, ease: "easeInOut" }}
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
