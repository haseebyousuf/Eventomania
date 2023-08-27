import React, { useState, useEffect } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useSelector } from "react-redux";
import UploadReport from "components/UploadReport";
import DataGridCustomToolbar from "../../../components/DataGridCustomToolbar";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import EventActions from "./EventActions";
import Header from "components/Header";
import UploadPhotos from "components/UploadPhotos";
import { useGetUsersQuery } from "state/userApiSlice";
import {
  useCommitteeApprovedEventsQuery,
  useSendCertificatesMutation,
} from "state/eventApiSlice";
import DataGridContainer from "components/DataGridContainer";

const filterData = (data) => {
  return data.filter((event) =>
    moment(new Date(event.startDate)).isBefore(moment())
  );
};

const CommitteePastEvents = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const user = useSelector((state) => state.global.user);

  //state
  const [events, setEvents] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState({});

  //rtk query
  const { data, isLoading } = useCommitteeApprovedEventsQuery({
    committeeId: user.committeeId,
  });
  const { data: users } = useGetUsersQuery();
  const [sendCertificates] = useSendCertificatesMutation();

  useEffect(() => {
    if (!isLoading && data) {
      const filteredData = filterData(data);
      setEvents(filteredData);
    }
  }, [data, isLoading]);

  //handlers
  const handleCertificateSend = async (id, date) => {
    setButtonDisabled({ ...buttonDisabled, [id]: true });
    try {
      const eventDate = moment(new Date(date)).format("Do MMMM YYYY");
      const promise = toast.promise(
        sendCertificates({ id, eventDate })
          .unwrap()
          .then((response) => response.data),
        {
          pending: "Sending Certificates...",
          success: "Certificates sent!",
          error: "There was some error! Please Try again.",
        }
      );
      const certificateResponse = await promise;
      if (certificateResponse) {
        setButtonDisabled({ ...buttonDisabled, [id]: false });
      }
    } catch (error) {
      setButtonDisabled({ ...buttonDisabled, [id]: false });
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Event Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Date",
      minWidth: 120,
      type: "date",
      flex: 0.5,
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
      flex: 0.5,
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
      field: "status",
      headerName: "Report Status",
      minWidth: 170,
      disableExport: true,
      renderCell: (params) => {
        return (
          <Box color='success'>
            {params.row.status ? (
              <Button
                name='generated'
                disabled
                variant='contained'
                color='success'
                endIcon={<DoneIcon />}
                sx={{
                  minWidth: "9rem",
                  color: "#fff",
                  "&.Mui-disabled": {
                    opacity: 0.9,
                    backgroundColor: "#388e3c",
                    color: "#fff",
                  },
                }}
              >
                GENERATED
              </Button>
            ) : (
              <Box>
                <UploadReport id={params.row._id} />
              </Box>
            )}
          </Box>
        );
      },
    },
    {
      field: "send",
      headerName: "Certificates",
      minWidth: 170,
      disableExport: true,
      renderCell: (params) => {
        return (
          <Box color='success'>
            {params.row.isCertificateGenerated ? (
              <Button
                name='generated'
                disabled
                variant='contained'
                color='success'
                endIcon={<DoneIcon />}
                sx={{
                  minWidth: "9rem",
                  color: "#fff",
                  "&.Mui-disabled": {
                    opacity: 0.9,
                    backgroundColor: "#388e3c",
                    color: "#fff",
                  },
                }}
              >
                Generated
              </Button>
            ) : (
              <Button
                name='send_now'
                disabled={buttonDisabled[params.row._id]}
                variant='contained'
                color='error'
                endIcon={<SendIcon />}
                sx={{
                  minWidth: "9rem",
                  color: "#fff",
                }}
                onClick={() =>
                  handleCertificateSend(params.row._id, params.row.startDate)
                }
              >
                SEND NOW
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      field: "upload",
      headerName: "Upload Photos",
      minWidth: 170,
      disableExport: true,
      renderCell: (params) => {
        return (
          <Box color='success'>
            {params.row.isPhotoUploaded ? (
              <Button
                name='uploaded'
                disabled
                variant='contained'
                color='success'
                endIcon={<DoneIcon />}
                sx={{
                  minWidth: "9rem",
                  color: "#fff",
                  "&.Mui-disabled": {
                    opacity: 0.9,
                    backgroundColor: "#388e3c",
                    color: "#fff",
                  },
                }}
              >
                UPLOADED
              </Button>
            ) : (
              <Box>
                <UploadPhotos
                  //  getEvents={getEvents}
                  id={params.row._id}
                />
              </Box>
            )}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      renderCell: (params) => <EventActions users={users} {...{ params }} />,
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
      <Header title='PAST EVENTS' subtitle='List of All Past Events.' />
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
        ></DataGrid>
      </DataGridContainer>
    </Box>
  );
};

export default CommitteePastEvents;
