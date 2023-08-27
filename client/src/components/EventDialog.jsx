import React from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

import EventHeader from "./EventDetails/EventHeader";
import EventDescription from "./EventDetails/EventDescription";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const EventDialog = ({
  openDialog,
  params,
  handleCloseDialog,
  handleClickOpen,
  showOrder,
}) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <div>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        sx={{
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.secondary[100],
        }}
      >
        <AppBar
          sx={{
            position: "sticky",
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <Toolbar>
            <Typography
              sx={{ ml: 2, flex: 1, fontWeight: "bold" }}
              color='secondary'
              variant='h3'
              component='div'
            >
              Event Details
            </Typography>
            <IconButton
              edge='end'
              color='inherit'
              onClick={handleCloseDialog}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          padding='1rem'
          width='100%'
          sx={{
            backgroundColor: theme.palette.background.default,
            margin: "auto",
            display: "block",
            overflow: "auto",
            minHeight: "100vh",
          }}
        >
          {params && (
            <Grid
              width='100%'
              margin='auto'
              container
              spacing={isNonMobile && 2}
            >
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <EventHeader
                  name={params.row.name}
                  banner={params.row.bannerName}
                  startDate={params.row.startDate}
                  endDate={params.row.endDate}
                  venue={params.row.venue}
                  organizedBy={params.row.committee[0].name}
                  createdBy={params.row.createdBy[0].name}
                  dialog={true}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} spacing={2}>
                <EventDescription description={params.row.description} />
                {showOrder && (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`${process.env.REACT_APP_BASE_URL}assets/${params.row.orderName}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Button
                      name='order_btn'
                      variant='contained'
                      sx={{
                        marginTop: "1.5rem",
                        fontWeight: "bold",
                      }}
                      size='large'
                      color='secondary'
                    >
                      View Order
                    </Button>
                  </Link>
                )}
              </Grid>
            </Grid>
          )}
        </Box>
      </Dialog>
    </div>
  );
};

export default EventDialog;
