"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMovieData } from "@mui/x-data-grid-generator";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { Link, Typography, IconButton } from "@mui/material";
import AddItemModal from "../../components/AddItemModal";
import EditItemModal from "../../components/EditItemModal";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ItemsPage() {
  //state definition
  const [rows, setRows] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  //hook definitions
  const theme = useTheme();

  //data grid data
  const columns = [
    { field: "itemName", headerName: "Item Name", flex: 1 },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </Box>
      ),
    },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            setCurrentRow(params.row);
            handleEditModalOpen();
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  //fetch data functions
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const itemsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(itemsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //button handlers
  const handleDelete = async (id) => {
    try {
      console.log("Deleting item with id: ", id);
      await deleteDoc(doc(db, "items", id));
      fetchData();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);
  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);

  //return model

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          mt: 2,
          width: "80vw",
        }}
        variant="h5"
      >
        Pantry Items
      </Typography>
      <Box
        sx={{
          minHeight: "50vh",
          height: "60vh",
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
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          disableColumnResize // Disable column resizing
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: "5vh",
          right: "5vw",
        }}
        onClick={handleAddModalOpen}
      >
        <AddIcon />
      </Fab>
      <AddItemModal
        open={addModalOpen}
        handleClose={handleAddModalClose}
        fetchData={fetchData}
      />

      {currentRow && (
        <EditItemModal
          open={editModalOpen}
          handleClose={handleEditModalClose}
          fetchData={fetchData}
          item_id={currentRow}
        />
      )}
    </Box>
  );
}
