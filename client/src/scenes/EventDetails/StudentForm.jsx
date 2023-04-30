import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
    Alert,
    Button,
    CardActions,
    Slide,
    Snackbar,
    TextField,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

const studentSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    regNo: yup.string().required("Registration Number is required"),
    semester: yup.string().required("Semester is required"),
    course: yup.string().required("Course is required"),
    department: yup.string().required("Department is required"),
});
const inputs = [
    { label: "Name", name: "name" },
    { label: "Registration Number", name: "regNo" },
    { label: "Semester", name: "semester" },
    { label: "Course", name: "course" },
    { label: "Department", name: "department" },
];
const initialValuesStudent = {
    name: "",
    regNo: "",
    semester: "",
    course: "",
    department: "",
};
const StudentForm = ({ eventDetails }) => {
    // STATES
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState(null);
    // FUNCTION TO SUBMIT FORM
    const handleFormSubmit = async (values, onSubmitProps) => {
        setButtonDisabled(true);
        const event = {
            name: eventDetails.name,
            id: eventDetails._id,
        };
        try {
            const { regNo } = values;

            const student = {
                ...values,
                regNo: regNo.toUpperCase(),
                event,
                type: "student",
            };
            const savedStudentResponse = await axios({
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/user/registerStudent`,
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(student),
            });
            const savedStudent = await savedStudentResponse.data;
            onSubmitProps.resetForm();
            if (savedStudent) {
                setButtonDisabled(false);
                setSeverity("success");
                setMessage("Registered Successfully!");
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 6000);
            }
        } catch (error) {
            setSeverity("error");
            setMessage(error.response.data.msg);
            setOpen(true);
            setButtonDisabled(false);
            setTimeout(() => {
                setOpen(false);
            }, 6000);
        }
    };
    //transition for snackbar
    const SlideTransition = (props) => {
        return <Slide {...props} direction="left" />;
    };
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
            }) => (
                <form onSubmit={handleSubmit}>
                    <Snackbar
                        sx={{ position: "absolute" }}
                        open={open}
                        autoHideDuration={6000}
                        TransitionComponent={SlideTransition}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <Alert variant="filled" severity={severity}>
                            {message}
                        </Alert>
                    </Snackbar>

                    {inputs.map((input, index) => (
                        <TextField
                            component={motion.div}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.13 * index }}
                            exit={{ y: 20, opacity: 0 }}
                            key={input.name}
                            id={input.name}
                            autoComplete="off"
                            color="secondary"
                            label={input.label}
                            value={values[input.name]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                                touched[input.name] ? errors[input.name] : ""
                            }
                            error={
                                touched[input.name] &&
                                Boolean(errors[input.name])
                            }
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        />
                    ))}
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
                            disabled={buttonDisabled}
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
