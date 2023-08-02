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
import * as yup from "yup";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useChangePasswordMutation } from "state/adminApiSlice";
import Header from "components/Header";

const inputs = [
  { id: 1, label: "Current Password", name: "currentPassword" },
  { id: 2, label: "New Password", name: "newPassword" },
  { id: 3, label: "Confirm New Password", name: "cNewPassword" },
];
const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is Required"),
  newPassword: yup
    .string()
    .required("*No password provided.")
    .min(8, "*Password must be 8 characters long")
    .matches(/[0-9]/, "*Password requires a number")
    .matches(/[a-z]/, "*Password requires a lowercase letter")
    .matches(/[A-Z]/, "*Password requires an uppercase letter")
    .matches(/[^\w]/, "*Password requires a symbol")
    .notOneOf(
      [yup.ref("currentPassword"), null],
      "Old Password and New Password Cannot Be Same"
    ),
  cNewPassword: yup
    .string()
    .required("Confirm Password Please")
    .oneOf([yup.ref("newPassword")], "Passwords does not match"),
});

const initialValuesPassword = {
  currentPassword: "",
  newPassword: "",
  cNewPassword: "",
};

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
        toast("Password Changed Successfully", {
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
      toast(error.data.msg, {
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
    <Box>
      <Box
        m='1rem 2.5rem'
        position='relative'
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, ease: "easeInOut" }}
      >
        <Header title='CHANGE PASSWORD' subtitle='Enter Details' />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesPassword}
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
                      variant='contained'
                      type='submit'
                      sx={{
                        color: "black",
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
