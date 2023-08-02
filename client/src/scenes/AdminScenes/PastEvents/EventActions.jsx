import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupsIcon from "@mui/icons-material/Groups";

import EventDialog from "components/EventDialog";
import { useDeleteEventMutation } from "state/eventApiSlice";

const EventActions = ({ users, params }) => {
  //state
  const [openDialog, setOpenDialog] = useState(false);
  //RTK query
  const [deleteEvent] = useDeleteEventMutation();
  //hooks
  const navigate = useNavigate();

  //handlers
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    const choice = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (choice) {
      try {
        const res = await deleteEvent({ eventId: id }).unwrap();
        if (res) {
          toast("Event Deleted Successfully.", {
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
        toast("There was an error deleting the Event", {
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
