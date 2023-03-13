import React, { useState } from "react";
import axios from "axios";
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
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setMode } from "state";
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValuesLogin = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const dispatch = useDispatch();
  dispatch(
    setMode({
      mode: "light",
    })
  );
  const navigate = useNavigate();
  const theme = useTheme();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const handleFormSubmit = async (values, onSubmitProps) => {
    setButtonDisabled(true);
    try {
      const admin = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/admin/verify`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(values),
      });
      const verifiedAdmin = await admin.data;
      onSubmitProps.resetForm();
      if (verifiedAdmin) {
        setButtonDisabled(false);
        dispatch(
          setLogin({
            adminId: verifiedAdmin.adminId,
            token: verifiedAdmin.token,
            role: verifiedAdmin.role,
          })
        );
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response.data.msg);
      setButtonDisabled(false);
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
                backgroundColor: "transparent",
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  p="0.5rem"
                >
                  <Typography
                    fontSize="1.5rem"
                    textDecoration="underline"
                    fontWeight="bold"
                    p="1rem"
                    color={theme.palette.secondary.main}
                  >
                    Sign in to Eventomania
                  </Typography>
                  <AdminPanelSettingsOutlinedIcon fontSize="large" />
                </Box>
                <TextField
                  id="email"
                  autoComplete="off"
                  color="secondary"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  autoComplete="off"
                  type="password"
                  color="secondary"
                  id="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
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
                  disabled={buttonDisabled}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                  }}
                  size="large"
                  color="secondary"
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
