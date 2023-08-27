import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({ csvOptions, showExport, data }) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width='100%' sx={{ flexWrap: "wrap" }}>
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          {showExport && (
            <>
              <GridToolbarExport
                csvOptions={csvOptions}
                printOptions={{ disableToolbarButton: true }}
              />
              <Button
                name='print'
                onClick={() => alert("Print")}
                variant='text'
                startIcon={<PrintOutlinedIcon />}
              >
                PDF
              </Button>
            </>
          )}
        </FlexBetween>

        <GridToolbarQuickFilter />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
