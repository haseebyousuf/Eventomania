import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useSelector } from "react-redux";
import DataGridCustomToolbar from "../../../components/DataGridCustomToolbar";
import { motion } from "framer-motion";

import Actions from "./Actions";
import Header from "components/Header";
import { useGetUsersQuery } from "state/userApiSlice";
import { useCommitteeApprovedEventsQuery } from "state/eventApiSlice";
import DataGridContainer from "components/DataGridContainer";

const filterData = (data) => {
  return data.filter((event) =>
    moment(new Date(event.startDate)).isAfter(moment())
  );
};

const UpcomingCommitteeEvents = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const user = useSelector((state) => state.global.user);

  //state
  const [events, setEvents] = useState(null);

  //rtk query
  const { data, isLoading } = useCommitteeApprovedEventsQuery({
    committeeId: user.committeeId,
  });
  const { data: users } = useGetUsersQuery();

  useEffect(() => {
    if (!isLoading && data) {
      const filteredData = filterData(data);
      setEvents(filteredData);
    }
  }, [data, isLoading]);

  const columns = [
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 120,
      flex: 1,
      valueFormatter: ({ value }) => value[0].name,
      renderCell: (params) => {
        return params.row.createdBy[0].name;
      },
    },

    {
      field: "startDate",
      headerName: "Date",
      minWidth: 120,
      type: "date",
      flex: 1,
      valueFormatter: ({ value }) =>
        moment(new Date(value)).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(new Date(params.row.startDate)).format("MMMM Do YYYY");
      },
    },
    {
      field: "registrations",
      headerName: "Registrations",
      minWidth: 80,
      flex: 1,
      renderCell: (params) => {
        const total = users?.filter(
          (user) => user.event[0].id === params.row._id
        ).length;
        return Number(total);
      },
      type: "number",
      valueFormatter: ({ value }) => {
        return value;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => <Actions users={users} {...{ params }} />,
    },
  ];

  return (
    <Box
      m={isNonMobile ? "1rem 2.5rem" : "0.8rem"}
      position='relative'
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "easeInOut" }}
    >
      <Header title='UPCOMING EVENTS' subtitle='List of All Upcoming Events.' />
      <DataGridContainer>
        <DataGrid
          loading={isLoading || !events}
          getRowId={(row) => row._id}
          rows={events || []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          sx={{
            "@media print": {
              "& .MuiDataGrid-root": {
                border: "none",
                color: "#000",
              },
              "& .MuiDataGrid-cell": {
                color: "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: "#000",
                textAlign: "center",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-main": {
                color: "#000",
              },
              "& 	.MuiDataGrid-overlay": {
                backgroundColor: `red !important`,
              },
            },
          }}
        />
      </DataGridContainer>
    </Box>
  );
};

export default UpcomingCommitteeEvents;
