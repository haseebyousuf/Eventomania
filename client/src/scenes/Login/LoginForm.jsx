import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  useTheme,
  CardActions,
} from "@mui/material";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useLoginMutation } from "state/adminApiSlice";
import { setLogin } from "state";
import AnimateText from "animations/AnimateText";

import { loginSchema } from "utils/validationSchemas";
import { loginInitialValues } from "utils/initialValues";

const LoginForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  //rtk query
  const [login, { isLoading }] = useLoginMutation();

  //handlers
  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const res = await login(values).unwrap();
      dispatch(setLogin({ ...res }));
      toast.success("Welcome to Dashboard");
    } catch (error) {
      toast.error(error?.data?.msg || "Server Error");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={loginInitialValues}
      validationSchema={loginSchema}
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
        <form onSubmit={handleSubmit}>
          <Box>
            <Card
              sx={{
                padding: "0rem 1.8rem",
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
              }}
            >
              <CardContent>
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='flex-start'
                  flexDirection='column'
                  p='0.5rem'
                >
                  {/* <Typography
                    fontSize='1.8rem'
                    textDecoration='underline'
                    fontWeight='bold'
                    p='1rem 0rem 1rem 0rem'
                    color={theme.palette.secondary.main}
                  >
                    EVENTOMANIA
                  </Typography> */}
                  <Typography
                    fontSize='1.8rem'
                    textDecoration='underline'
                    fontWeight='bold'
                    p='1rem 0rem 1rem 0rem'
                    color={theme.palette.secondary.main}
                  >
                    <AnimateText text='Hello Admin 👋' delayValue={0.07} />
                  </Typography>
                  <Typography
                    fontSize='1rem'
                    textDecoration='underline'
                    color={theme.palette.secondary}
                    paddingBottom='0.6rem'
                  >
                    Sign In to access your account
                  </Typography>

                  {/* <AdminPanelSettingsOutlinedIcon fontSize="large" /> */}
                </Box>
                <TextField
                  id='email'
                  autoComplete='off'
                  color='secondary'
                  label='Email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  margin='dense'
                  variant='outlined'
                  fullWidth
                />
                <TextField
                  autoComplete='off'
                  type='password'
                  color='secondary'
                  id='password'
                  label='Password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                  margin='dense'
                  variant='outlined'
                  fullWidth
                />
              </CardContent>
              <CardActions
                display='flex'
                sx={{
                  marginBottom: "1rem",
                  justifyContent: "center",
                }}
              >
                <Button
                  name='login'
                  variant='contained'
                  type='submit'
                  disabled={isLoading}
                  sx={{
                    fontWeight: "bold",
                  }}
                  size='large'
                  color='secondary'
                >
                  Sign In
                </Button>
              </CardActions>
            </Card>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
