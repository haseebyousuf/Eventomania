import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";

import { useDeleteMemberMutation } from "state/adminApiSlice";

const Actions = ({ getMembers, params }) => {
  const [deleteMember] = useDeleteMemberMutation();

  const handleDelete = async (id) => {
    const choice = window.confirm(
      "Are you sure you want to delete this Member?"
    );
    if (choice) {
      try {
        const res = await deleteMember({ memberId: id }).unwrap();
        if (res) {
          toast.error("Member Deleted Successfully.");
        }
      } catch (error) {
        toast.error("There was an error deleting the Member.");
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
