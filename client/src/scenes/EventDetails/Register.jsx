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
import { useSelector } from "react-redux";
import StudentForm from "./StudentForm";
import FacultyForm from "./FacultyForm";

const Register = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const mode = useSelector((state) => state.mode);

  const theme = useTheme();
  return (
    <Box>
      <Card
        sx={{
          padding: "0rem 2rem",
          backgroundColor:
            mode === "dark" ? "transparent" : theme.palette.background.alt,
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
              p="1rem 0rem 1rem 0rem"
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
            <Tab label="Student" key="student" />
            <Tab label="Faculty" key="faculty" />
            <Tab label="Other" key="other" />
          </Tabs>
          <Box pt="0.5rem">
            {tabIndex === 0 && (
              <Box>
                <StudentForm />
              </Box>
            )}
            {tabIndex === 1 && (
              <Box>
                <FacultyForm />
              </Box>
            )}
          </Box>
        </CardContent>
        {/* <CardActions
          display="flex"
          sx={{
            paddingBottom: "1rem",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              color: "black",
              fontWeight: "bold",
            }}
            size="large"
            color="secondary"
          >
            Register
          </Button>
        </CardActions> */}
      </Card>
    </Box>
  );
};

export default Register;
