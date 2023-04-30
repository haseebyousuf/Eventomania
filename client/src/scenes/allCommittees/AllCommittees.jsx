import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const AllCommittees = () => {
  const theme = useTheme();
  const [data, setData] = useState({ committees: null, isLoading: true });
  useEffect(() => {
      const getCommittees = async () => {
          try {
              const response = await axios.get(
                  `${process.env.REACT_APP_BASE_URL}/committee/get-committees`
              );
              setData({ ...data, committees: response.data, isLoading: false });
          } catch (error) {
              console.error(error);
          }
      };
      getCommittees();
      // eslint-disable-next-line
  }, []);
  const columns = [
      {
          field: "name",
          headerName: "Committee Name",
          minWidth: 200,
      },
      {
          field: "description",
          headerName: "Description",
          minWidth: 270,
      },
      {
          field: "convenorName",
          headerName: "Convenor",
          minWidth: 200,
      },
      {
          field: "createdAt",
          headerName: "Created At",
          minWidth: 200,
          renderCell: (params) => {
              return dayjs(params.row.createdAt).format("DD-MM-YYYY");
          },
      },
      {
          field: "members",
          headerName: "Members",
          minWidth: 100,

          renderCell: (params) => {
              return params.row.members.length;
          },
      },
  ];

  return (
      <Box m="1rem 2.5rem">
          <Box
              flexDirection="column"
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
          >
              <Typography
                  fontSize="1.5rem"
                  textDecoration="underline"
                  fontWeight="bold"
                  color={theme.palette.secondary.main}
              >
                  COMMITTEES
              </Typography>
              <Typography
                  fontSize="1rem"
                  textDecoration="underline"
                  fontWeight="bold"
                  color={theme.palette.secondary.main}
              >
                  List of All Committees
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
                  rows={data.committees || []}
                  columns={columns}
              />
          </Box>
      </Box>
  );
};

export default AllCommittees;
