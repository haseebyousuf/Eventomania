import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import { setMode } from "state";
import { setLogout } from "state";
import Profile from "assets/profile.png";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/Login");
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      {user && (
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LEFT SIDE  */}
          {/* <FlexBetween> */}
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          {/* <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween> */}
          {/* </FlexBetween> */}
          {/* RIGHT SIDE */}
          <FlexBetween gap="1rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <Box>
              <FlexBetween textTransform="none" gap="1rem">
                <Box
                  component="img"
                  alt="profile"
                  src={Profile}
                  height="32px"
                  width="32px"
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
                  <IconButton aria-label="logout" onClick={handleLogout}>
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
          </FlexBetween>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Navbar;
