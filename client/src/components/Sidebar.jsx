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
  EventRepeatOutlined,
  EventOutlined,
  VisibilityOutlined,
  ControlPointOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import FlexBetween from "./FlexBetween";
import Profile from "assets/profile.png";
import { useDispatch } from "react-redux";
import { setLogout } from "state";

const adminNavItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Events",
        icon: null,
    },
    {
        text: "Publish Event",
        icon: <EventOutlined />,
    },
    {
        text: "Past Events",
        icon: <EventRepeatOutlined />,
    },
    {
        text: "Committees",
        icon: null,
    },
    {
        text: "View Committees",
        icon: <VisibilityOutlined />,
    },
    {
        text: "Add Committees",
        icon: <ControlPointOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Convenors",
        icon: <VisibilityOutlined />,
    },
    {
        text: "Add Convenors",
        icon: <VisibilityOutlined />,
    },
    {
        text: "Members",
        icon: <ControlPointOutlined />,
    },
];
const convenorNavItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Events",
        icon: null,
    },
    {
        text: "Create Event",
        icon: <EventOutlined />,
    },
    {
        text: "Past Events",
        icon: <EventRepeatOutlined />,
    },
    {
        text: "Committees",
        icon: null,
    },
    {
        text: "Committee Discreption",
        icon: <VisibilityOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Members",
        icon: <VisibilityOutlined />,
    },
    {
        text: "Add Members",
        icon: <ControlPointOutlined />,
    },
];
const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
    user,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.user);

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/Login");
    };
    return (
        <Box component="nav">
            {isSidebarOpen && user && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
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
                    <Box position="relative">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="0.5rem"
                                    onClick={() => navigate("/")}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <Typography variant="h4" fontWeight="bold">
                                        EVENTOMANIA
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton
                                        onClick={() =>
                                            setIsSidebarOpen(!isSidebarOpen)
                                        }
                                    >
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
                                                    m: "2.25rem 0 1rem 3rem",
                                                }}
                                            >
                                                {text}
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
                                                        setIsSidebarOpen(
                                                            !isSidebarOpen
                                                        );
                                                    }
                                                }}
                                                sx={{
                                                    backgroundColor:
                                                        active === lcText
                                                            ? theme.palette
                                                                  .secondary[300]
                                                            : "transparent",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette
                                                                  .primary[600]
                                                            : theme.palette
                                                                  .secondary[100],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        ml: "1rem",
                                                        color:
                                                            active === lcText
                                                                ? theme.palette
                                                                      .primary[600]
                                                                : theme.palette
                                                                      .secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lcText && (
                                                    <ChevronRightOutlined
                                                        sx={{ ml: "auto" }}
                                                    />
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
                                                    m: "2.25rem 0 1rem 3rem",
                                                }}
                                            >
                                                {text}
                                            </Typography>
                                        );
                                    }
                                    const lcText = text.replaceAll(" ", "-");
                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(`/${lcText}`);
                                                    setActive(lcText);
                                                    if (!isNonMobile) {
                                                        setIsSidebarOpen(
                                                            !isSidebarOpen
                                                        );
                                                    }
                                                }}
                                                sx={{
                                                    backgroundColor:
                                                        active === lcText
                                                            ? theme.palette
                                                                  .secondary[300]
                                                            : "transparent",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette
                                                                  .primary[600]
                                                            : theme.palette
                                                                  .secondary[100],
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        ml: "1rem",
                                                        color:
                                                            active === lcText
                                                                ? theme.palette
                                                                      .primary[600]
                                                                : theme.palette
                                                                      .secondary[200],
                                                    }}
                                                >
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lcText && (
                                                    <ChevronRightOutlined
                                                        sx={{ ml: "auto" }}
                                                    />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                        </List>
                    </Box>
                    <Box marginBottom="1rem">
                        <Divider />
                        <FlexBetween
                            textTransform="none"
                            gap="1.1rem"
                            m="1.5rem 2rem 0 1rem"
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={Profile}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.role}
                                </Typography>
                            </Box>
                            <Tooltip
                                TransitionComponent={Zoom}
                                title="logout"
                                arrow
                                sx={{ fontSize: "bold" }}
                            >
                                <IconButton
                                    aria-label="logout"
                                    onClick={handleLogout}
                                >
                                    <LogoutOutlinedIcon
                                        sx={{
                                            color: theme.palette.secondary[300],
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
