import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

import Form from "./Form";
import Header from "components/Header";

const AddCommittees = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

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
        <Header title='ADD COMMITTEE' subtitle='Add New Committee Details.' />

        <Form />
      </Box>
    </Box>
  );
};

export default AddCommittees;
