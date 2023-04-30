import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
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
            <Tooltip title="Delete This Event">
                <IconButton onClick={() => {}}>
                    <Delete color="error" />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default EventActions;
