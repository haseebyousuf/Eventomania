import { Box, IconButton, Tooltip } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import React from "react";
import { useNavigate } from "react-router-dom";

const EventActions = ({ users, data, params }) => {
    const navigate = useNavigate();

    return (
        <Box>
            <Tooltip title="View Audience Details">
                <IconButton
                    onClick={() => {
                        navigate(`/Registrations/${params.row._id}`, {
                            state: {
                                audience: users.filter(
                                    (user) =>
                                        user.event[0].id === params.row._id
                                ),
                                eventDetails: params.row.name,
                            },
                        });
                    }}
                >
                    <GroupsIcon color="success" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Download Report">
                <IconButton onClick={() => {}}>
                    <a
                        href={`${process.env.REACT_APP_BASE_URL}/assets/${params.row.reportName}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {" "}
                        <DownloadForOfflineIcon color="info" />
                    </a>
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default EventActions;
