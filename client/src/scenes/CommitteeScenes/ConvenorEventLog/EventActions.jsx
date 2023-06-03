import { Box, IconButton, Tooltip } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
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
                    <GroupsOutlinedIcon color="success" />
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
                        <DownloadForOfflineOutlinedIcon color="info" />
                    </a>
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default EventActions;
