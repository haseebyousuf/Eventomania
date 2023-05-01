import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Actions from "./Actions";
import moment from "moment";

const Convenors = () => {
    const theme = useTheme();
    const [data, setData] = useState({ convenors: null, isLoading: true });
    useEffect(() => {
        const getConvenors = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/admin/get-convenors`
                );
                setData({
                    ...data,
                    convenors: response.data,
                    isLoading: false,
                });
            } catch (error) {
                console.error(error);
            }
        };
        getConvenors();
        // eslint-disable-next-line
    }, []);
    const columns = [
        {
            field: "name",
            headerName: "Convenor Name",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "mobile",
            headerName: "Mobile",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "committeeName",
            headerName: "Committee",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            minWidth: 100,
            renderCell: (params) => {
                return moment(params.row.createdAt).format("MMMM Do YYYY");
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            minWidth: 150,
            flex: 1,
            renderCell: (params) => <Actions {...{ params }} />,
        },
    ];

    return (
        <Box m="1rem 2.5rem">
            <Box
                flexDirection="column"
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Typography
                    fontSize="1.5rem"
                    textDecoration="underline"
                    fontWeight="bold"
                    color={theme.palette.secondary.main}
                >
                    CONVENORS
                </Typography>
                <Typography
                    fontSize="1rem"
                    textDecoration="underline"
                    fontWeight="bold"
                    color={theme.palette.secondary.main}
                >
                    List of All Convenors
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
                    rows={data.convenors || []}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default Convenors;
