import React, { useState } from "react";
import axios from "axios";
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    CardActions,
    Snackbar,
    Alert,
    Slide,
    useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
const inputs = [
    { id: 1, label: "Committee Name", name: "name" },
    { id: 2, label: "Description", name: "description" },
];
const addCommitteeSchema = yup.object().shape({
    name: yup.string().required("*Name is Required"),
    description: yup.string().required("Description is required"),
});

const initialValuesCommittee = {
    name: "",
    description: "",
};
const Form = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);

    const handleFormSubmit = async (values, onSubmitProps) => {
        try {
            const savedCommitteeResponse = await axios({
                method: "post",

                url: `${process.env.REACT_APP_BASE_URL}/committee/add-committee`,
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(values),
            });
            const savedCommittee = await savedCommitteeResponse.data;
            onSubmitProps.resetForm();
            if (savedCommittee) {
                setMessage("Committee Added!");
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 3000);
            }
        } catch (error) {
            alert("There is some error! Please Try Again.");
        }
    };
    //transition for snackbar
    const SlideTransition = (props) => {
        return <Slide {...props} direction="down" />;
    };
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesCommittee}
            validationSchema={addCommitteeSchema}
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
                            horizontal: "center",
                        }}
                    >
                        <Alert variant="filled" severity="success">
                            {message}
                        </Alert>
                    </Snackbar>
                    <Box>
                        <Card
                            sx={{
                                backgroundImage: "none",
                                backgroundColor: theme.palette.background.alt,
                                borderRadius: "0.55rem",
                                marginTop: "20px",
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        width: isNonMobile ? "60%" : "90%",
                                        margin: "auto",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {inputs.map((input) => (
                                        <TextField
                                            component={motion.div}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: 0.13 * input.id,
                                            }}
                                            exit={{ y: 20, opacity: 0 }}
                                            key={input.id}
                                            id={input.name}
                                            autoComplete="off"
                                            color="secondary"
                                            label={input.label}
                                            value={values[input.name]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            multiline={
                                                input.id === 2 ? true : false
                                            }
                                            minRows={3}
                                            helperText={
                                                touched[input.name]
                                                    ? errors[input.name]
                                                    : ""
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
