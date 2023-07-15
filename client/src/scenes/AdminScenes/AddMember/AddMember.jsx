import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Box,
    useTheme,
    Card,
    CardContent,
    TextField,
    Button,
    CardActions,
    InputAdornment,
    IconButton,
    MenuItem,
    Snackbar,
    Alert,
    Slide,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import Header from "components/Header";

const AddMemberSchema = yup.object().shape({
  memberName: yup.string().required("*Name Required"),
  memberPassword: yup
    .string()
    .required("*No password provided.")
    .min(8, "*Password must be 8 characters long")
    .matches(/[0-9]/, "*Password requires a number")
    .matches(/[a-z]/, "*Password requires a lowercase letter")
    .matches(/[A-Z]/, "*Password requires an uppercase letter")
    .matches(/[^\w]/, "*Password requires a symbol"),
  memberEmail: yup
    .string()
    .email("That doesn't look like an email")
    .required("Email is required"),
  committee: yup.string().required("Committee is required!").ensure(),
  mobile: yup
    .string()
    .matches(
      new RegExp(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/),
      "That doesn't look like a valid phone number"
    )
    .required("Mobile is required"),
});

const initialValuesMember = {
  memberName: "",
  memberEmail: "",
  memberPassword: "",
  committee: "",
  mobile: "",
};

const AddMember = () => {
  const theme = useTheme();
  // States
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [data, setData] = useState({ committees: null, isLoading: true });

  //useEffect to get committees
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/committee/get-committees`)
      .then((response) => {
        setData({
          ...data,
          committees: response.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  //submit handler
  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const { committee } = values;
      const committeeName = committee.split("|")[0];
      const committeeId = committee.split("|")[1];
      const Member = {
        ...values,
        committeeName,
        committeeId,
        role: "member",
      };

      const savedMemberResponse = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/admin/AddMember`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(Member),
      });
      const savedMember = await savedMemberResponse.data;
      onSubmitProps.resetForm();
      if (savedMember) {
        setSnackbarData({
          ...snackbarData,
          open: true,
          message: "Member Added Successfully",
          severity: "success",
        });
        setTimeout(() => {
          setSnackbarData({
            ...snackbarData,
            open: false,
          });
        }, 4000);
      }
    } catch (error) {
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: error.response.data.msg,
        severity: "error",
      });
      setTimeout(() => {
        setSnackbarData({
          ...snackbarData,
          open: false,
        });
      }, 4000);
    }
  };

  //transition for snackbar
  const SlideTransition = (props) => {
    return <Slide {...props} direction='down' />;
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
        <Header title='ADD Member' subtitle='Add New Member Details.' />
        <Snackbar
          sx={{ position: "absolute" }}
          open={snackbarData.open}
          autoHideDuration={4000}
          TransitionComponent={SlideTransition}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert variant='filled' severity={snackbarData.severity}>
            {snackbarData.message}
          </Alert>
        </Snackbar>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesMember}
          validationSchema={AddMemberSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
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
                    sx={{
                      display: "flex",
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
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "Wrap",
                      }}
                    >
                      <TextField
                        name='memberName'
                        sx={{ width: "18rem" }}
                        id='memberName'
                        autoComplete='new-name'
                        color='secondary'
                        label='Member Name'
                        value={values.memberName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.memberName ? errors.memberName : ""}
                        error={touched.memberName && Boolean(errors.memberName)}
                        margin='normal'
                        variant='outlined'
                      />
                      <TextField
                        name='memberEmail'
                        sx={{ width: "18rem" }}
                        notched='true'
                        color='secondary'
                        id='memberEmail'
                        autoComplete='new-data'
                        label='Member Email'
                        value={values.memberEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.memberEmail ? errors.memberEmail : ""
                        }
                        error={
                          touched.memberEmail && Boolean(errors.memberEmail)
                        }
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
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "Wrap",
                      }}
                    >
                      <TextField
                        sx={{ width: "18rem" }}
                        notched='true'
                        type={showPassword ? "text" : "password"}
                        autoComplete='new-data'
                        color='secondary'
                        id='olaa'
                        name='memberPassword'
                        label='Member Password'
                        value={values.memberPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.memberPassword ? errors.memberPassword : ""
                        }
                        error={
                          touched.memberPassword &&
                          Boolean(errors.memberPassword)
                        }
                        margin='normal'
                        variant='outlined'
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        margin='normal'
                        color='secondary'
                        name='committee'
                        variant='outlined'
                        sx={{ width: "18rem" }}
                        notched='true'
                        value={values.committee}
                        id='committee'
                        select
                        label='Committee'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.committee && Boolean(errors.committee)}
                      >
                        <MenuItem disabled>Select a Committee</MenuItem>
                        {data.committees &&
                          data.committees.map((committee) => (
                            <MenuItem
                              key={committee._id}
                              value={`${committee.name}|${committee._id}`}
                            >
                              {committee.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Box>
                    <Box
                      component={motion.div}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      exit={{ y: 20, opacity: 0 }}
                      sx={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "Wrap",
                      }}
                    >
                      <TextField
                        sx={{ width: "18rem" }}
                        id='mobile'
                        name='mobile'
                        autoComplete='off'
                        color='secondary'
                        label='Mobile Number'
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.mobile ? errors.mobile : ""}
                        error={touched.mobile && Boolean(errors.mobile)}
                        margin='normal'
                        variant='outlined'
                      />
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
                      Add Member
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

export default AddMember;
