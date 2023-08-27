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
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { useCreateEventMutation } from "state/eventApiSlice";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { eventSchema } from "utils/validationSchemas";
import { eventInitialValues } from "utils/initialValues";

const CreateEvent = () => {
  const user = useSelector((state) => state.global.user);
  const isNonMobile = useMediaQuery("(min-width: 700px)");
  const theme = useTheme();
  const { palette } = useTheme();

  //rtk query
  const [createEvent] = useCreateEventMutation();

  //handlers
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
      const res = await createEvent(formData).unwrap();
      if (res) {
        onSubmitProps.resetForm();
      }
      toast.success("Event Created Successfully!");
    } catch (error) {
      toast.error("There was some error! Please Try again.");
    }
  };

  return (
    <Box overflow='scroll'>
      <Box
        m={isNonMobile ? "1.5rem 2.5rem" : "1.5rem"}
        position='relative'
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "easeInOut" }}
      >
        <Header title='CREATE EVENT' subtitle='Create a New Event.' />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={eventInitialValues}
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
            setTouched,
            resetForm,
          }) => (
            <form autoComplete='off' onSubmit={handleSubmit}>
              <Box>
                <Card
                  sx={{
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.alt,
                    marginTop: "20px",
                  }}
                >
                  <CardContent
                    mt='20px'
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
                        id='name'
                        autoComplete='off'
                        color='secondary'
                        label='Event Name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.name ? errors.name : ""}
                        error={touched.name && Boolean(errors.name)}
                        margin='normal'
                        variant='outlined'
                      />
                      <TextField
                        name='venue'
                        sx={{ width: "18rem" }}
                        notched='true'
                        color='secondary'
                        id='venue'
                        autoComplete='off'
                        label='Venue'
                        value={values.venue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.venue ? errors.venue : ""}
                        error={touched.venue && Boolean(errors.venue)}
                        margin='normal'
                        variant='outlined'
                      />
                    </Box>
                    <Box
                      component={motion.div}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      exit={{ y: 20, opacity: 0 }}
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: isNonMobile
                          ? "space-between"
                          : "center",
                        flexWrap: "Wrap",
                        gap: 2,
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={["DesktopDateTimePicker"]}>
                          <DesktopDateTimePicker
                            helperText='Enter When the event will start'
                            label='Start Date & Time'
                            name='startDate'
                            id='startDate'
                            viewRenderers={{
                              hours: null,
                              minutes: null,
                              seconds: null,
                            }}
                            value={values.startDate}
                            disablePast
                            onChange={(value) => {
                              setFieldValue("startDate", moment(value), true);
                              setTouched({ startDate: true });
                            }}
                            sx={{
                              width: "18rem",
                            }}
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                onBlur: () => setTouched({ startDate: true }),

                                error: Boolean(
                                  touched.startDate && errors.startDate
                                ),
                                helperText:
                                  touched.startDate && errors.startDate,
                                margin: "normal",
                                color: "secondary",
                              },
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={["DesktopDateTimePicker"]}>
                          <DesktopDateTimePicker
                            helperText='Enter When the event will end'
                            label='End Date & Time'
                            name='endDate'
                            id='endDate'
                            viewRenderers={{
                              hours: null,
                              minutes: null,
                              seconds: null,
                            }}
                            value={values.endDate}
                            disablePast
                            onChange={(value) => {
                              setFieldValue("endDate", moment(value), true);
                              setTouched({ endDate: true });
                            }}
                            sx={{
                              width: "18rem",
                            }}
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                onBlur: () => setTouched({ endDate: true }),

                                error: Boolean(
                                  touched.endDate && errors.endDate
                                ),
                                helperText: touched.endDate && errors.endDate,
                                margin: "normal",
                                color: "secondary",
                              },
                            }}
                          />
                        </DemoContainer>
                        {/* <MobileDatePicker
                          disablePast
                          format='DD/MM/YYYY'
                          name='startDate'
                          label='Start Date'
                          value={values.startDate}
                          onChange={(value) =>
                            setFieldValue("startDate", moment(value), true)
                          }
                          sx={{
                            width: "18rem",
                          }}
                          slotProps={{
                            textField: {
                              variant: "outlined",
                              onBlur: () => setTouched({ startDate: true }),

                              error: Boolean(
                                touched.startDate && errors.startDate
                              ),
                              helperText: touched.startDate && errors.startDate,
                              margin: "normal",
                              color: "secondary",
                            },
                          }}
                        /> */}
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
                          width: isNonMobile ? "100%" : "18rem",
                        }}
                        id='description'
                        name='description'
                        autoComplete='off'
                        color='secondary'
                        multiline
                        minRows={5}
                        label='Event Description'
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin='normal'
                        helperText={
                          touched.description ? errors.description : ""
                        }
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        fullWidth
                        variant='outlined'
                      />
                    </Box>

                    <Box
                      component={motion.div}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      border={`1px solid ${palette.neutral.medium}`}
                      borderRadius='5px'
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
                          width: isNonMobile ? "100%" : "18rem",
                        }}
                        // acceptedFiles={[".jpg,.jpeg,.png"]}
                        accept={{
                          "image/*": [".jpeg", ".png"],
                        }}
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                          setFieldValue("banner", acceptedFiles[0])
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.neutral.light}`}
                            margin='1rem 0 1rem 0'
                            p='1rem'
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                              width: isNonMobile ? "100%" : "18rem",
                            }}
                          >
                            <input {...getInputProps()} />
                            {!values.banner ? (
                              <>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <CloudUploadOutlined />
                                  <p
                                    style={{
                                      fontSize: !isNonMobile && "0.7rem",
                                    }}
                                  >
                                    Add Banner Here{" "}
                                    <span
                                      style={{
                                        color: "red",
                                      }}
                                    >
                                      {" "}
                                      (Only .jpg and .png)
                                    </span>
                                  </p>
                                </Box>
                              </>
                            ) : (
                              <FlexBetween>
                                <Typography>{values.banner.name}</Typography>
                                <EditOutlinedIcon />
                              </FlexBetween>
                            )}
                          </Box>
                        )}
                      </Dropzone>
                      {errors.banner && touched.banner && (
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
                      borderRadius='5px'
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
                          width: isNonMobile ? "100%" : "18rem",
                        }}
                        accept={{
                          "application/pdf": [".pdf"],
                        }}
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                          setFieldValue("order", acceptedFiles[0])
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.neutral.light}`}
                            margin='1rem 0 1rem 0'
                            p='1rem'
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                              width: isNonMobile ? "100%" : "18rem",
                            }}
                          >
                            <input {...getInputProps()} />
                            {!values.order ? (
                              <>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <CloudUploadOutlined />
                                  <p
                                    style={{
                                      fontSize: !isNonMobile && "0.7rem",
                                    }}
                                  >
                                    Add Order File Here{" "}
                                    <span
                                      style={{
                                        color: "red",
                                      }}
                                    >
                                      {" "}
                                      (Only .pdf)
                                    </span>
                                  </p>
                                </Box>
                              </>
                            ) : (
                              <FlexBetween>
                                <Typography>{values.order.name}</Typography>
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
                    display='flex'
                    sx={{
                      marginBottom: "1rem",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      name='create_event'
                      variant='contained'
                      type='submit'
                      sx={{
                        fontWeight: "bold",
                      }}
                      size='large'
                      color='secondary'
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
