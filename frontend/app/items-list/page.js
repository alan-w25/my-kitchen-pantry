"use client";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMovieData } from "@mui/x-data-grid-generator";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { Link } from "@mui/material";

const VISIBLE_FIELDS = [
  "title",
  "company",
  "director",
  "year",
  "cinematicUniverse",
];

export default function ItemsPage() {
  const data = useMovieData();
  const theme = useTheme();

  const columns = React.useMemo(
    () =>
      data.columns
        .filter((column) => VISIBLE_FIELDS.includes(column.field))
        .map((column) => ({
          ...column,
          flex: 1,
          resizable: false,
        })),
    [data.columns]
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          minHeight: "50vh",
          maxHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          mt: 2,
          borderRadius: 2,
          boxShadow: 4,
          backgroundColor: theme.palette.background.secondary,
          width: "80vw",
        }}
      >
        <DataGrid
          {...data}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableColumnResize // Disable column resizing
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
      <Link href="/categories-list">
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: "5vh",
            right: "5vw",
          }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  );
}
