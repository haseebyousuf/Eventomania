import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const Actions = ({ getMembers, snackbarData, setSnackbarData, params }) => {
  const handleDelete = async (id) => {
    const choice = window.confirm(
      "Are you sure you want to delete this Member?"
    );
    if (choice) {
      try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/admin/deleteMember`,
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ memberId: id }),
        });
        const responseData = await response.data;
        if (responseData) {
          getMembers();
          setSnackbarData({
            ...snackbarData,
            open: true,
            message: "Member Deleted Successfully",
            severity: "success",
          });
          setTimeout(() => {
            setSnackbarData({
              ...snackbarData,
              open: false,
            });
          }, 4000);
        }
      } catch (error) {
        setSnackbarData({
          ...snackbarData,
          open: true,
          message: "There was an error deleting the Member",
          severity: "error",
        });
        setTimeout(() => {
          setSnackbarData({
            ...snackbarData,
            open: false,
          });
        }, 4000);
      }
    }
  };
  return (
    <Box>
      <Tooltip title='Delete This Member'>
        <IconButton
          onClick={() => {
            handleDelete(params.id);
          }}
        >
          <Delete color='error' />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Actions;
