import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";

import { useDeleteConvenorMutation } from "state/adminApiSlice";

const Actions = ({ params }) => {
  //rtk query
  const [deleteConvenor] = useDeleteConvenorMutation();
  //handlers
  const handleDelete = async (id, committeeId) => {
    const choice = window.confirm(
      "Are you sure you want to delete this Convenor?"
    );
    if (choice) {
      try {
        const values = {
          convenorId: id,
          committeeId,
        };
        const res = await deleteConvenor(values).unwrap();
        if (res) {
          toast.error("Convenor Deleted Successfully.");
        }
      } catch (error) {
        toast.error("There was an error deleting the Convenor");
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
