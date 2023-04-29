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

const facultySchema = yup.object().shape({
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
const FacultyForm = ({ eventDetails }) => {
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
                        inputProps={{
                            style: { textTransform: "uppercase" },
                        }}
                    />
                    <TextField
                        id="designation"
                        autoComplete="off"
                        color="secondary"
                        label="Designation"
                        value={values.designation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                            touched.designation ? errors.designation : ""
                        }
                        error={
                            touched.designation && Boolean(errors.designation)
                        }
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

export default FacultyForm;
