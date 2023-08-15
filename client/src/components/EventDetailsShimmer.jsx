import { Box, Divider, Grid, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";

const EventDetailsShimmer = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box>
      <Grid width='90%' margin='auto' columnSpacing={4} container>
        <Grid sx={{ marginBottom: "1rem" }} item xs={12} sm={12} md={7} lg={8}>
          <Skeleton height='40vh' animation='wave' />
          <Skeleton height='10vh' animation='wave' />

          <Divider
            width={isNonMobile ? "90%" : "100%"}
            sx={{
              borderBottomWidth: 2,
              margin: "15px 0px",
            }}
          />
          <Skeleton height='10vh' animation='wave' />
          <Skeleton height='10vh' animation='wave' />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={4}>
          <Skeleton height='80vh' />
          {!isNonMobile && <Skeleton height='20vh' animation='wave' />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventDetailsShimmer;
