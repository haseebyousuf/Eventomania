import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Convenors = () => {
  const theme = useTheme();
  const [data, setData] = useState({ convenors: null, isLoading: true });
  useEffect(() => {
    const getConvenors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/get-convenors`
        );
        setData({ ...data, convenors: response.data, isLoading: false });
      } catch (error) {
        console.error(error);
      }
    };
    getConvenors();
  }, []);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
    },
    {
      field: "committeeName",
      headerName: "Committee",
      flex: 1,
    },
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
          CONVENORS
        </Typography>
        <Typography
          fontSize="1rem"
          textDecoration="underline"
          fontWeight="bold"
          color={theme.palette.secondary.main}
        >
          List of All Convenors
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
          rows={data.convenors || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Convenors;
