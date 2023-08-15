import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const EventInfoBox = ({ icon, title, value, last, index }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <>
      <Grid
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 * index }}
        exit={{ y: 20, opacity: 0 }}
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
      >
        <Box display='flex' gap={2}>
          <Box display='flex' gap={1}>
            {icon}
            <Box>
              <Typography
                color='secondary'
                fontSize={!isNonMobile && "1rem"}
                fontWeight='bold'
              >
                {title}
              </Typography>
              <Typography fontSize={!isNonMobile && "1rem"}>{value}</Typography>
            </Box>
          </Box>
          {!last && isNonMobile && <Divider orientation='vertical' flexItem />}
        </Box>
      </Grid>
    </>
  );
};

export default EventInfoBox;
