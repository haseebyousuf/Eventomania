import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, CardActions, TextField } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const facultySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  employeeId: yup.string().required("Employee ID is required"),
  department: yup.string().required("Department is required"),
  mobileNo: yup
    .string()
    .matches(
      new RegExp(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/),
      "That doesn't look like a valid phone number"
    )
    .required("Mobile is required"),
  email: yup
    .string()
    .email("That doesn't look like an email")
    .required("Email is required"),
});
const initialValuesFaculty = {
  name: "",
  employeeId: "",
  mobileNo: "",
  email: "",
  department: "",
};
const FacultyForm = ({ eventDetails }) => {
  // STATES
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // FUNCTION TO SUBMIT FORM
  const handleFormSubmit = async (values, onSubmitProps) => {
    setButtonDisabled(true);
    const event = {
      name: eventDetails.name,
      id: eventDetails._id,
    };
    try {
      const { employeeId } = values;

      const faculty = {
        ...values,
        regNo: employeeId.toUpperCase(),
        event,
        type: "faculty",
      };
      const savedFacultyResponse = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/user/registerFaculty`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(faculty),
      });
      const savedFaculty = await savedFacultyResponse.data;
      onSubmitProps.resetForm();
      if (savedFaculty) {
        setButtonDisabled(false);
        toast("Registered Successfully!", {
          type: "success",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      setButtonDisabled(false);
      toast(error.response.data.msg, {
        type: "error",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const inputs = [
    { label: "Name", name: "name" },
    { label: "Employee ID", name: "employeeId" },
    { label: "Mobile Number", name: "mobileNo" },
    { label: "Email", name: "email" },
    { label: "Department", name: "department" },
  ];
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesFaculty}
      validationSchema={facultySchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          {inputs.map((input, index) => (
            <TextField
              component={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.13 * index }}
              exit={{ y: 20, opacity: 0 }}
              key={input.name}
              id={input.name}
              autoComplete='off'
              color='secondary'
              label={input.label}
              value={values[input.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched[input.name] ? errors[input.name] : ""}
              error={touched[input.name] && Boolean(errors[input.name])}
              margin='dense'
              variant='outlined'
              fullWidth
              inputProps={{
                style: {
                  textTransform: input.name === "employeeId" && "uppercase",
                },
              }}
            />
          ))}

          <CardActions
            display='flex'
            sx={{
              paddingBottom: "0.2rem",
              justifyContent: "center",
            }}
          >
            <Button
              variant='contained'
              type='submit'
              disabled={buttonDisabled}
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
              size='large'
              color='secondary'
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
