import React, { useEffect, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  AccountCircleOutlined,
  ChevronRight,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import {
  AppBar,
  Box,
  IconButton,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
  List,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import profileImage from "assets/"
const navItems = [
  {
    text: "HOME",
    link: "/",
  },
  {
    text: "COMMITTEES",
    link: "/committees",
  },
  {
    text: "ABOUT",
    link: "/about",
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = useSelector((state) => state.mode);

  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isNonMobile) {
      setIsSidebarOpen(false);
    }
  }, [isNonMobile]);

  return (
    <AppBar
      sx={{
        position: "static",
        backgroundColor:
          mode === "dark" ? "transparent" : theme.palette.background.alt,
        boxShadow: "0 2px 0px rgba(0 0 0 / 0.1)",
        // borderBottom: "2px",
        // BorderBottomColor: "red",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          margin: isNonMobile ? "auto 5rem auto 5rem" : "auto 2rem auto 2rem",
          // padding: "auto 0rem auto 0rem",
          paddingLeft: "0rem !important",
          paddingRight: "0rem !important",
        }}
      >
        {/* LEFT SIDE  */}
        <FlexBetween>
          <Box
            color={theme.palette.secondary.main}
            display="flex"
            alignItems="center"
            gap="0.5rem"
          >
            <Typography
              sx={{ fontSize: "1.5rem" }}
              varient="h1"
              fontWeight="bold"
            >
              EVENTOMANIA
            </Typography>
          </Box>
        </FlexBetween>
        {/* RIGHT SIDE */}
        {isNonMobile ? (
          <FlexBetween gap="1.5rem">
            <Tabs
              value={value}
              onChange={(e, value) => setValue(value)}
              indicatorColor="secondary"
              textColor="secondary"
            >
              {navItems.map(({ text, link }) => {
                return <Tab label={text} key={text} />;
              })}
            </Tabs>
            <Button
              variant="contained"
              sx={{
                borderRadius: "100px",
                color: "black",
                fontWeight: "600",
              }}
              onClick={() => navigate("/admin")}
              color="secondary"
            >
              <AccountCircleOutlined />
            </Button>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
          </FlexBetween>
        ) : (
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="right"
        sx={{
          width: "250px",
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSizing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: "250px",
          },
        }}
      >
        <Box>
          <Box m="1.5rem 4rem 2rem 1rem">
            <FlexBetween color={theme.palette.secondary.main}>
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronRight />
                </IconButton>
              )}
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography varient="h4" fontWeight="bold">
                  EVENTOMANIA
                </Typography>
              </Box>
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text }) => {
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      // navigate(`/${lcText}`);
                      // setActive(lcText);
                      if (!isNonMobile) {
                        setIsSidebarOpen(!isSidebarOpen);
                      }
                    }}
                    // sx={{
                    //   backgroundColor:
                    //     active === lcText
                    //       ? theme.palette.secondary[300]
                    //       : "transparent",
                    //   color:
                    //     active === lcText
                    //       ? theme.palette.primary[600]
                    //       : theme.palette.secondary[100],
                    // }}
                  >
                    <ListItemText primary={text} />
                    {/* {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )} */}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Button
          variant="contained"
          sx={{
            // borderRadius: "100px",
            margin: "1rem",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/admin")}
          color="secondary"
        >
          Sign IN
        </Button>
        <IconButton
          sx={{ position: "fixed", bottom: 5 }}
          onClick={() => dispatch(setMode())}
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined sx={{ fontSize: "25px" }} />
          ) : (
            <LightModeOutlined sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
