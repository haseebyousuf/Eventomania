import { Box, IconButton, Tooltip } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import React from "react";

import EventDialog from "components/EventDialog";

const EventActions = ({ params }) => {
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
      <Tooltip title='View Event Details'>
        <IconButton onClick={handleOpenDialog}>
          <RemoveRedEyeOutlinedIcon color='success' />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default EventActions;
