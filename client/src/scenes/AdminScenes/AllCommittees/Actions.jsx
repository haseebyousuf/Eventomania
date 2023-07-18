import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const Actions = ({ getCommittees, params }) => {
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
          toast("Committee Deleted Successfully", {
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
        toast("There was some error! Please Try again.", {
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
