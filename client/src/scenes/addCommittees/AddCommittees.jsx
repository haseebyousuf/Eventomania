import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import Form from "./Form";

const AddCommittees = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const theme = useTheme();
    return (
        <Box>
            <Box
                width={isNonMobile ? "80%" : "90%"}
                m="2rem auto"
                position="relative"
            >
                <Box
                    marginBottom="1rem"
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
                        ADD COMMITTEE
                    </Typography>
                    <Typography
                        fontSize="1rem"
                        textDecoration="underline"
                        fontWeight="bold"
                        color={theme.palette.secondary.main}
                    >
                        Add New Committee Details
                    </Typography>
                </Box>
                <Form />
            </Box>
        </Box>
    );
};

export default AddCommittees;
