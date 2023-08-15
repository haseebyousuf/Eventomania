import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import FlexBetween from "./FlexBetween";
import Profile from "assets/profile.png";
import { setLogout } from "state";
import {
  adminNavItems,
  memberNavItems,
  convenorNavItems,
} from "utils/constants";
import { useLogoutMutation } from "state/adminApiSlice";
import AnimateText from "animations/AnimateText";

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  user,
}) => {
  //states
  const [active, setActive] = useState("");

  //hooks
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  //effects
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  //handlers
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      toast.error("You have been logged out!");
      navigate("/Login");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Server Error");
    }
  };

  return (
    <Box component='nav'>
      {isSidebarOpen && user && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box position='relative'>
            <Box m='1.5rem 2rem 2rem 3rem'>
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display='flex'
                  alignItems='center'
                  gap='0.5rem'
                  onClick={() => navigate("/")}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography variant='h4' fontWeight='bold'>
                    <AnimateText text='EVENTOMANIA' delayValue={0.1} />
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {user.role === "admin" &&
                adminNavItems.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography
                        key={text}
                        sx={{
                          color: theme.palette.secondary.main,
                          m: "2.25rem 0 1rem 3rem",
                        }}
                        fontWeight='bold'
                      >
                        {text.toUpperCase()}
                      </Typography>
                    );
                  }
                  const lcText = text.replaceAll(" ", "");
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        exit={{ y: 20, opacity: 0 }}
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                          if (!isNonMobile) {
                            setIsSidebarOpen(!isSidebarOpen);
                          }
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary.main
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary.light
                              : theme.palette.secondary.main,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "1rem",
                            color:
                              active === lcText
                                ? theme.palette.primary.light
                                : theme.palette.secondary.main,
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              {user.role === "convenor" &&
                convenorNavItems.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography
                        key={text}
                        sx={{
                          color: theme.palette.secondary.main,
                          m: "2.25rem 0 1rem 3rem",
                        }}
                        fontWeight='bold'
                      >
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.replaceAll(" ", "");
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                          if (!isNonMobile) {
                            setIsSidebarOpen(!isSidebarOpen);
                          }
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary.main
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary.light
                              : theme.palette.secondary.main,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "1rem",
                            color:
                              active === lcText
                                ? theme.palette.primary.light
                                : theme.palette.secondary.main,
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              {user.role === "member" &&
                memberNavItems.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography
                        key={text}
                        sx={{
                          color: theme.palette.secondary.main,
                          m: "2.25rem 0 1rem 3rem",
                        }}
                        fontWeight='bold'
                      >
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.replaceAll(" ", "");
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                          if (!isNonMobile) {
                            setIsSidebarOpen(!isSidebarOpen);
                          }
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary.main
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary.light
                              : theme.palette.secondary.main,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "1rem",
                            color:
                              active === lcText
                                ? theme.palette.primary.light
                                : theme.palette.secondary.main,
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </Box>
          <Box marginBottom='1rem'>
            <Divider />
            <FlexBetween
              textTransform='none'
              gap='0.5rem'
              m='1.5rem 0.5rem 0 0.5rem'
            >
              <Box
                component='img'
                alt='profile'
                src={Profile}
                height='40px'
                width='40px'
                borderRadius='50%'
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign='left'>
                <Typography
                  fontWeight='bold'
                  fontSize='0.8rem'
                  sx={{ color: theme.palette.secondary.main }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize='0.8rem'
                  sx={{ color: theme.palette.secondary.dark }}
                >
                  {user.role}
                </Typography>
              </Box>
              <Tooltip
                TransitionComponent={Zoom}
                title='logout'
                arrow
                sx={{ fontSize: "bold" }}
              >
                <IconButton aria-label='logout' onClick={handleLogout}>
                  <LogoutOutlined
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: "25px ",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
