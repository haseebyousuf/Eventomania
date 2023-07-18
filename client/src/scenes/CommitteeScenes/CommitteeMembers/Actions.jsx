import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const Actions = ({ getMembers, params }) => {
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
          toast("Member Deleted Successfully.", {
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
        toast("There was an error deleting the Member.", {
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
