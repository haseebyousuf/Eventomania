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
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import Header from "components/Header";
import { toast } from "react-toastify";

import { useCommitteesQuery } from "state/committeeApiSlice";
import { useAddConvenorMutation } from "state/adminApiSlice";
import { convenorSchema } from "utils/validationSchemas";
import { convenorInitialValues } from "utils/initialValues";

const AddConvenor = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  // States
  const [showPassword, setShowPassword] = useState(false);

  // RTK query
  const { data } = useCommitteesQuery();
  const [addConvenor, { isLoading }] = useAddConvenorMutation();

  //handlers
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const { committee } = values;
      const committeeName = committee.split("|")[0];
      const committeeId = committee.split("|")[1];
      const convenor = {
        ...values,
        committeeName,
        committeeId,
        role: "convenor",
      };
      const res = await addConvenor(convenor).unwrap();
      onSubmitProps.resetForm();
      if (res) {
        toast.success("Convenor Added Successfully");
      }
    } catch (error) {
      toast.error(error.data.error || "Server Error");
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
        <Header title='ADD CONVENOR' subtitle='Add New Convenor Details.' />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={convenorInitialValues}
          validationSchema={convenorSchema}
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
                        sx={{ width: "18rem" }}
                        id='name'
                        autoComplete='off'
                        color='secondary'
                        label='Convenor Name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.name ? errors.name : ""}
                        error={touched.name && Boolean(errors.name)}
                        margin='normal'
                        variant='outlined'
                      />
                      <TextField
                        name='email'
                        sx={{ width: "18rem" }}
                        notched='true'
                        color='secondary'
                        id='email'
                        autoComplete='off'
                        label='Convenor Email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.email ? errors.email : ""}
                        error={touched.email && Boolean(errors.email)}
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
                        autoComplete='off'
                        color='secondary'
                        id='password'
                        label='Convenor Password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
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
                      name='add_convenor'
                      variant='contained'
                      disabled={isLoading}
                      type='submit'
                      sx={{
                        fontWeight: "bold",
                      }}
                      size='large'
                      color='secondary'
                    >
                      Add Convenor
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

export default AddConvenor;
