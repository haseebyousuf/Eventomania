import React from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  useTheme,
  CardActions,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FlexBetween } from "../../components/FlexBetween";

const addCommitteeScheema = yup.object().shape({
  name: yup.string().required("*Name Required"),
  description: yup.string().required("required"),
});

const initialValuesCommittee = {
  name: "",
  description: "",
};
const Form = () => {
  const theme = useTheme();

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const savedCommitteeResponse = await axios({
        method: "post",
        url: "http://localhost:5001/committee/add-committee",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(values),
      });
      const savedCommittee = await savedCommitteeResponse.data;
      onSubmitProps.resetForm();
      if (savedCommittee) {
        alert("Added Successfully!");
        // <Alert variant="outlined" severity="success">
        //   <AlertTitle>Added</AlertTitle>
        //   <strong>{savedCommittee.name}</strong> added successfully!
        // </Alert>;
      }
    } catch (error) {
      alert("error");
      // <Alert variant="outlined" severity="error">
      //   <AlertTitle>Error</AlertTitle>
      //   Failed to connect to server
      // </Alert>;
    }
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesCommittee}
      validationSchema={addCommitteeScheema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box>
            <Card
              sx={{
                backgroundColor: "transparent",
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    fontSize="2rem"
                    textDecoration="underline"
                    fontWeight="bold"
                    p="1rem"
                    color={theme.palette.secondary.main}
                  >
                    ADD COMMITTEE
                  </Typography>
                </Box>
                <TextField
                  id="name"
                  autoComplete="off"
                  color="secondary"
                  label="Committe Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.name ? errors.name : ""}
                  error={touched.name && Boolean(errors.name)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  notched="true"
                  autoComplete="off"
                  color="secondary"
                  id="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.description ? errors.description : ""}
                  error={touched.description && Boolean(errors.description)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </CardContent>
              <CardActions
                display="flex"
                sx={{
                  marginBottom: "1rem",
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
                  Add Committee
                </Button>
              </CardActions>
            </Card>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
