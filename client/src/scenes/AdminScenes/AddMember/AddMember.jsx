import React, { useState } from "react";
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
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Header from "components/Header";
import { useCommitteesQuery } from "state/committeeApiSlice";
import { useAddMemberMutation } from "state/adminApiSlice";

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
  const [showPassword, setShowPassword] = useState(false);

  //RTK Query
  const { data } = useCommitteesQuery();
  const [addMember, { isLoading }] = useAddMemberMutation();

  // handlers
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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

      const res = await addMember(Member).unwrap();
      onSubmitProps.resetForm();
      if (res) {
        toast("Member Added Successfully", {
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
        <Header title='ADD Member' subtitle='Add New Member Details.' />
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
                        {data &&
                          data.map((committee) => (
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
                      disabled={isLoading}
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
