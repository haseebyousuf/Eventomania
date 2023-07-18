import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EventActions from "./EventActions";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
const AdminEventLog = () => {
  const theme = useTheme();

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
      toast("There was some error! Please Try again.", {
        type: "error",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
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
      minWidth: 250,
      flex: 1,
    },
    {
      field: "committee",
      headerName: "Organized By",
      minWidth: 250,
      flex: 0.6,
      valueGetter: (params) => params.value[0].name,
      renderCell: (params) => {
        return params.row.committee[0].name;
      },
    },
    {
      field: "startDate",
      headerName: "Date",
      minWidth: 150,
      flex: 0.3,
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
      minWidth: 120,
      flex: 0.3,
      valueGetter: (params) => {
        return users.filter((user) => user.event[0].id === params.row._id)
          .length;
      },
      renderCell: (params) => {
        return users.filter((user) => user.event[0].id === params.row._id)
          .length;
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
  const csvOptions = { fileName: "event-log" };

  return (
    <Box
      m='1rem 2.5rem'
      position='relative'
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, ease: "easeInOut" }}
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
            toolbar: { csvOptions, showExport: true, data },
          }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default AdminEventLog;
