import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import moment from "moment";

import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import Header from "components/Header";
import {
  useCommitteesQuery,
  useDeleteCommitteeMutation,
} from "state/committeeApiSlice";

const AllCommittees = () => {
  const theme = useTheme();
  //RTK query
  const { data, isLoading } = useCommitteesQuery();
  const [deleteCommittee] = useDeleteCommitteeMutation();
  //sort function
  const dayInMonthComparator = (v1, v2) =>
    moment(new Date(v1)) - moment(new Date(v2));

  //deleteHandler
  const handleDelete = async (id) => {
    const choice = window.confirm(
      "Are you sure you want to delete this committee?"
    );
    if (choice) {
      try {
        const res = await deleteCommittee({ committeeId: id }).unwrap();
        if (res) {
          toast.error("Committee Deleted Successfully");
        }
      } catch (error) {
        toast.error("There was some error! Please Try again.");
      }
    }
  };

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
      valueFormatter: ({ value }) =>
        moment(new Date(value)).format("Do MMM YYYY"),
      renderCell: (params) => {
        return moment(new Date(params.row.updatedAt)).format("Do MMM YYYY");
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
        <Box>
          <Tooltip title='Delete This Committee'>
            <IconButton
              onClick={() => {
                handleDelete(params.id);
              }}
            >
              <Delete color='error' />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box
      m='1rem 2.5rem'
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, ease: "easeInOut" }}
    >
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

export default AllCommittees;
