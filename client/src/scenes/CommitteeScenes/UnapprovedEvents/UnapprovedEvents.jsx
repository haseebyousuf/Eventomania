import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import moment from "moment";
import { useSelector } from "react-redux";

import { useCommitteeUnapprovedEventsQuery } from "state/eventApiSlice";
import Header from "components/Header";
import Actions from "./Actions";

const UnapprovedEvents = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.global.user);

  // rtk query
  const { data: events, isLoading } = useCommitteeUnapprovedEventsQuery({
    committeeId: user.committeeId,
  });

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
      valueFormatter: ({ value }) =>
        moment(new Date(value)).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(new Date(params.row.startDate)).format(
          "MMMM Do YYYY, h:mm A"
        );
      },
      sortComparator: dayInMonthComparator,
    },
    {
      field: "endDate",
      headerName: "Ends On",
      minWidth: 160,
      flex: 0.5,
      valueGetter: (params) => params.row.startDate,
      valueFormatter: ({ value }) =>
        moment(new Date(value)).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(new Date(params.row.endDate)).format(
          "MMMM Do YYYY, h:mm A"
        );
      },
      sortComparator: dayInMonthComparator,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      renderCell: (params) => <Actions data={events} {...{ params }} />,
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
      <Header title='UNAPPROVED EVENTS' subtitle='List of Unapproved Events.' />
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
          loading={isLoading || !events}
          getRowId={(row) => row._id}
          rows={events || []}
          columns={columns}
          componentsProps={{
            toolbar: { showExport: false, events },
          }}
        />
      </Box>
    </Box>
  );
};

export default UnapprovedEvents;
