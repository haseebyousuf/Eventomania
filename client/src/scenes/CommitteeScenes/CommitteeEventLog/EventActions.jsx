import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import EventDialog from "components/EventDialog";

const EventActions = ({ users, data, params }) => {
  const theme = useTheme();
  const navigate = useNavigate();
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
      />
      <Tooltip title='View Event Details'>
        <IconButton onClick={handleOpenDialog}>
          <VisibilityIcon color='success' />
        </IconButton>
      </Tooltip>
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
          <GroupsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Download Report'>
        <IconButton onClick={() => {}}>
          <Link
            to={`${process.env.REACT_APP_BASE_URL}assets/${params.row.orderName}`}
            target='_blank'
            rel='noreferrer'
          >
            {" "}
            <DownloadIcon color='info' />
          </Link>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default EventActions;
