import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    IconButton,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { motion } from "framer-motion";

const AudienceDetails = () => {
    const theme = useTheme();

    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({ audience: null, isLoading: true });

    useEffect(() => {
        if (!location.state) {
            navigate("/");
        } else {
            setData({
                ...data,
                audience: location.state.audience,
                isLoading: false,
            });
        }
    }, []);
    const columns = [
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 130,
        },
        {
            field: "phoneNo",
            headerName: "Mobile",
            minWidth: 130,
        },

        {
            field: "type",
            headerName: "Type",
            minWidth: 100,
        },
        {
            field: "uniqueId",
            headerName: "Reg. No. / Employee ID",
            minWidth: 160,
            renderCell: (params) => {
                return params.row.regNo || params.row.employeeId;
            },
        },
        {
            field: "course",
            headerName: "Course",
            minWidth: 100,
            renderCell: (params) => {
                return params.row.course ? params.row.course : "-";
            },
        },
        {
            field: "semester",
            headerName: "Semester",
            minWidth: 80,
            renderCell: (params) => {
                return params.row.semester ? params.row.semester : "-";
            },
        },
        {
            field: "department",
            headerName: "Department",
            minWidth: 150,
        },
    ];
    return (
        <Box
            m="1rem 2.5rem"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, ease: "easeInOut" }}
        >
            <Box
                flexDirection="column"
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        fontSize="1.5rem"
                        textDecoration="underline"
                        fontWeight="bold"
                        color={theme.palette.secondary.main}
                        textTransform="uppercase"
                    >
                        {location.state && location.state.eventDetails}
                    </Typography>
                    <Tooltip title="Go Back">
                        <IconButton
                            onClick={() => navigate(-1)}
                            aria-label="go-back"
                            color="error"
                            size="large"
                        >
                            <ArrowCircleLeftOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Typography
                    fontSize="1rem"
                    textDecoration="underline"
                    fontWeight="bold"
                    color={theme.palette.secondary.main}
                >
                    Audience Details
                </Typography>
            </Box>
            <Box
                mt="20px"
                pb="20px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={data.isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data.audience || []}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default AudienceDetails;
