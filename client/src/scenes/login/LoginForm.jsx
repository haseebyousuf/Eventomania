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
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { toast } from "react-toastify";
import { useLoginMutation } from "state/adminApiSlice";
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("No password provided."),
});
const initialValuesLogin = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const [login, { isLoading }] = useLoginMutation();
  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const res = await login(values).unwrap();
      dispatch(setLogin({ ...res }));
      toast("Welcome to Dashboard", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "colored",
      });
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
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
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
                  <Typography
                    fontSize='1.8rem'
                    textDecoration='underline'
                    fontWeight='bold'
                    p='1rem 0rem 1rem 0rem'
                    color={theme.palette.secondary.main}
                  >
                    EVENTOMANIA
                  </Typography>
                  <Typography
                    fontSize='1.5rem'
                    textDecoration='underline'
                    fontWeight='bold'
                    color={theme.palette.secondary}
                  >
                    Hello Admin 👋
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
                  variant='contained'
                  type='submit'
                  disabled={isLoading}
                  sx={{
                    color: "black",
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
