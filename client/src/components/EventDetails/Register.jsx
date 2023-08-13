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
import { motion } from "framer-motion";

import StudentForm from "./StudentForm";
import FacultyForm from "./FacultyForm";
import AnimateText from "animations/AnimateText";

const Register = ({ event }) => {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <Card
        sx={{
          padding: "0rem 2rem",
          borderRadius: "0.55rem",
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <CardContent>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='flex-start'
            flexDirection='column'
          >
            <Typography
              fontSize='1.8rem'
              textDecoration='underline'
              fontWeight='bold'
              p='0.3rem 0rem 1rem 0rem'
              color={theme.palette.secondary.main}
            >
              <AnimateText text='REGISTER NOW!' delayValue={0.05} />
            </Typography>
          </Box>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor='secondary'
            textColor='secondary'
          >
            <Tab
              component={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0 }}
              exit={{ y: 20, opacity: 0 }}
              label='Student'
              key='student'
            />
            <Tab
              component={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.13 }}
              exit={{ y: 20, opacity: 0 }}
              label='Faculty'
              key='faculty'
            />
          </Tabs>
          <Box pt='0.5rem'>
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
