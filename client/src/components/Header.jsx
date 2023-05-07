import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography
                variant="h2"
                color={theme.palette.secondary[100]}
                fontWeight="bold"
                sx={{ mb: "5px" }}
            >
                {title}
            </Typography>
            <Typography
                sx={{ mb: "5px" }}
                variant="h5"
                fontWeight="bold"
                color={theme.palette.secondary[300]}
            >
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
