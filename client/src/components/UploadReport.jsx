import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { CloudUploadOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import Dropzone from "react-dropzone";
import { Box, Button, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import axios from "axios";

const UploadReport = ({ id, getEvents, setOpen }) => {
    const reportSchema = yup.object().shape({
        report: yup.string().required("*report required"),
    });
    const initialReportValue = {
        report: "",
    };
    const handleFormSubmit = async (values, onSubmitProps) => {
        try {
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            formData.append("id", id);
            const reportResponse = await axios({
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/event/uploadReport`,
                headers: { "Content-Type": "application/JSON" },
                data: formData,
            });
            const updatedEvent = await reportResponse.data;
            onSubmitProps.resetForm();
            if (updatedEvent) {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 3000);
                getEvents();
            }
        } catch (error) {
            alert("There is some error! Please try again later.");
        }
    };
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialReportValue}
            validationSchema={reportSchema}
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
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {!values.report ? (
                        <Box>
                            <Dropzone
                                accept={{
                                    "application/pdf": [".pdf"],
                                }}
                                multiple={false}
                                onDrop={(acceptedFiles) => {
                                    setFieldValue("report", acceptedFiles[0]);
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {!values.report ? (
                                            <>
                                                <Typography
                                                    variant="p"
                                                    backgroundColor="#f44336"
                                                    color="#fff"
                                                    p={1}
                                                    borderRadius="5px"
                                                    sx={{
                                                        marginLeft: "10px",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: 0.5,
                                                        "&:hover": {
                                                            cursor: "pointer",
                                                        },
                                                    }}
                                                >
                                                    UPLOAD REPORT
                                                    <CloudUploadOutlined />
                                                </Typography>
                                            </>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>
                                                    {values.report.name}
                                                </Typography>
                                                <EditOutlinedIcon />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                            {errors.report && touched.report && (
                                <div
                                    style={{
                                        color: "#d32f2f",
                                    }}
                                >
                                    {errors.report}
                                </div>
                            )}
                        </Box>
                    ) : (
                        <Box>
                            <Button type="submit">
                                <Typography
                                    variant="p"
                                    backgroundColor="#66bb6a"
                                    color="#fff"
                                    p={1}
                                    borderRadius="5px"
                                    sx={{
                                        marginLeft: "5px",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    Submit
                                </Typography>
                            </Button>
                            <Button onClick={resetForm}>
                                <Typography
                                    variant="p"
                                    backgroundColor="rgb(255 167 38)"
                                    color="#fff"
                                    p={1}
                                    borderRadius="5px"
                                    sx={{
                                        marginLeft: "5px",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    Reset
                                </Typography>
                            </Button>
                        </Box>
                    )}
                </form>
            )}
        </Formik>
    );
};

export default UploadReport;
