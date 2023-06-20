import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";

const Actions = ({ params }) => {
    const user = useSelector((state) => state.user);

    return (
        <Box>
            {params.row._id !== user._id && (
                <Tooltip title="Delete This Member">
                    <IconButton onClick={() => {}}>
                        <Delete color="error" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

export default Actions;
