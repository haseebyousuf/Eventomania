import {
  Box,
  Card,
  Divider,
  Grid,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

const EventDetailsShimmer = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box>
      <Grid width='90%' margin='auto' container mt={2}>
        <Grid
          sx={{ marginBottom: "1rem" }}
          item
          xs={12}
          sm={12}
          md={7}
          lg={8}
          rowSpacing={2}
        >
          <Box marginTop={5}>
            <Skeleton variant='rounded' height={400} animation='wave' />
          </Box>
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
        <Grid sx={{}} item xs={12} sm={12} md={5} lg={4}>
          <Box
            marginLeft='2rem'
            position={isNonMobile && "sticky"}
            top={isNonMobile && "5rem"}
          >
            <Card>
              <Skeleton variant='rounded' sx={{ padding: 0 }} height={550} />
            </Card>
          </Box>
          {!isNonMobile && <Skeleton height='20vh' animation='wave' />}
        </Grid>
      </Grid>
      <FlexBetween></FlexBetween>
    </Box>
  );
};

export default EventDetailsShimmer;
