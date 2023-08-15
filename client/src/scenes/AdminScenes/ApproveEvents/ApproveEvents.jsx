import { Box, Switch, useMediaQuery } from "@mui/material";
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
import DataGridContainer from "components/DataGridContainer";

const ApproveEvents = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

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
  const dayInMonthComparator = (v1, v2) =>
    moment(new Date(v1)) - moment(new Date(v2));

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
      minWidth: 150,
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Starts On",
      minWidth: 160,
      flex: 1,
      valueGetter: (params) => params.row.startDate,
      valueFormatter: ({ value }) =>
        moment(new Date(value)).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(new Date(params.row.startDate)).format(
          "Do MMM YYYY, h:mm A"
        );
      },
      sortComparator: dayInMonthComparator,
    },
    {
      field: "endDate",
      headerName: "Ends On",
      minWidth: 160,
      flex: 1,
      valueGetter: (params) => params.row.startDate,
      valueFormatter: ({ value }) =>
        moment(new Date(value)).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(new Date(params.row.endDate)).format(
          "Do MMM YYYY, h:mm A"
        );
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
      m={isNonMobile ? "1rem 2.5rem" : "0.8rem"}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "easeInOut" }}
    >
      <Header title='APPROVE EVENTS' subtitle='List of Unapproved Events.' />
      <DataGridContainer>
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
      </DataGridContainer>
    </Box>
  );
};

export default ApproveEvents;
