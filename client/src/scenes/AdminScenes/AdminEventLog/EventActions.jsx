import { Box, IconButton, Tooltip } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import DownloadIcon from "@mui/icons-material/Download";
import { Link, useNavigate } from "react-router-dom";

const EventActions = ({ users, data, params }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Tooltip title='View Audience Details'>
        <IconButton
          onClick={() => {
            navigate(`/Registrations/${params.row._id}`, {
              state: {
                audience: users.filter(
                  (user) => user.event[0].id === params.row._id
                ),
                eventDetails: params.row.name,
              },
            });
          }}
        >
          <GroupsIcon color='success' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Download Report'>
        <IconButton onClick={() => {}}>
          <Link
            to={`${process.env.REACT_APP_BASE_URL}/assets/${params.row.orderName}`}
            target='_blank'
            rel='noreferrer'
          >
            {" "}
            <DownloadIcon color='info' />
          </Link>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default EventActions;
