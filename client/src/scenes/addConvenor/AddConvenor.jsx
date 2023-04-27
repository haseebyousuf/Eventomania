import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
    Card,
    CardContent,
    TextField,
    Button,
    CardActions,
    InputAdornment,
    IconButton,
    MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { FlexBetween } from "../../components/FlexBetween";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";

const addConvenorScheema = yup.object().shape({
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
    const [data, setData] = useState({ committees: null, isLoading: true });
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
    }, []);
    const theme = useTheme();
    const mode = useSelector((state) => state.mode);

    // if (data) {
    //   const committees = data.map((committee) => committee.convenor === "");
    //   console.log(committees);
    // }
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
                url: "http://localhost:5001/admin/addConvenor",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(convenor),
            });
            const savedConvenor = await savedConvenorResponse.data;
            onSubmitProps.resetForm();
            if (savedConvenor) {
                alert("Added Successfully!");
                // <Alert variant="outlined" severity="success">
                //   <AlertTitle>Added</AlertTitle>
                //   <strong>{savedCommittee.name}</strong> added successfully!
                // </Alert>
            }
        } catch (error) {
            alert("error");
            // <Alert variant="outlined" severity="error">
            //   <AlertTitle>Error</AlertTitle>
            //   Failed to connect to server
            // </Alert>;
        }
    };
    const isNonMobile = useMediaQuery("(min-width: 600px)");

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <Box>
            <Box width={isNonMobile ? "80%" : "90%"} m="2rem auto">
                <Box
                    marginBottom="1rem"
                    flexDirection="column"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        fontSize="1.5rem"
                        textDecoration="underline"
                        fontWeight="bold"
                        // p="0.5rem 0 0 0"
                        color={theme.palette.secondary.main}
                    >
                        ADD CONVENOR
                    </Typography>
                    <Typography
                        fontSize="1rem"
                        textDecoration="underline"
                        fontWeight="bold"
                        color={theme.palette.secondary.main}
                    >
                        Convenor Details
                    </Typography>
                </Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValuesConvenor}
                    validationSchema={addConvenorScheema}
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
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <Box>
                                <Card
                                    raised
                                    sx={{
                                        backgroundColor:
                                            mode === "dark"
                                                ? "transparent"
                                                : theme.palette.background.alt,
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
