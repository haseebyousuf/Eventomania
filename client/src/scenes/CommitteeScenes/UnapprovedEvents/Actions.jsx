import { Box, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import EventDialog from "components/EventDialog";

const Actions = ({ params }) => {
  //state
  const [openDialog, setOpenDialog] = useState(false);

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
        showOrder={true}
      />
      <Tooltip title='View Event Details'>
        <IconButton onClick={handleOpenDialog}>
          <RemoveRedEyeOutlinedIcon color='success' />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Actions;
