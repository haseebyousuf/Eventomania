import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EventDialog from "components/EventDialog";
import React from "react";
import { toast } from "react-toastify";
import { useDeleteEventMutation } from "state/eventApiSlice";

const EventActions = ({ params }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteEvent] = useDeleteEventMutation();

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
          toast("Event Deleted Successfully", {
            type: "error",
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        toast("There was an error deleting the event.", {
          type: "error",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
          <RemoveRedEyeOutlinedIcon color='info' />
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
