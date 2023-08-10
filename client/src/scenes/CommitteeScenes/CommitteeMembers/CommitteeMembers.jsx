import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useCommitteeMembersMutation } from "state/adminApiSlice";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Actions from "./Actions";
import Header from "components/Header";

const CommitteeMembers = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.global.user);
  //state
  const [data, setData] = useState(null);
  //rtk query
  const [committeeMembers, { isLoading }] = useCommitteeMembersMutation();

  useEffect(() => {
    getMembers();
    // eslint-disable-next-line
  }, []);

  const getMembers = async () => {
    try {
      const res = await committeeMembers({
        committeeId: user.committeeId,
      }).unwrap();
      setData(res);
    } catch (error) {
      toast.error("There was some error! Please Try again.");
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
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        return moment(new Date(params.row.createdAt)).format("MMMM Do YYYY");
      },
    },
    user.role === "convenor" && {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Actions data={data} getMembers={getMembers} {...{ params }} />
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
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
