import {
  Box,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const EventCardShimmer = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: isNonMobile ? "20rem" : "100%",
      }}
    >
      <Card
        sx={{
          width: "100%",
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Box
          sx={{
            height: 150,
            padding: "0em 1em 0 1em",
          }}
        >
          <Skeleton height='100%' animation='wave' />
        </Box>
        <CardContent>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='flex-start'
            flexDirection='column'
            p='0rem 0.5rem 0rem 0.5rem'
          >
            <Typography p='1rem 0rem 1rem 0rem' variant='h3'>
              <Skeleton width={150} />
            </Typography>
            <Typography variant='subtitle1' width='100%'>
              <Skeleton />
            </Typography>
            <Typography variant='subtitle1' width='100%'>
              <Skeleton />
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          display='flex'
          sx={{
            marginBottom: "0.3rem",
            justifyContent: "center",
          }}
        >
          <Skeleton width={120} height={43} />
        </CardActions>
      </Card>
    </Box>
  );
};

export default EventCardShimmer;
