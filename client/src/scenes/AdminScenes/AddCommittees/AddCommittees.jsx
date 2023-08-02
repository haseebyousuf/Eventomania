import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import Form from "./Form";
import Header from "components/Header";

const AddCommittees = () => {
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
        <Header title='ADD COMMITTEE' subtitle='Add New Committee Details.' />

        <Form />
      </Box>
    </Box>
  );
};

export default AddCommittees;
