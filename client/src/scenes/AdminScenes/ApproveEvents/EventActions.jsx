import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import EventDialog from "components/EventDialog";
import { useDeleteEventMutation } from "state/eventApiSlice";

const EventActions = ({ params }) => {
  //state
  const [openDialog, setOpenDialog] = useState(false);
  // RTK query
  const [deleteEvent] = useDeleteEventMutation();

  //handlers
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
        const res = await deleteEvent({ eventId: id }).unwrap();
        if (res) {
          toast.error("Event Deleted Successfully");
        }
      } catch (error) {
        toast.error("There was an error deleting the event.");
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
        showOrder={true}
      />
      <Tooltip title='View Event Details'>
        <IconButton onClick={handleOpenDialog}>
          <RemoveRedEyeOutlinedIcon color='success' />
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
