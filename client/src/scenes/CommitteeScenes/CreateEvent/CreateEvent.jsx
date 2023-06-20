import React, { useState } from "react";
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
    Snackbar,
    Alert,
    Slide,
} from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "components/Header";
// import { useNavigate } from "react-router-dom";

const eventSchema = yup.object().shape({
    name: yup.string().required("*Name Required!"),
    startDate: yup
        .date()
        .required("Start Date is required")
        .typeError("Invalid Date and Time!"),
    endDate: yup
        .date()
        .required("Start Date and Time is required")
        .typeError("Invalid Date and Time!"),
    venue: yup.string().required("*Venue is Required!"),
    description: yup.string().required("*Description is Required"),
    banner: yup.string().required("*banner required"),
    order: yup.string().required("*order file required"),
    recommendedAudience: yup.string(),
});

const initialValuesEvent = {
    name: "",
    startDate: null,
    endDate: null,
    venue: "",
    description: "",
    banner: "",
    order: "",
    recommendedAudience: "",
};

const CreateEvent = () => {
    const user = useSelector((state) => state.user);
    const isNonMobile = useMediaQuery("(min-width: 700px)");
    const theme = useTheme();
    const { palette } = useTheme();

    const [open, setOpen] = useState(false);

    const handleFormSubmit = async (values, onSubmitProps) => {
        try {
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            const committee = {
                id: user.committeeId,
                name: user.committeeName,
            };
            const createdBy = { id: user._id, name: user.name };
            formData.append("committee", [JSON.stringify(committee)]);
            formData.append("createdBy", [JSON.stringify(createdBy)]);

            const savedEventResponse = await axios({
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/event/createEvent`,
                headers: { "Content-Type": "application/JSON" },
                data: formData,
            });
            const savedEvent = await savedEventResponse.data;
            onSubmitProps.resetForm();
            if (savedEvent) {
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
        <Box overflow="scroll">
            <Box
                m="1rem 2.5rem"
                position="relative"
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, ease: "easeInOut" }}
            >
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    TransitionComponent={SlideTransition}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Alert variant="filled" severity="success">
                        Event Created Successfully!
                    </Alert>
                </Snackbar>
                <Header title="CREATE EVENT" subtitle="Create a New Event." />
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValuesEvent}
                    validationSchema={eventSchema}
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
                                    sx={{
                                        backgroundImage: "none",
                                        backgroundColor:
                                            theme.palette.background.alt,
                                        marginTop: "20px",
                                    }}
                                >
                                    <CardContent
                                        mt="20px"
                                        sx={{
                                            width: isNonMobile ? "70%" : "95%",
                                            display: "flex",
                                            margin: "auto",
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
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: isNonMobile
                                                    ? "space-between"
                                                    : "center",
                                                flexWrap: "Wrap",
                                            }}
                                        >
                                            <TextField
                                                sx={{ width: "18rem" }}
                                                id="name"
                                                autoComplete="off"
                                                color="secondary"
                                                label="Event Name"
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
                                                name="venue"
                                                sx={{ width: "18rem" }}
                                                notched="true"
                                                color="secondary"
                                                id="venue"
                                                autoComplete="off"
                                                label="Venue"
                                                value={values.venue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    touched.venue
                                                        ? errors.venue
                                                        : ""
                                                }
                                                error={
                                                    touched.venue &&
                                                    Boolean(errors.venue)
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
                                                width: isNonMobile
                                                    ? "100%"
                                                    : "auto",
                                                display: "flex",
                                                justifyContent: isNonMobile
                                                    ? "space-between"
                                                    : "center",
                                                flexWrap: "Wrap",
                                            }}
                                        >
                                            <LocalizationProvider
                                                dateAdapter={AdapterMoment}
                                            >
                                                <DemoContainer
                                                    components={[
                                                        "DateTimePicker",
                                                    ]}
                                                >
                                                    <DateTimePicker
                                                        label="Start Date & Time"
                                                        name="startDate"
                                                        id="startDate"
                                                        value={values.startDate}
                                                        onChange={(value) => {
                                                            setFieldValue(
                                                                "startDate",
                                                                moment(value)
                                                            );
                                                        }}
                                                        onBlur={handleBlur}
                                                        disablePast
                                                        slotProps={{
                                                            textField: {
                                                                margin: "normal",
                                                                color: "secondary",
                                                                onBlur: handleBlur,
                                                                error:
                                                                    touched.startDate &&
                                                                    Boolean(
                                                                        errors.startDate
                                                                    ),
                                                                helperText:
                                                                    touched.startDate
                                                                        ? errors.startDate
                                                                        : "Enter when event will start",
                                                            },
                                                        }}
                                                        sx={{
                                                            width: isNonMobile
                                                                ? "18rem"
                                                                : "15rem",
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            <LocalizationProvider
                                                dateAdapter={AdapterMoment}
                                            >
                                                <DemoContainer
                                                    components={[
                                                        "DateTimePicker",
                                                    ]}
                                                >
                                                    <DateTimePicker
                                                        helperText="Enter When the event will start"
                                                        label="End Date & Time"
                                                        name="endDate"
                                                        id="endDate"
                                                        value={values.endDate}
                                                        onChange={(value) => {
                                                            setFieldValue(
                                                                "endDate",
                                                                moment(value)
                                                            );
                                                        }}
                                                        onBlur={handleBlur}
                                                        disablePast
                                                        slotProps={{
                                                            textField: {
                                                                margin: "normal",
                                                                color: "secondary",
                                                                onBlur: handleBlur,
                                                                error:
                                                                    touched.endDate &&
                                                                    Boolean(
                                                                        errors.endDate
                                                                    ),
                                                                helperText:
                                                                    touched.endDate
                                                                        ? errors.endDate
                                                                        : "Enter when event will end",
                                                            },
                                                        }}
                                                        sx={{
                                                            width: isNonMobile
                                                                ? "18rem"
                                                                : "16rem",
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Box>
                                        <Box
                                            component={motion.div}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                            exit={{ y: 20, opacity: 0 }}
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: isNonMobile
                                                    ? "space-between"
                                                    : "center",
                                                flexWrap: "Wrap",
                                            }}
                                        >
                                            <TextField
                                                sx={{
                                                    width: isNonMobile
                                                        ? "100%"
                                                        : "18rem",
                                                }}
                                                id="description"
                                                name="description"
                                                autoComplete="off"
                                                color="secondary"
                                                multiline
                                                minRows={3}
                                                label="Event Description"
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                margin="normal"
                                                helperText={
                                                    touched.description
                                                        ? errors.description
                                                        : ""
                                                }
                                                error={
                                                    touched.description &&
                                                    Boolean(errors.description)
                                                }
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
                                            component={motion.div}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                            exit={{ y: 20, opacity: 0 }}
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: isNonMobile
                                                    ? "space-between"
                                                    : "center",
                                                flexWrap: "Wrap",
                                            }}
                                        >
                                            <TextField
                                                sx={{
                                                    width: isNonMobile
                                                        ? "100%"
                                                        : "18rem",
                                                }}
                                                id="recommendedAudience"
                                                name="recommendedAudience"
                                                autoComplete="off"
                                                color="secondary"
                                                label="Recommended Audience"
                                                value={
                                                    values.recommendedAudience
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                margin="normal"
                                                helperText={
                                                    touched.recommendedAudience
                                                        ? errors.recommendedAudience
                                                        : "Separate Each by Comma (,)"
                                                }
                                                error={
                                                    touched.recommendedAudience &&
                                                    Boolean(
                                                        errors.recommendedAudience
                                                    )
                                                }
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
                                            component={motion.div}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 1 }}
                                            exit={{ y: 20, opacity: 0 }}
                                            border={`1px solid ${palette.neutral.medium}`}
                                            borderRadius="5px"
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: isNonMobile
                                                    ? "space-between"
                                                    : "center",
                                                flexWrap: "Wrap",
                                            }}
                                        >
                                            <Dropzone
                                                sx={{
                                                    width: isNonMobile
                                                        ? "100%"
                                                        : "18rem",
                                                }}
                                                // acceptedFiles={[".jpg,.jpeg,.png"]}
                                                accept={{
                                                    "image/*": [
                                                        ".jpeg",
                                                        ".png",
                                                    ],
                                                }}
                                                multiple={false}
                                                onDrop={(acceptedFiles) =>
                                                    setFieldValue(
                                                        "banner",
                                                        acceptedFiles[0]
                                                    )
                                                }
                                            >
                                                {({
                                                    getRootProps,
                                                    getInputProps,
                                                }) => (
                                                    <Box
                                                        {...getRootProps()}
                                                        border={`2px dashed ${palette.neutral.light}`}
                                                        margin="1rem 0 1rem 0"
                                                        p="1rem"
                                                        sx={{
                                                            "&:hover": {
                                                                cursor: "pointer",
                                                            },
                                                            width: isNonMobile
                                                                ? "100%"
                                                                : "18rem",
                                                        }}
                                                    >
                                                        <input
                                                            {...getInputProps()}
                                                        />
                                                        {!values.banner ? (
                                                            <>
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "row",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: 1,
                                                                    }}
                                                                >
                                                                    <CloudUploadOutlined />
                                                                    <p
                                                                        style={{
                                                                            fontSize:
                                                                                !isNonMobile &&
                                                                                "0.7rem",
                                                                        }}
                                                                    >
                                                                        Add
                                                                        Banner
                                                                        Here{" "}
                                                                        <span
                                                                            style={{
                                                                                color: "red",
                                                                            }}
                                                                        >
                                                                            {" "}
                                                                            (Only
                                                                            .jpg
                                                                            and
                                                                            .png)
                                                                        </span>
                                                                    </p>
                                                                </Box>
                                                            </>
                                                        ) : (
                                                            <FlexBetween>
                                                                <Typography>
                                                                    {
                                                                        values
                                                                            .banner
                                                                            .name
                                                                    }
                                                                </Typography>
                                                                <EditOutlinedIcon />
                                                            </FlexBetween>
                                                        )}
                                                    </Box>
                                                )}
                                            </Dropzone>
                                            {errors.banner &&
                                                touched.banner && (
                                                    <div
                                                        style={{
                                                            color: "#d32f2f",
                                                        }}
                                                    >
                                                        {errors.banner}
                                                    </div>
                                                )}
                                        </Box>
                                        <Box
                                            component={motion.div}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 1.2 }}
                                            exit={{ y: 20, opacity: 0 }}
                                            border={`1px solid ${palette.neutral.medium}`}
                                            borderRadius="5px"
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: isNonMobile
                                                    ? "space-between"
                                                    : "center",
                                                flexWrap: "Wrap",
                                            }}
                                        >
                                            <Dropzone
                                                sx={{
                                                    width: isNonMobile
                                                        ? "100%"
                                                        : "18rem",
                                                }}
                                                accept={{
                                                    "application/pdf": [".pdf"],
                                                }}
                                                multiple={false}
                                                onDrop={(acceptedFiles) =>
                                                    setFieldValue(
                                                        "order",
                                                        acceptedFiles[0]
                                                    )
                                                }
                                            >
                                                {({
                                                    getRootProps,
                                                    getInputProps,
                                                }) => (
                                                    <Box
                                                        {...getRootProps()}
                                                        border={`2px dashed ${palette.neutral.light}`}
                                                        margin="1rem 0 1rem 0"
                                                        p="1rem"
                                                        sx={{
                                                            "&:hover": {
                                                                cursor: "pointer",
                                                            },
                                                            width: isNonMobile
                                                                ? "100%"
                                                                : "18rem",
                                                        }}
                                                    >
                                                        <input
                                                            {...getInputProps()}
                                                        />
                                                        {!values.order ? (
                                                            <>
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "row",
                                                                        alignItems:
                                                                            "center",
                                                                        gap: 1,
                                                                    }}
                                                                >
                                                                    <CloudUploadOutlined />
                                                                    <p
                                                                        style={{
                                                                            fontSize:
                                                                                !isNonMobile &&
                                                                                "0.7rem",
                                                                        }}
                                                                    >
                                                                        Add
                                                                        Order
                                                                        File
                                                                        Here{" "}
                                                                        <span
                                                                            style={{
                                                                                color: "red",
                                                                            }}
                                                                        >
                                                                            {" "}
                                                                            (Only
                                                                            .pdf)
                                                                        </span>
                                                                    </p>
                                                                </Box>
                                                            </>
                                                        ) : (
                                                            <FlexBetween>
                                                                <Typography>
                                                                    {
                                                                        values
                                                                            .order
                                                                            .name
                                                                    }
                                                                </Typography>
                                                                <EditOutlinedIcon />
                                                            </FlexBetween>
                                                        )}
                                                    </Box>
                                                )}
                                            </Dropzone>
                                            {errors.order && touched.order && (
                                                <div
                                                    style={{
                                                        color: "#d32f2f",
                                                    }}
                                                >
                                                    {errors.order}
                                                </div>
                                            )}
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
                                            Create Event
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

export default CreateEvent;