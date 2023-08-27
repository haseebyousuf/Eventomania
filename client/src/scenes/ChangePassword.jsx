import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  CardActions,
  useMediaQuery,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useChangePasswordMutation } from "state/adminApiSlice";
import Header from "components/Header";
import { changePasswordSchema } from "utils/validationSchemas";
import { changePasswordInitialValues } from "utils/initialValues";

const inputs = [
  { id: 1, label: "Current Password", name: "currentPassword" },
  { id: 2, label: "New Password", name: "newPassword" },
  { id: 3, label: "Confirm New Password", name: "cNewPassword" },
];

const ConfirmPassword = () => {
  //hooks
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  const user = useSelector((state) => state.global.user);

  //state
  const [showPassword, setShowPassword] = useState([false, false, false]);

  //rtk query
  const [changePassword] = useChangePasswordMutation();

  //handlers
  const handleClickShowPassword = (index) => {
    setShowPassword((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      values.userId = user._id;
      const res = await changePassword(values).unwrap();
      if (res) {
        onSubmitProps.resetForm();
        toast.success("Password Changed Successfully");
      }
    } catch (error) {
      toast.error(error.data.msg || "Server Error!");
    }
  };

  return (
    <Box>
      <Box
        m={isNonMobile ? "1rem 2.5rem" : "0.8rem"}
        position='relative'
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "easeInOut" }}
      >
        <Header title='CHANGE PASSWORD' subtitle='Enter Details' />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={changePasswordInitialValues}
          validationSchema={changePasswordSchema}
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
              <Box>
                <Card
                  sx={{
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.alt,
                    marginTop: "20px",
                  }}
                >
                  <CardContent mt='20px'>
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
                      {inputs.map((input, index) => (
                        <TextField
                          component={motion.div}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay: 0.15 * input.id,
                          }}
                          exit={{ y: 20, opacity: 0 }}
                          key={input.id}
                          id={input.name}
                          type={showPassword[index] ? "text" : "password"}
                          autoComplete='off'
                          color='secondary'
                          label={input.label}
                          value={values[input.name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            touched[input.name] ? errors[input.name] : ""
                          }
                          error={
                            touched[input.name] && Boolean(errors[input.name])
                          }
                          margin='dense'
                          variant='outlined'
                          fullWidth
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  aria-label='toggle password visibility'
                                  onClick={() => handleClickShowPassword(index)}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword[index] ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      ))}
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
                      name='change_password'
                      variant='contained'
                      type='submit'
                      sx={{
                        fontWeight: "bold",
                      }}
                      size='large'
                      color='secondary'
                    >
                      Change Password
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

export default ConfirmPassword;
