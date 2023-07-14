import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Box, Slide, Snackbar, Switch, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import EventActions from "./EventActions";
import Header from "components/Header";
import { motion } from "framer-motion";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
const ApproveEvents = () => {
  const theme = useTheme();
  const [data, setData] = useState({ events: null, isLoading: true });
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/events/getUnApprovedEvents`
      );
      setData({ ...data, events: response.data, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };
  const handleApproveEvent = async (id) => {
    try {
      const publishedEventResponse = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/events/ApproveEvent`,
        headers: { "Content-Type": "application/JSON" },
        data: JSON.stringify({ id }),
      });
      const publishedEvent = await publishedEventResponse.data;
      if (publishedEvent) {
        setSnackbarData({
          ...snackbarData,
          open: true,
          message: "Event Approved Successfully",
          severity: "success",
        });
        setTimeout(() => {
          setSnackbarData({
            ...snackbarData,
            open: false,
          });
        }, 4000);
      }
    } catch (error) {
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: "There is some error!",
        severity: "error",
      });
      setTimeout(() => {
        setSnackbarData({
          ...snackbarData,
          open: false,
        });
      }, 4000);
    }
    getEvents();
  };
  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);
  const dayInMonthComparator = (v1, v2) => moment(v1) - moment(v2);
  const columns = [
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 150,
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
      field: "venue",
      headerName: "Venue",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Starts On",
      minWidth: 160,
      flex: 0.5,
      valueGetter: (params) => params.row.startDate,
      valueFormatter: ({ value }) => moment(value).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(params.row.startDate).format("MMMM Do YYYY, h:mm A");
      },
      sortComparator: dayInMonthComparator,
    },
    {
      field: "endDate",
      headerName: "Ends On",
      minWidth: 160,
      flex: 0.5,
      valueGetter: (params) => params.row.startDate,
      valueFormatter: ({ value }) => moment(value).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(params.row.endDate).format("MMMM Do YYYY, h:mm A");
      },
      sortComparator: dayInMonthComparator,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      renderCell: (params) => (
        <EventActions
          getEvents={getEvents}
          snackbarData={snackbarData}
          setSnackbarData={setSnackbarData}
          setData={setData}
          data={data}
          {...{ params }}
        />
      ),
    },
    {
      field: "display",
      headerName: "Approve",
      type: "actions",
      width: 100,
      renderCell: (params) => (
        <Switch
          color='success'
          onClick={() => handleApproveEvent(params.row._id)}
          checked={params.row.isApproved ? true : false}
        />
      ),
    },
  ];
  const SlideTransition = (props) => {
    return <Slide {...props} direction='down' />;
  };
  return (
    <Box
      m='1rem 2.5rem'
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, ease: "easeInOut" }}
    >
      <Snackbar
        sx={{ position: "absolute" }}
        open={snackbarData.open}
        autoHideDuration={4000}
        TransitionComponent={SlideTransition}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert variant='filled' severity={snackbarData.severity}>
          {snackbarData.message}
        </Alert>
      </Snackbar>
      <Header title='APPROVE EVENTS' subtitle='List of Unapproved Events.' />
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
          componentsProps={{
            toolbar: { showExport: false, data },
          }}
        />
      </Box>
    </Box>
  );
};

export default ApproveEvents;
