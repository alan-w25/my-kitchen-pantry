"use client";
import React, { useState, useEffect } from "react";
import AddCategoryModal from "../../components/AddCategoryModal";
import EditCategoryModal from "../../components/EditCategoryModal";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../hooks/AuthProvider";
import { Box, IconButton, useTheme, Typography, Fab } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const CategoriesPage = () => {
  //state definition
  const [rows, setRows] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  //hook definitions
  const theme = useTheme();
  const { currentUser } = useAuth();

  //functions
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);
  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);

  const handleDeleteCategory = async (id) => {
    try {
      console.log("Deleting item with id: ", id);
      const toDelete = currentUser
        ? doc(db, "users", currentUser.uid, "categories", id)
        : doc(db, "categories", id);
      await deleteDoc(toDelete);
      fetchData();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const fetchData = async () => {
    const categoryCollection = currentUser
      ? collection(db, "users", currentUser.uid, "categories")
      : collection(db, "categories");

    const querySnapshot = await getDocs(categoryCollection);
    const itemsData = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((item) => item.categoryName !== "None");
    setRows(itemsData);
  };

  //data grid data
  const columns = [
    { field: "categoryName", headerName: "Category Name", flex: 1 },
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
        <IconButton onClick={() => handleDeleteCategory(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

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
        Category Items
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
      <AddCategoryModal
        open={addModalOpen}
        handleClose={handleAddModalClose}
        fetchData={fetchData}
      />

      {currentRow && (
        <EditCategoryModal
          open={editModalOpen}
          handleClose={handleEditModalClose}
          fetchData={fetchData}
          currentRow={currentRow}
        />
      )}
    </Box>
  );
};

export default CategoriesPage;
