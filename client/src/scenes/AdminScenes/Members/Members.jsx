import { Box, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";

import Actions from "./Actions";
import moment from "moment";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useMembersQuery } from "state/adminApiSlice";
import DataGridContainer from "components/DataGridContainer";

const Members = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const { data, isLoading } = useMembersQuery();

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "committeeName",
      headerName: "Committee",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created On",
      minWidth: 100,
      renderCell: (params) => {
        return moment(new Date(params.row.createdAt)).format("Do MMM YYYY");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <Actions data={data} {...{ params }} />,
    },
  ];
  return (
    <Box
      m={isNonMobile ? "1rem 2.5rem" : "0.8rem"}
      position='relative'
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "easeInOut" }}
    >
      <Header title='MEMBERS' subtitle='List of All Members.' />

      <DataGridContainer>
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { showExport: false, data },
          }}
        />
      </DataGridContainer>
    </Box>
  );
};

export default Members;
