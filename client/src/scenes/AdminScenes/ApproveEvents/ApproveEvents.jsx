import { Box, Switch, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import moment from "moment";

import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EventActions from "./EventActions";
import Header from "components/Header";
import {
  useApproveEventMutation,
  useUnapprovedEventsQuery,
} from "state/eventApiSlice";

const ApproveEvents = () => {
  const theme = useTheme();
  // RTK Query
  const { data, isLoading } = useUnapprovedEventsQuery();
  const [approveEvent] = useApproveEventMutation();

  //approveHandler
  const handleApproveEvent = async (id) => {
    try {
      const res = await approveEvent({ id }).unwrap();
      if (res) {
        toast.success("Event Approved.");
      }
    } catch (error) {
      toast.error("There was some error! Please Try again.");
    }
  };
  //sort function
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
      renderCell: (params) => <EventActions data={data} {...{ params }} />,
    },
    {
      field: "action",
      headerName: "Approve",
      type: "actions",
      width: 100,
      renderCell: (params) => (
        <Switch
          color='success'
          onClick={() => handleApproveEvent(params.row._id)}
          checked={params.row.isApproved ? true : false}
          {...{ params }}
        />
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

export default ApproveEvents;
