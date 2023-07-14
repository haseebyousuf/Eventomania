import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Box, Slide, Snackbar, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Actions from "./Actions";
import moment from "moment";
import Header from "components/Header";
import { motion } from "framer-motion";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const AllCommittees = () => {
  const theme = useTheme();
  const [data, setData] = useState({ committees: null, isLoading: true });
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    getCommittees();
    // eslint-disable-next-line
  }, []);
  const getCommittees = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/committee/get-committees`
      );
      setData({
        ...data,
        committees: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const dayInMonthComparator = (v1, v2) => moment(v1) - moment(v2);

  const columns = [
    {
      field: "name",
      headerName: "Committee Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "convenorName",
      headerName: "Convenor",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Created On",
      minWidth: 100,
      flex: 0.5,
      valueGetter: (params) => params.row.startDate,
      valueFormatter: ({ value }) => moment(value).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(params.row.updatedAt).format("MMMM Do YYYY");
      },
      sortComparator: dayInMonthComparator,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => (
        <Actions
          getCommittees={getCommittees}
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
      <Header title='COMMITTEES' subtitle='List of All Committees.' />
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
          rows={data.committees || []}
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

export default AllCommittees;
