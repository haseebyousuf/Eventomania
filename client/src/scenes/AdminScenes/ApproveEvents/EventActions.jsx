import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EventDialog from "components/EventDialog";
import React from "react";
import axios from "axios";

const EventActions = ({ getEvents, snackbarData, setSnackbarData, params }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleDelete = async (id) => {
    const choice = window.confirm("Want to delete Approve event?");
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
          <RemoveRedEyeOutlinedIcon color='info' />
        </IconButton>
      </Tooltip>
      {/* <Tooltip title="Edit This Event">
                <IconButton onClick={() => {}}>
                    <Edit color="success" />
                </IconButton>
            </Tooltip> */}
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
