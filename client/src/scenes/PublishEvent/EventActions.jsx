import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";
import EventDialog from "components/EventDialog";
import React from "react";

const EventActions = ({ setData, data, params }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/events/getUnpublishedEvents`
      );
      setData({ ...data, events: response.data, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };
  const handlePublishEvent = async (id) => {
    try {
      const publishedEventResponse = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/events/publishEvent`,
        headers: { "Content-Type": "application/JSON" },
        data: JSON.stringify({ id }),
      });
      const publishedEvent = await publishedEventResponse.data;
      if (publishedEvent) {
        alert("Published Successfully!");
        // <Alert variant="outlined" severity="success">
        //   <AlertTitle>Added</AlertTitle>
        //   <strong>{savedCommittee.name}</strong> added successfully!
        // </Alert>
      }
    } catch (error) {
      console.log(error.response);
      // <Alert variant="outlined" severity="error">
      //   <AlertTitle>Error</AlertTitle>
      //   Failed to connect to server
      // </Alert>;
    }
    getEvents();
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
      <Tooltip title="View Event Details">
        <IconButton onClick={handleOpenDialog}>
          <RemoveRedEyeOutlinedIcon color="info" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit This Event">
        <IconButton onClick={() => {}}>
          <Edit color="warning" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete This Event">
        <IconButton onClick={() => {}}>
          <Delete color="error" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Publish This Event">
        <Button
          sx={{ color: "white" }}
          size="small"
          variant="contained"
          color="success"
          endIcon={<PublishIcon />}
          type="submit"
          onClick={() => handlePublishEvent(params.row._id)}
        >
          Publish
        </Button>
      </Tooltip>
    </Box>
  );
};

export default EventActions;
