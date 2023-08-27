import { Formik } from "formik";
import { Button, CardActions, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { useRegisterStudentMutation } from "state/userApiSlice";
import { studentSchema } from "utils/validationSchemas";
import { studentInitialValues } from "utils/initialValues";

const inputs = [
  { label: "Name", name: "name" },
  { label: "Registration Number", name: "regNo" },
  { label: "Mobile Number", name: "mobileNo" },
  { label: "Email", name: "email" },
  { label: "Course - Department - Semester", name: "courseSemesterDept" },
];

const StudentForm = ({ eventDetails }) => {
  // RTK query
  const [registerStudent, { isLoading }] = useRegisterStudentMutation();

  // FUNCTION TO SUBMIT FORM
  const handleFormSubmit = async (values, onSubmitProps) => {
    const event = {
      name: eventDetails.name,
      id: eventDetails._id,
    };
    try {
      const { regNo, courseSemesterDept } = values;
      const [course, department, semester] = courseSemesterDept.split("-");
      const student = {
        ...values,
        course,
        semester,
        department,
        regNo: regNo.toUpperCase(),
        event,
        type: "student",
      };
      const res = await registerStudent(student).unwrap();
      if (res) {
        onSubmitProps.resetForm();
        toast.success("Registered Successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.msg || "Server Error");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={studentInitialValues}
      validationSchema={studentSchema}
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
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
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
              helperText={
                touched[input.name]
                  ? errors[input.name]
                  : input.name === "courseSemesterDept" && !touched[input.name]
                  ? "e.g. IG-IT-10th"
                  : ""
              }
              error={touched[input.name] && Boolean(errors[input.name])}
              margin='dense'
              variant='outlined'
              fullWidth
              inputProps={{
                style: {
                  textTransform: input.name === "regNo" && "uppercase",
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
              name='register'
              variant='contained'
              type='submit'
              disabled={isLoading}
              sx={{
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

export default StudentForm;
