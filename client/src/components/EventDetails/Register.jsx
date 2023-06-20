import {
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import StudentForm from "./StudentForm";
import FacultyForm from "./FacultyForm";
import { motion } from "framer-motion";

const Register = ({ event }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const theme = useTheme();
    return (
        <Box>
            <Card
                borderRadius="5rem"
                sx={{
                    padding: "0rem 2rem",
                    borderRadius: "0.55rem",
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.alt,
                }}
            >
                <CardContent>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="flex-start"
                        flexDirection="column"
                    >
                        <Typography
                            fontSize="1.8rem"
                            textDecoration="underline"
                            fontWeight="bold"
                            p="0.3rem 0rem 1rem 0rem"
                            color={theme.palette.secondary.main}
                        >
                            REGISTER NOW!
                        </Typography>
                    </Box>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                    >
                        <Tab
                            component={motion.div}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0 }}
                            exit={{ y: 20, opacity: 0 }}
                            label="Student"
                            key="student"
                        />
                        <Tab
                            component={motion.div}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.13 }}
                            exit={{ y: 20, opacity: 0 }}
                            label="Faculty"
                            key="faculty"
                        />
                        <Tab
                            component={motion.div}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.26 }}
                            exit={{ y: 20, opacity: 0 }}
                            label="Other"
                            key="other"
                        />
                    </Tabs>
                    <Box pt="0.5rem">
                        {tabIndex === 0 && (
                            <Box>
                                <StudentForm eventDetails={event} />
                            </Box>
                        )}
                        {tabIndex === 1 && (
                            <Box>
                                <FacultyForm eventDetails={event} />
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Register;