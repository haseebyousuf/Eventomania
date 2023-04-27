import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, CardActions, TextField } from "@mui/material";

const handleFormSubmit = () => {};
const studentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  regNo: yup.string().required("Registration Number is required"),
  semester: yup.string().required("Semester is required"),
  course: yup.string().required("Course is required"),
  department: yup.string().required("Department is required"),
});
const initialValuesStudent = {
  name: "",
  regNo: "",
  semester: "",
  course: "",
  department: "",
};
const StudentForm = () => {
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesStudent}
      validationSchema={studentSchema}
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
            id="regNo"
            label="Registraion Number"
            value={values.regNo}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.regNo ? errors.regNo : ""}
            error={touched.regNo && Boolean(errors.regNo)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="semester"
            autoComplete="off"
            color="secondary"
            label="Semester"
            value={values.semester}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.semester ? errors.semester : ""}
            error={touched.semester && Boolean(errors.semester)}
            margin="dense"
            variant="outlined"
            fullWidth
          />
          <TextField
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
          />
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

export default StudentForm;
