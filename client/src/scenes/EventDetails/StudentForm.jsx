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
                        label="Registration Number"
                        value={values.regNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.regNo ? errors.regNo : ""}
                        error={touched.regNo && Boolean(errors.regNo)}
                        inputProps={{
                            style: { textTransform: "uppercase" },
                        }}
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
