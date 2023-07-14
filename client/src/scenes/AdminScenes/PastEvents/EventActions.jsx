import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupsIcon from "@mui/icons-material/Groups";
import EventDialog from "components/EventDialog";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventActions = ({
  getEvents,
  snackbarData,
  users,
  setSnackbarData,
  params,
}) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleDelete = async (id) => {
    const choice = window.confirm("Want to delete Past Event?");
    if (choice) {
      try {
        const response = await axios({
          method: "post",

          url: `${process.env.REACT_APP_BASE_URL}/events/deleteEvent`,
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ eventId: id }),
        });
        const responseData = await response.data;
        if (responseData) {
          getEvents();
          setSnackbarData({
            ...snackbarData,
            open: true,
            message: "Event Deleted Successfully",
            severity: "error",
          });
          setTimeout(() => {
            setSnackbarData({
              ...snackbarData,
              open: false,
            });
          }, 4000);
        }
      } catch (error) {
        setSnackbarData({
          ...snackbarData,
          open: true,
          message: "There was an error deleting the event",
          severity: "error",
        });
        setTimeout(() => {
          setSnackbarData({
            ...snackbarData,
            open: false,
          });
        }, 4000);
      }
    }
  };
  return (
    <Box>
      <EventDialog
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        params={params}
      />
      <Tooltip title='View Event Details'>
        <IconButton onClick={handleOpenDialog}>
          <VisibilityIcon color='info' />
        </IconButton>
      </Tooltip>
      <Tooltip title='View Audience Details'>
        <IconButton
          onClick={() => {
            navigate(`/Registrations/${params.row._id}`, {
              state: {
                audience: users.filter(
                  (user) => user.event[0].id === params.row._id
                ),
                eventDetails: params.row.name,
              },
            });
          }}
        >
          <GroupsIcon color='success' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete This Event'>
        <IconButton
          onClick={() => {
            handleDelete(params.id);
          }}
        >
          <Delete color='error' />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default EventActions;
