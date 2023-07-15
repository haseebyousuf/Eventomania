import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Box, Snackbar, Slide, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Actions from "./Actions";
import moment from "moment";
import Header from "components/Header";
import { motion } from "framer-motion";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Members = () => {
  const theme = useTheme();
  const [data, setData] = useState({ members: null, isLoading: true });
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    getMembers();
    // eslint-disable-next-line
  }, []);
  const getMembers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/getMembers`
      );
      setData({
        ...data,
        members: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "committeeName",
      headerName: "Committee",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created On",
      minWidth: 100,
      renderCell: (params) => {
        return moment(params.row.createdAt).format("MMMM Do YYYY");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Actions
          getMembers={getMembers}
          snackbarData={snackbarData}
          setSnackbarData={setSnackbarData}
          setData={setData}
          data={data}
          {...{ params }}
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
      position='relative'
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
      <Header title='MEMBERS' subtitle='List of All Members.' />

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
          rows={data.members || []}
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

export default Members;
