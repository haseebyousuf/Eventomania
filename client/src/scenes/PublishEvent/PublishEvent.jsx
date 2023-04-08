import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Switch, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import EventActions from "./EventActions";
const PublishEvent = () => {
  const theme = useTheme();
  const [data, setData] = useState({ events: null, isLoading: true });

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/events/getUnpublishedEvents`
      );
      setData({ ...data, events: response.data, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log("useEffect");
    getEvents();
  }, []);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      minWidth: 100,
      // flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      // flex: 1,
    },
    {
      field: "committee",
      headerName: "Organized By",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.committee[0].name;
      },
      // flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 150,
      renderCell: (params) => {
        return params.row.createdBy[0].name;
      },
      // flex: 1,
    },
    {
      field: "venue",
      headerName: "Venue",
      // flex: 1,
      minWidth: 180,
    },
    {
      field: "startDate",
      headerName: "Starts On",
      minWidth: 200,
      renderCell: (params) => {
        return moment(params.row.startDate).format("MMMM Do YYYY, h:mm A");
      },
    },
    {
      field: "endDate",
      headerName: "Ends On",
      minWidth: 200,
      renderCell: (params) => {
        return moment(params.row.endDate).format("MMMM Do YYYY, h:mm A");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 250,
      renderCell: (params) => (
        <EventActions setData={setData} data={data} {...{ params }} />
      ),
    },
    // {
    //   field: "publish",
    //   headerName: "Publish",
    //   type: "actions",
    //   width: 100,
    //   renderCell: (params) => <Switch color="success" {...{ params }} />,
    // },
  ];

  return (
    <Box m="1rem 2.5rem">
      <Box
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          fontSize="1.5rem"
          textDecoration="underline"
          fontWeight="bold"
          // p="0.5rem 0 0 0"
          color={theme.palette.secondary.main}
        >
          UNPUBLISHED EVENTS
        </Typography>
        <Typography
          fontSize="1rem"
          textDecoration="underline"
          fontWeight="bold"
          color={theme.palette.secondary.main}
        >
          List of Unpublished Events
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
        />
      </Box>
    </Box>
  );
};

export default PublishEvent;
