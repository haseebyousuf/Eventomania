import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const Actions = ({ getConvenors, snackbarData, setSnackbarData, params }) => {
  const handleDelete = async (id, committeeId) => {
    const choice = window.confirm(
      "Are you sure you want to delete this Convenor?"
    );
    if (choice) {
      try {
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/admin/deleteConvenor`,
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ convenorId: id, committeeId }),
        });
        const responseData = await response.data;
        if (responseData) {
          getConvenors();
          setSnackbarData({
            ...snackbarData,
            open: true,
            message: "Convenor Deleted Successfully",
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
          message: "There was an error deleting the Convenor",
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
      <Tooltip title='Delete This Convenor'>
        <IconButton
          onClick={() => {
            handleDelete(params.id, params.row.committeeId);
          }}
        >
          <Delete color='error' />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Actions;
