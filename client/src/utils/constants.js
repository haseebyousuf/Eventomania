import {
  AssessmentOutlined,
  EventOutlined,
  EventRepeatOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PasswordIcon from "@mui/icons-material/Password";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export const adminNavItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Events",
    icon: null,
  },
  {
    text: "Approve Events",
    icon: <EventOutlined />,
  },
  {
    text: "Upcoming Events",
    icon: <EventAvailableIcon />,
  },
  {
    text: "Past Events",
    icon: <EventRepeatOutlined />,
  },
  {
    text: "Event Log",
    icon: <AssessmentOutlined />,
  },
  {
    text: "Committees",
    icon: null,
  },
  {
    text: "View Committees",
    icon: <Diversity2Icon />,
  },
  {
    text: "Add Committees",
    icon: <GroupAddIcon />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Convenors",
    icon: <SupervisorAccountIcon />,
  },
  {
    text: "Add Convenors",
    icon: <ManageAccountsIcon />,
  },
  {
    text: "Members",
    icon: <SupervisorAccountIcon />,
  },
  {
    text: "Add Member",
    icon: <PersonAddAlt1Icon />,
  },
  {
    text: "Account",
    icon: null,
  },
  {
    text: "Change Password",
    icon: <PasswordIcon />,
  },
];

export const convenorNavItems = [
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
    text: "Unapproved",
    icon: <EventBusyIcon />,
  },
  {
    text: "Upcoming Events",
    icon: <EventAvailableIcon />,
  },
  {
    text: "Past Events",
    icon: <EventRepeatOutlined />,
  },
  {
    text: "Event Log",
    icon: <AssessmentOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Members",
    icon: <SupervisorAccountIcon />,
  },
  {
    text: "Add Member",
    icon: <PersonAddAlt1Icon />,
  },
  {
    text: "Account",
    icon: null,
  },
  {
    text: "Change Password",
    icon: <PasswordIcon />,
  },
];

export const memberNavItems = [
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
    text: "Unapproved",
    icon: <EventBusyIcon />,
  },
  {
    text: "Upcoming Events",
    icon: <EventAvailableIcon />,
  },
  {
    text: "Past Events",
    icon: <EventRepeatOutlined />,
  },
  {
    text: "Event Log",
    icon: <AssessmentOutlined />,
  },

  {
    text: "Management",
    icon: null,
  },
  {
    text: "Members",
    icon: <SupervisorAccountIcon />,
  },
  {
    text: "Account",
    icon: null,
  },
  {
    text: "Change Password",
    icon: <PasswordIcon />,
  },
];
