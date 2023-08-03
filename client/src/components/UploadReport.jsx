import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { CloudUploadOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dropzone from "react-dropzone";
import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

import FlexBetween from "./FlexBetween";
import { useUploadReportMutation } from "state/eventApiSlice";

const UploadReport = ({ id }) => {
  const [uploadReport] = useUploadReportMutation();

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
      const res = await uploadReport(formData).unwrap();
      if (res) {
        onSubmitProps.resetForm();
        toast.success("Report Uploaded!.");
      }
    } catch (error) {
      toast.error("There was some error! Please Try again.");
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
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
                      <Button
                        variant='contained'
                        color='error'
                        endIcon={<CloudUploadOutlined />}
                        sx={{
                          minWidth: "9rem",
                          color: "#fff",
                        }}
                      >
                        UPLOAD NOW
                      </Button>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.report.name}</Typography>
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
              <Button
                type='submit'
                variant='contained'
                color='success'
                sx={{
                  color: "#fff",
                  marginRight: "10px",
                }}
              >
                Submit
              </Button>
              <Button
                variant='contained'
                color='warning'
                sx={{
                  color: "#fff",
                }}
                onClick={resetForm}
              >
                Reset
              </Button>
            </Box>
          )}
        </form>
      )}
    </Formik>
  );
};

export default UploadReport;
