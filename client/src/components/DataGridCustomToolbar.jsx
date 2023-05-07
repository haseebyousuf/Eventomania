import React from "react";
// import { Search } from "@mui/icons-material";
// import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { Button } from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

const DataGridCustomToolbar = ({ csvOptions, showExport, data }) => {
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%" sx={{ flexWrap: "wrap" }}>
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
                                onClick={() => alert("Print")}
                                variant="text"
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
