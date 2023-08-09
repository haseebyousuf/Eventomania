import React from "react";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { useNavigate } from "react-router-dom";

import EventDialog from "components/EventDialog";

const EventActions = ({ params, users }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  //state
  const [openDialog, setOpenDialog] = React.useState(false);

  //handlers
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
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
      <Tooltip title='View Audience Details'>
        <IconButton
          sx={{
            color: theme.palette.secondary[300],
          }}
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
          <GroupsOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='View Event Details'>
        <IconButton onClick={handleOpenDialog}>
          <RemoveRedEyeOutlinedIcon color='success' />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default EventActions;
