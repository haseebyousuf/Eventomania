import React, { useEffect, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  ChevronRight,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setMode } from "state";
import FlexBetween from "components/FlexBetween";
import AnimateText from "animations/AnimateText";

const navItems = [
  {
    text: "HOME",
    link: "/",
  },
  {
    text: "ABOUT",
    link: "/About",
  },
];

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isAuth = Boolean(useSelector((state) => state.global.user));

  //states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [active, setActive] = useState("");

  //useEffect
  useEffect(() => {
    setActive(pathname);
    if (isNonMobile) {
      setIsSidebarOpen(false);
    }
  }, [isNonMobile, pathname]);

  return (
    <AppBar
      sx={{
        position: "sticky",
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        boxShadow: "0 2px 0px rgba(0 0 0 / 0.1)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          margin: isNonMobile ? "auto 5rem auto 5rem" : "auto 2rem auto 2rem",
          paddingLeft: "0rem !important",
          paddingRight: "0rem !important",
        }}
      >
        {/* LEFT SIDE  */}
        <FlexBetween>
          <Box
            color={theme.palette.secondary.main}
            display='flex'
            alignItems='center'
            gap='0.5rem'
          >
            <Typography
              color={theme.palette.secondary.main}
              sx={{
                fontSize: "1.8rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              variant='h1'
              onClick={() => navigate("/")}
            >
              <AnimateText text='EVENTOMANIA' delayValue={0.1} />
            </Typography>
          </Box>
        </FlexBetween>
        {/* RIGHT SIDE */}
        {isNonMobile ? (
          <FlexBetween gap='1.5rem'>
            <FlexBetween>
              {navItems.map(({ text, link }) => {
                const isActive = active === link;
                return (
                  <Box key={text}>
                    <Button
                      name={text}
                      onClick={() => {
                        navigate(link);
                        setActive(link);
                      }}
                      sx={{
                        mx: "0.5rem",
                        minWidth: "5rem",
                        borderBottom: isActive
                          ? `2px solid ${theme.palette.secondary.main}`
                          : "2px solid transparent",
                        color: isActive
                          ? theme.palette.secondary.main
                          : theme.palette.secondary.main,
                      }}
                    >
                      <Typography fontWeight={500}>{text}</Typography>
                    </Button>
                  </Box>
                );
              })}
            </FlexBetween>
            {isAuth ? (
              <Button
                name='dashboard'
                sx={{
                  margin: "1rem",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/Dashboard")}
                variant='contained'
                color='secondary'
              >
                Dashboard
              </Button>
            ) : (
              <Button
                name='sign_in'
                sx={{
                  margin: "1rem",
                  fontWeight: "bold",
                }}
                variant='contained'
                onClick={() => navigate("/Login")}
                color='secondary'
              >
                Sign IN
              </Button>
            )}

            <IconButton
              name={theme.palette.mode}
              aria-label={`${theme.palette.mode}_mode`}
              onClick={() => dispatch(setMode())}
            >
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
        variant='persistent'
        anchor='right'
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
          <Box m='1.5rem 4rem 2rem 1rem'>
            <FlexBetween color={theme.palette.secondary.main}>
              {!isNonMobile && (
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <ChevronRight />
                </IconButton>
              )}
              <Box display='flex' alignItems='center' gap='0.5rem'>
                <Typography variant='h4' fontWeight='bold'>
                  EVENTOMANIA
                </Typography>
              </Box>
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text, link }) => {
              const isActive = active === link;
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(link);
                      setActive(link);
                      setIsSidebarOpen(!isSidebarOpen);
                    }}
                    sx={{
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {isActive && <ChevronRight />}
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        {isAuth ? (
          <Button
            name='dashboard'
            sx={{
              margin: "1rem",
              fontWeight: "bold",
            }}
            variant='contained'
            onClick={() => navigate("/Dashboard")}
            color='secondary'
          >
            Dashboard
          </Button>
        ) : (
          <Button
            name='sign_in'
            sx={{
              margin: "1rem",
              fontWeight: "bold",
            }}
            variant='contained'
            onClick={() => {
              navigate("/Login");
              setIsSidebarOpen(!isSidebarOpen);
            }}
            color='secondary'
          >
            Sign IN
          </Button>
        )}
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

export default HomeNavbar;
