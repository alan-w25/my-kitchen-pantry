"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery"
import  {useState} from 'react';
import NavBar from './NavBar';
import Link from 'next/link';
import BasicModal from './AuthModal';
import { useAuth } from '../hooks/AuthProvider';


export default function Header() {
    const [drawerOpen, setDrawerOpen] =  useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [signInOpen, setSignInOpen] = useState(false); 
    const { currentUser, logout } = useAuth(); 


    const toggleDrawer = (open) => (event) => {
        if (event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
          ) {
            return;
          }
          setDrawerOpen(open);
      
    }
    const handleOpen = () => setSignInOpen(true);
    const handleClose = () => setSignInOpen(false);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor:theme.palette.primary.main}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick = {toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={isSmallScreen ? "subtitle1" : "h6"} component="div" sx={{ flexGrow: 1 }}>
            {currentUser ? `${currentUser.displayName}'s Kitchen Pantry` : "Kitchen Pantry"}
          </Typography>
          {!currentUser && (<Button sx={{color: "#FFFFFF"}} onClick={handleOpen} >{isSmallScreen ? "Sign In": "Sign In/Sign Up"}</Button>)}
        </Toolbar>
      </AppBar>
      <NavBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} handleSignIn={handleOpen} />
      <BasicModal open={signInOpen} handleClose={handleClose} />
    </Box>
  );
}
  