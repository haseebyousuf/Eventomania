import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const Actions = ({ getConvenors, params }) => {
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
          toast("Convenor Deleted Successfully.", {
            type: "error",
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        toast("There was an error deleting the Convenor", {
          type: "error",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
