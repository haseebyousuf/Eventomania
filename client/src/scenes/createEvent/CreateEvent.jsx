import React from "react";
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
// import { useNavigate } from "react-router-dom";

const eventScheema = yup.object().shape({
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
    recomendedAudiance: yup.string(),
});

const initailValuesEvent = {
    name: "",
    startDate: null,
    endDate: null,
    venue: "",
    description: "",
    banner: "",
    order: "",
    recomendedAudiance: "",
};

const CreateEvent = () => {
    const mode = useSelector((state) => state.mode);
    const user = useSelector((state) => state.user);
    const theme = useTheme();
    const { palette } = useTheme();

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
                url: "http://localhost:5001/event/createEvent",
                headers: { "Content-Type": "application/JSON" },
                data: formData,
            });
            const savedEvent = await savedEventResponse.data;
            onSubmitProps.resetForm();
            if (savedEvent) {
                alert("Added Successfully!");
                // <Alert variant="outlined" severity="success">
                //   <AlertTitle>Added</AlertTitle>
                //   <strong>{savedCommittee.name}</strong> added successfully!
                // </Alert>
            }
        } catch (error) {
            console.log(error.response);
            // <Alert variant="outlined" severity="error">
            //   <AlertTitle>Error</AlertTitle>
            //   Failed to connect to server
            // </Alert>;
        }
    };
    const isNonMobile = useMediaQuery("(min-width: 700px)");

    return (
        <Box overflow="scroll">
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
                        CREATE EVENT
                    </Typography>
                    <Typography
                        fontSize="1rem"
                        textDecoration="underline"
                        fontWeight="bold"
                        color={theme.palette.secondary.main}
                    >
                        {/* Convenor Details */}
                    </Typography>
                </Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initailValuesEvent}
                    validationSchema={eventScheema}
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
                                            padding: isNonMobile
                                                ? "2rem 5rem"
                                                : "1rem 1rem",
                                        }}
                                    >
                                        <Box
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
                                            sx={{
                                                width: "100%",
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
                                                        sx={{ width: "18rem" }}
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
                                                                        : "",
                                                            },
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
                                                        sx={{ width: "18rem" }}
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
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Box>
                                        <Box
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
                                                id="recomendedAudiance"
                                                name="recomendedAudiance"
                                                autoComplete="off"
                                                color="secondary"
                                                label="Recomended Audiance"
                                                value={
                                                    values.recomendedAudiance
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                margin="normal"
                                                helperText={
                                                    touched.recomendedAudiance
                                                        ? errors.recomendedAudiance
                                                        : "Seperate Each by Comma (,)"
                                                }
                                                error={
                                                    touched.recomendedAudiance &&
                                                    Boolean(
                                                        errors.recomendedAudiance
                                                    )
                                                }
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box
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
