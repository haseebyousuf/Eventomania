import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { motion } from "framer-motion";

import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import DataGridContainer from "components/DataGridContainer";
import AnimateText from "animations/AnimateText";

const AudienceDetails = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

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
    // eslint-disable-next-line
  }, []);
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "phoneNo",
      headerName: "Mobile",
      minWidth: 130,
      flex: 1,
    },

    {
      field: "type",
      headerName: "Type",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "uniqueId",
      headerName: "Reg. No. / Employee ID",
      minWidth: 160,
      flex: 1,
      valueGetter: (params) => params.row.regNo || params.row.employeeId,
      renderCell: (params) => {
        return params.row.regNo || params.row.employeeId;
      },
    },
    {
      field: "course",
      headerName: "Course",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        return params.row.course ? params.row.course : "-";
      },
    },
    {
      field: "semester",
      headerName: "Semester",
      minWidth: 80,
      flex: 0.4,
      renderCell: (params) => {
        return params.row.semester ? params.row.semester : "-";
      },
    },
    {
      field: "department",
      headerName: "Department",
      minWidth: 150,
      flex: 0.5,
    },
  ];
  const csvOptions = {
    fileName: `audience-${location.state && location.state.eventDetails}`,
  };

  return (
    <Box
      m={isNonMobile ? "1rem 2.5rem" : "0.8rem"}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "easeInOut" }}
    >
      <Box>
        <Box
          width='100%'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography
            component={motion.div}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            variant={isNonMobile ? "h2" : "h3"}
            color={theme.palette.secondary.dark}
            fontWeight='bold'
            sx={{ mb: "5px" }}
          >
            {location.state && location.state.eventDetails}
          </Typography>
          <Tooltip title='Go Back'>
            <IconButton
              onClick={() => navigate(-1)}
              aria-label='go-back'
              color='error'
              size='large'
            >
              <ArrowCircleLeftOutlinedIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          sx={{ mb: "5px" }}
          variant={isNonMobile ? "h5" : "h6"}
          fontWeight='bold'
          color={theme.palette.secondary.accent}
        >
          <AnimateText text='Audience Details.' delayValue={0.05} />
        </Typography>
      </Box>
      <DataGridContainer>
        <DataGrid
          loading={data.isLoading || !data}
          getRowId={(row) => row._id}
          rows={data.audience || []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { csvOptions, showExport: true, data },
          }}
        />
      </DataGridContainer>
    </Box>
  );
};

export default AudienceDetails;
