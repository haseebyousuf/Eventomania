import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import React from "react";

const Actions = ({ params }) => {
    return (
        <Box>
            <Tooltip title="View Committee Details">
                <IconButton onClick={() => {}}>
                    <RemoveRedEyeOutlinedIcon color="info" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit This Committee">
                <IconButton onClick={() => {}}>
                    <Edit color="success" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete This Committee">
                <IconButton onClick={() => {}}>
                    <Delete color="error" />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default Actions;
