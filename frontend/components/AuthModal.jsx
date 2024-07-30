"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthForm from './AuthForm';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function BasicModal({handleClose, open }) {
    const theme = useTheme();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
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
            <AuthForm />
        </Box>
      </Modal>
    </div>
  );
}

