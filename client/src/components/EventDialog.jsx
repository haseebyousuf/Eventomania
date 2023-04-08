import {
  AppBar,
  Box,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EventDialog = ({
  openDialog,
  params,
  handleCloseDialog,
  handleClickOpen,
}) => {
  const theme = useTheme();
  const mode = useSelector((state) => state.mode);
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
            backgroundColor:
              mode === "dark"
                ? theme.palette.background.alt
                : theme.palette.background.alt,
          }}
        >
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h3" component="div">
              Event Details
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            backgroundColor: theme.palette.primary.light,
          }}
        >
          <img
            src={`${process.env.REACT_APP_BASE_URL}/assets/${params.row.bannerName}`}
            alt="banner"
            height={340}
            width={600}
          />
        </Box>
        <List
          sx={{
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary[100],
          }}
        >
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                color: theme.palette.secondary.main,
              }}
              secondaryTypographyProps={{
                fontSize: 14,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              primary="Event Name"
              secondary={params.row.name}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                color: theme.palette.secondary.main,
              }}
              secondaryTypographyProps={{
                fontSize: 14,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              primary="Venue"
              secondary={params.row.venue}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                color: theme.palette.secondary.main,
              }}
              secondaryTypographyProps={{
                fontSize: 14,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              primary="Description"
              secondary={params.row.description}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                color: theme.palette.secondary.main,
              }}
              secondaryTypographyProps={{
                fontSize: 14,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              primary="Starts On"
              secondary={moment(params.row.startDate).format(
                "MMMM Do YYYY, h:mm A"
              )}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                color: theme.palette.secondary.main,
              }}
              secondaryTypographyProps={{
                fontSize: 14,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              primary="Ends On"
              secondary={moment(params.row.endDate).format(
                "MMMM Do YYYY, h:mm A"
              )}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                color: theme.palette.secondary.main,
              }}
              secondaryTypographyProps={{
                fontSize: 14,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              primary="Recomended Audiance"
              secondary={params.row.recomendedAudiance}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                color: theme.palette.secondary.main,
              }}
              secondaryTypographyProps={{
                fontSize: 14,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              primary="Organized By"
              secondary={params.row.committee[0].name}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
                color: theme.palette.secondary.main,
              }}
              secondaryTypographyProps={{
                fontSize: 14,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              primary="Created By"
              secondary={params.row.createdBy[0].name}
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default EventDialog;
