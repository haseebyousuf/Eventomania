import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const Actions = ({ getCommittees, snackbarData, setSnackbarData, params }) => {
  const handleDelete = async (id) => {
    const choice = window.confirm(
      "Are you sure you want to delete this committee?"
    );
    if (choice) {
      try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/committee/deleteCommittee`,
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ committeeId: id }),
        });
        const responseData = await response.data;
        if (responseData) {
          getCommittees();
          setSnackbarData({
            ...snackbarData,
            open: true,
            message: "Committee Deleted Successfully",
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
          message: "There was an error deleting the Committee",
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
      <Tooltip title='Delete This Committee'>
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
