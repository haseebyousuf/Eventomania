import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, useTheme } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import EventActions from "./EventActions";
import { useSelector } from "react-redux";
import UploadReport from "components/UploadReport";
import DataGridCustomToolbar from "../../../components/DataGridCustomToolbar";
import { motion } from "framer-motion";
import Header from "components/Header";
import UploadPhotos from "components/UploadPhotos";
import { toast } from "react-toastify";
const ConvenorPastEvents = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  const [data, setData] = useState({ events: null, isLoading: true });
  const [users, setUsers] = useState(null);
  const [buttonDisabled, setButtonDisabled] = React.useState({});

  const getEvents = async () => {
    try {
      const userResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/getUsers`
      );
      setUsers(userResponse.data);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/events/getApprovedEvents`
      );

      const sortedEvents = response.data
        .sort((a, b) => moment(b.startDate) - moment(a.startDate))
        .filter((event) => event.committee[0].id === user.committeeId);
      setData({
        ...data,
        events: sortedEvents,
        isLoading: false,
      });
    } catch (error) {}
  };

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  const handleCertificateSend = async (id) => {
    setButtonDisabled({ ...buttonDisabled, [id]: true });

    try {
      const data = {
        id: id,
      };
      const promise = toast.promise(
        // The uploading message to display
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/events/sendCertificate`,
          headers: { "Content-Type": "application/JSON" },
          data: data,
        }).then((response) => response.data), // Resolve the promise with the response data
        {
          pending: "Sending Certificates...", // Message shown while the request is pending
          success: "Certificates ent!", // Success message
          error: "There was some error! Please Try again.", // Error message
        }
      );
      const certificateResponse = await promise;
      if (certificateResponse) {
        getEvents();
        setButtonDisabled({ ...buttonDisabled, [id]: false });
      }
    } catch (error) {}
    setButtonDisabled({ ...buttonDisabled, [id]: false });
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
      valueFormatter: ({ value }) => moment(value).format("Do MMMM YYYY"),
      renderCell: (params) => {
        return moment(params.row.startDate).format("MMMM Do YYYY");
      },
    },
    {
      field: "registrations",
      headerName: "Registrations",
      minWidth: 80,
      flex: 0.5,
      renderCell: (params) => {
        const total = users.filter(
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
            ) : moment(params.row.startDate).isAfter(moment()) ? (
              <Button
                disabled
                variant='contained'
                color='warning'
                endIcon={<HourglassBottomIcon />}
                sx={{
                  minWidth: "9rem",
                  color: "#fff",
                  "&.Mui-disabled": {
                    opacity: 0.9,
                    backgroundColor: "#ffa726",
                    color: "#fff",
                  },
                }}
              >
                Pending
              </Button>
            ) : (
              <Box>
                <UploadReport getEvents={getEvents} id={params.row._id} />
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
            ) : moment(params.row.startDate).isAfter(moment()) ? (
              <Button
                disabled
                variant='contained'
                color='warning'
                endIcon={<HourglassBottomIcon />}
                sx={{
                  minWidth: "9rem",
                  color: "#fff",
                  "&.Mui-disabled": {
                    opacity: 0.9,
                    backgroundColor: "#ffa726",
                    color: "#fff",
                  },
                }}
              >
                PENDING
              </Button>
            ) : (
              <Button
                disabled={buttonDisabled[params.row._id]}
                variant='contained'
                color='error'
                endIcon={<SendIcon />}
                sx={{
                  minWidth: "9rem",
                  color: "#fff",
                }}
                onClick={() => handleCertificateSend(params.row._id)}
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
            ) : moment(params.row.startDate).isAfter(moment()) ? (
              <Button
                disabled
                variant='contained'
                color='warning'
                endIcon={<HourglassBottomIcon />}
                sx={{
                  minWidth: "9rem",
                  color: "#fff",
                  "&.Mui-disabled": {
                    opacity: 0.9,
                    backgroundColor: "#ffa726",
                    color: "#fff",
                  },
                }}
              >
                Pending
              </Button>
            ) : (
              <Box>
                <UploadPhotos getEvents={getEvents} id={params.row._id} />
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
      renderCell: (params) => (
        <EventActions setData={setData} data={data} {...{ params }} />
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
      <Header title='PAST EVENTS' subtitle='List of All Past Events.' />
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
          rows={data.events || []}
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
      </Box>
    </Box>
  );
};

export default ConvenorPastEvents;
