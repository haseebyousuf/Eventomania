import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Box,
    useTheme,
    Card,
    CardContent,
    TextField,
    Button,
    CardActions,
    InputAdornment,
    IconButton,
    MenuItem,
    Snackbar,
    Alert,
    Slide,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import Header from "components/Header";

const addConvenorSchema = yup.object().shape({
    name: yup.string().required("*Name Required"),
    password: yup
        .string()
        .required("*No password provided.")
        .min(8, "*Password must be 8 characters long")
        .matches(/[0-9]/, "*Password requires a number")
        .matches(/[a-z]/, "*Password requires a lowercase letter")
        .matches(/[A-Z]/, "*Password requires an uppercase letter")
        .matches(/[^\w]/, "*Password requires a symbol"),
    email: yup.string().email("*Invalid Email").required("*No Email Provided"),
    committee: yup.string().required("Committee is required!").ensure(),
    mobile: yup.number().required("*Mobile Number is Required"),
});

const initialValuesConvenor = {
    name: "",
    email: "",
    password: "",
    committee: "",
    mobile: "",
};

const AddConvenor = () => {
    const theme = useTheme();
    // States
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [data, setData] = useState({ committees: null, isLoading: true });

    //useEffect to get committees
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/committee/get-committees`)
            .then((response) => {
                setData({
                    ...data,
                    committees: response.data,
                    isLoading: false,
                });
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line
    }, []);

    //submit handler
    const handleFormSubmit = async (values, onSubmitProps) => {
        try {
            const { committee } = values;
            const committeeName = committee.split("|")[0];
            const committeeId = committee.split("|")[1];
            const convenor = {
                ...values,
                committeeName,
                committeeId,
                role: "convenor",
            };
            const savedConvenorResponse = await axios({
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/admin/addConvenor`,
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(convenor),
            });
            const savedConvenor = await savedConvenorResponse.data;
            onSubmitProps.resetForm();
            if (savedConvenor) {
                setMessage("Convenor Added!");
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 3000);
            }
        } catch (error) {
            alert("There is some error! Please Try Again.");
            console.log(error);
        }
    };

    //transition for snackbar
    const SlideTransition = (props) => {
        return <Slide {...props} direction="down" />;
    };
    return (
        <Box>
            <Box
                m="1rem 2.5rem"
                position="relative"
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, ease: "easeInOut" }}
            >
                <Header
                    title="ADD CONVENOR"
                    subtitle="Add New Convenor Details."
                />
                <Snackbar
                    sx={{ position: "absolute" }}
                    open={open}
                    autoHideDuration={6000}
                    TransitionComponent={SlideTransition}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Alert variant="filled" severity="success">
                        {message}
                    </Alert>
                </Snackbar>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValuesConvenor}
                    validationSchema={addConvenorSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <Box>
                                <Card
                                    sx={{
                                        backgroundImage: "none",
                                        backgroundColor:
                                            theme.palette.background.alt,
                                        marginTop: "20px",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <Box
                                            component={motion.div}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            exit={{ y: 20, opacity: 0 }}
                                            sx={{
                                                width: "90%",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                flexWrap: "Wrap",
                                            }}
                                        >
                                            <TextField
                                                sx={{ width: "18rem" }}
                                                id="name"
                                                autoComplete="off"
                                                color="secondary"
                                                label="Convenor Name"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    touched.name
                                                        ? errors.name
                                                        : ""
                                                }
                                                error={
                                                    touched.name &&
                                                    Boolean(errors.name)
                                                }
                                                margin="normal"
                                                variant="outlined"
                                            />
                                            <TextField
                                                name="email"
                                                sx={{ width: "18rem" }}
                                                notched="true"
                                                color="secondary"
                                                id="email"
                                                autoComplete="off"
                                                label="Convenor Email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    touched.email
                                                        ? errors.email
                                                        : ""
                                                }
                                                error={
                                                    touched.email &&
                                                    Boolean(errors.email)
                                                }
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
                                            component={motion.div}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            exit={{ y: 20, opacity: 0 }}
                                            sx={{
                                                width: "90%",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                flexWrap: "Wrap",
                                            }}
                                        >
                                            <TextField
                                                sx={{ width: "18rem" }}
                                                notched="true"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                autoComplete="off"
                                                color="secondary"
                                                id="password"
                                                label="Convenor Password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    touched.password
                                                        ? errors.password
                                                        : ""
                                                }
                                                error={
                                                    touched.password &&
                                                    Boolean(errors.password)
                                                }
                                                margin="normal"
                                                variant="outlined"
                                                InputProps={{
                                                    // <-- This is where the toggle button is added.
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={
                                                                    handleClickShowPassword
                                                                }
                                                                onMouseDown={
                                                                    handleMouseDownPassword
                                                                }
                                                            >
                                                                {showPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                margin="normal"
                                                color="secondary"
                                                name="committee"
                                                variant="outlined"
                                                sx={{ width: "18rem" }}
                                                notched="true"
                                                value={values.committee}
                                                id="committee"
                                                select
                                                label="Committee"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={
                                                    touched.committee &&
                                                    Boolean(errors.committee)
                                                }
                                            >
                                                <MenuItem disabled>
                                                    Select a Committee
                                                </MenuItem>
                                                {data.committees &&
                                                    data.committees.map(
                                                        (committee) => (
                                                            <MenuItem
                                                                key={
                                                                    committee._id
                                                                }
                                                                value={`${committee.name}|${committee._id}`}
                                                            >
                                                                {committee.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                            </TextField>
                                        </Box>
                                        <Box
                                            component={motion.div}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            exit={{ y: 20, opacity: 0 }}
                                            sx={{
                                                width: "90%",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                flexWrap: "Wrap",
                                            }}
                                        >
                                            <TextField
                                                sx={{ width: "18rem" }}
                                                id="mobile"
                                                name="mobile"
                                                autoComplete="off"
                                                color="secondary"
                                                label="Mobile Number"
                                                value={values.mobile}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    touched.mobile
                                                        ? errors.mobile
                                                        : ""
                                                }
                                                error={
                                                    touched.mobile &&
                                                    Boolean(errors.mobile)
                                                }
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </Box>
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
                                            Add Convenor
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default AddConvenor;
