import { Formik } from "formik";
import { CloudUploadOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";

import { useUploadPhotosMutation } from "state/eventApiSlice";
import { photosSchema } from "utils/validationSchemas";

const UploadPhotos = ({ id }) => {
  //rtk
  const [uploadPhotos, { isLoading }] = useUploadPhotosMutation();

  //handler
  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let photo of values.photos) {
        formData.append("photos", photo);
      }
      formData.append("id", id);
      const promise = toast.promise(
        uploadPhotos(formData)
          .unwrap()
          .then((photosResponse) => photosResponse.data),
        {
          pending: "Uploading photos...",
          success: "Photos Uploaded!",
          error: "There was some error! Please Try again.",
        }
      );
      const updatedEvent = await promise;
      if (updatedEvent) {
        onSubmitProps.resetForm();
      }
    } catch (error) {}
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
                    <input data-testid='dropzone' {...getInputProps()} />
                    {values.photos.length <= 0 && (
                      <Button
                        name='photo_error'
                        variant='contained'
                        color='error'
                        endIcon={<CloudUploadOutlined />}
                        sx={{
                          minWidth: "9rem",
                          color: "#fff",
                          padding: "auto 0px",
                        }}
                        onClick={() =>
                          window.alert("You can upload up to 5 photos.")
                        }
                      >
                        UPLOAD NOW
                      </Button>
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
              <Button
                name='submit'
                disabled={isLoading}
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
                name='reset'
                variant='contained'
                color='warning'
                sx={{
                  color: "#fff",
                  padding: "6px 0px",
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

export default UploadPhotos;
