import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, CardActions, TextField } from "@mui/material";

const handleFormSubmit = () => {};
const facultyScheema = yup.object().shape({
  name: yup.string().required("Name is required"),
  employeeId: yup.string().required("Employee ID is required"),
  designation: yup.string().required("Designation Number is required"),
  department: yup.string().required("Department is required"),
});
const initialValuesFaculty = {
  name: "",
  employeeId: "",
  designation: "",
  department: "",
};
const FacultyForm = () => {
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesFaculty}
      validationSchema={facultyScheema}
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
          <TextField
            id="name"
            autoComplete="off"
            color="secondary"
            label="Name"
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
            autoComplete="off"
            color="secondary"
            id="employeeId"
            label="Employee ID"
            value={values.employeeId}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.employeeId ? errors.employeeId : ""}
            error={touched.employeeId && Boolean(errors.employeeId)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="designation"
            autoComplete="off"
            color="secondary"
            label="Designation"
            value={values.designation}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.designation ? errors.designation : ""}
            error={touched.designation && Boolean(errors.designation)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          {/* <TextField
            autoComplete="off"
            color="secondary"
            id="course"
            label="Course"
            value={values.course}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.course ? errors.course : ""}
            error={touched.course && Boolean(errors.course)}
            margin="dense"
            variant="outlined"
            fullWidth
          /> */}
          <TextField
            id="department"
            autoComplete="off"
            color="secondary"
            label="Department"
            value={values.department}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.department ? errors.department : ""}
            error={touched.department && Boolean(errors.department)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <CardActions
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
          </CardActions>
        </form>
      )}
    </Formik>
  );
};

export default FacultyForm;
