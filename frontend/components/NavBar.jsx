import React from 'react'
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListIcon from '@mui/icons-material/List';
import MailIcon from '@mui/icons-material/Mail';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import CropFreeIcon from '@mui/icons-material/CropFree';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import Button from '@mui/material/Button';
import Link from 'next/link';




export default function NavBar({ drawerOpen, toggleDrawer, handleSignIn }) {
    const theme = useTheme();

    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
      backgroundColor: theme.palette.background.default,
    }));
    
    
  return (
    <Drawer sx = {{'& .MuiDrawer-paper': {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },}} variant = "persistent" anchor="left" open = {drawerOpen} onClose={toggleDrawer(false)}>
      <DrawerHeader>
        <IconButton onClick={toggleDrawer(false)}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Box sx={{ px: 2, py: 1 }}>
          <Link href="/" passHref>
            <Button variant="contained" sx = {{color: "#FFFFFF"}} fullWidth>
              Home
            </Button>
          </Link>
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
            <Button variant="contained" onClick = {handleSignIn} sx = {{color: "#FFFFFF"}} fullWidth>
              Sign In / Sign Up
            </Button>
      </Box>
      <Typography sx = {{fontWeight: 600, ml:2}}>Pantry Items</Typography>
      <Divider />
      <List sx = {{backgroundColor: theme.palette.background.default}}>
          {['Pantry Item List', 'Barcode Scanner'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <ListIcon /> : <CropFreeIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Typography sx = {{fontWeight: 600, ml:2}}>Categories</Typography>
      <Divider /> 
      <List sx = {{backgroundColor: theme.palette.background.default}}>
        {['Category Item List'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <ListIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider /> 
      <List sx = {{backgroundColor: theme.palette.background.default}}>
        {['Recipe Reccomendation'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <OutdoorGrillIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
