import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import EventActions from "./EventActions";
import { useSelector } from "react-redux";
import UploadReport from "components/UploadReport";
import DataGridCustomToolbar from "../../../components/DataGridCustomToolbar";
import { motion } from "framer-motion";
import Header from "components/Header";
const ConvenorPastEvents = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  const [data, setData] = useState({ events: null, isLoading: true });
  const [users, setUsers] = useState(null);

  const getEvents = async () => {
    try {
      const userResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/getUsers`
      );
      setUsers(userResponse.data);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/events/getApprovedEvents`
      );

      const sortedEvents = response.data
        .sort((a, b) => moment(b.startDate) - moment(a.startDate))
        .filter((event) => event.committee[0].id === user.committeeId);
      setData({
        ...data,
        events: sortedEvents,
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
      minWidth: 200,
      flex: 1,
    },
    {
      field: "committee",
      headerName: "Organized By",
      minWidth: 150,
      flex: 1,
      valueFormatter: ({ value }) => value[0].name,
      renderCell: (params) => {
        return <p color='#fff'>{params.row.committee[0].name}</p>;
      },
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 150,
      flex: 1,
      valueFormatter: ({ value }) => value[0].name,
      renderCell: (params) => {
        return (
          <Typography variant='p'>{params.row.createdBy[0].name}</Typography>
        );
      },
    },
    {
      field: "startDate",
      headerName: "Date",
      minWidth: 120,
      type: "date",
      flex: 0.5,
      valueFormatter: ({ value }) => moment(value).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(params.row.startDate).format("MMMM Do YYYY");
      },
    },
    {
      field: "registrations",
      headerName: "Registrations",
      minWidth: 80,
      flex: 0.5,
      renderCell: (params) => {
        const total = users.filter(
          (user) => user.event[0].id === params.row._id
        ).length;
        console.log(total);
        return Number(total);
      },
      type: "number",
      valueFormatter: ({ value }) => {
        console.log(value);
        return value;
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 170,
      disableExport: true,
      renderCell: (params) => {
        return (
          <Box color='success'>
            {params.row.status ? (
              <Button>
                <Typography
                  backgroundColor='#66bb6a'
                  variant='p'
                  color='#fff'
                  p={1}
                  borderRadius='5px'
                >
                  REPORT GENERATED
                </Typography>
              </Button>
            ) : moment(params.row.startDate).isAfter(moment()) ? (
              <Button onClick={() => {}}>
                <Typography
                  variant='p'
                  backgroundColor='rgb(255 167 38)'
                  color='#fff'
                  p={1}
                  borderRadius='5px'
                >
                  Event Yet To Begin
                </Typography>
              </Button>
            ) : (
              <Box>
                <UploadReport getEvents={getEvents} id={params.row._id} />
              </Box>
            )}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      renderCell: (params) => (
        <EventActions setData={setData} data={data} {...{ params }} />
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

export default ConvenorPastEvents;
