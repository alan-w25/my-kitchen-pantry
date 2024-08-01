"use client";
import React from 'react';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import EditCategoryForm from './EditCategoryForm';
import { Box, Modal, IconButton } from '@mui/material';

export default function EditCategoryModal({handleClose, open, fetchData, currentRow }) {
    const theme = useTheme();
    

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "35vw",
            bgcolor: theme.palette.background.secondary,
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'

                }}>
                <IconButton onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <EditCategoryForm handleModalClose={handleClose} fetchData = {fetchData} currentRow = {currentRow}  />
        </Box>
      </Modal>
    </div>
  );
}