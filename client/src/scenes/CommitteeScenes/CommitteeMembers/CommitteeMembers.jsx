import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Actions from "./Actions";
import moment from "moment";
import Header from "components/Header";
import { motion } from "framer-motion";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CommitteeMembers = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  const [data, setData] = useState({ members: null, isLoading: true });
  useEffect(() => {
    getMembers();
    // eslint-disable-next-line
  }, []);
  const getMembers = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/admin/committeeMembers`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ committeeId: user.committeeId }),
      });
      setData({
        ...data,
        members: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
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
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 100,
      renderCell: (params) => {
        return moment(params.row.createdAt).format("MMMM Do YYYY");
      },
    },
    user.role === "convenor" && {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Actions
          getMembers={getMembers}
          setData={setData}
          data={data}
          {...{ params }}
        />
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
      <Header
        title='MEMBERS'
        subtitle={`List of All Members of ${user.committeeName}`}
      />

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

export default CommitteeMembers;
