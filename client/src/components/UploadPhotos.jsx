import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { CloudUploadOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const UploadPhotos = ({ id, getEvents }) => {
  const photosSchema = yup.object().shape({
    photos: yup
      .array()
      .required("*photos required")
      .max(5, "You can upload up to 5 photos."),
  });

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      console.log(values);
      const formData = new FormData();
      for (let photo of values.photos) {
        formData.append("photos", photo);
      }
      formData.append("id", id);
      const photosResponse = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/event/uploadPhotos`,
        headers: { "Content-Type": "application/JSON" },
        data: formData,
      });
      const updatedEvent = await photosResponse.data;
      onSubmitProps.resetForm();
      if (updatedEvent) {
        console.log(updatedEvent);
        getEvents();
        toast("Photos Uploaded!.", {
          type: "success",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast("There was some error! Please Try again.", {
        type: "error",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{ photos: [] }}
      validationSchema={photosSchema}
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
          {values.photos.length === 0 ? (
            <Box>
              <Dropzone
                accept={{
                  "image/*": [".jpeg", ".png"],
                }}
                multiple
                maxFiles={5}
                onDrop={(acceptedFiles, fileRejections) => {
                  if (fileRejections.length > 0) {
                    window.alert(`You cannot upload more than 5 photos.`);
                  }
                  if (values.photos.length + acceptedFiles.length <= 5) {
                    setFieldValue("photos", [
                      ...values.photos,
                      ...acceptedFiles,
                    ]);
                  }
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box {...getRootProps()}>
                    <input {...getInputProps()} />
                    {values.photos.length <= 0 && (
                      <Typography
                        variant='p'
                        backgroundColor='#f44336'
                        color='#fff'
                        p={1}
                        borderRadius='5px'
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
                        onClick={() =>
                          window.alert("You can upload up to 5 photos.")
                        }
                      >
                        UPLOAD PHOTOS
                        <CloudUploadOutlined />
                      </Typography>
                    )}
                  </Box>
                )}
              </Dropzone>
              {errors.photos && touched.photos && (
                <div style={{ color: "#d32f2f" }}>
                  {window.alert(errors.photos)}
                </div>
              )}
            </Box>
          ) : (
            <Box>
              <Button type='submit'>
                <Typography
                  variant='p'
                  backgroundColor='#66bb6a'
                  color='#fff'
                  p={1}
                  borderRadius='5px'
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
                  variant='p'
                  backgroundColor='rgb(255 167 38)'
                  color='#fff'
                  p={1}
                  borderRadius='5px'
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

export default UploadPhotos;
