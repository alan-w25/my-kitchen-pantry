import React from 'react'
import {useTheme} from '@mui/material/styles';
import {styled} from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListIcon from '@mui/icons-material/List';
import MailIcon from '@mui/icons-material/Mail';
import CropFreeIcon from '@mui/icons-material/CropFree';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import {Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  IconButton,  
  ListItemButton, 
  ListItemIcon,
  Button,
  Link, 
  Typography} from '@mui/material';



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

    const navigationItems = [
      { text: 'Pantry Item List', path: '/items-list' },
      { text: 'Barcode Scanner', path: '/barcode-scanner' }
    ];

    const navItems2 =  [
      { text: 'Category Item List', path: '/categories-list' },
    ]
    const navItems3 = [
      { text: 'Recipe Reccomendation', path: '/recipe-reccomendation' }
    ]
    
    
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
          <Link href="/">
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
          {navigationItems.map((item, index) => (
            
            <ListItem key={item.text} disablePadding>
              <Link href={item.path} sx = {{
                textDecoration: 'none',
                width:"100%"
              }}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <ListIcon /> : <CropFreeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
      </List>
      <Typography sx = {{fontWeight: 600, ml:2}}>Categories</Typography>
      <Divider /> 
      <List sx = {{backgroundColor: theme.palette.background.default}}>
        {navItems2.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <Link href={item.path} sx = {{
              textDecoration:'none', 
              width:"100%"
            }}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <ListIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider /> 
      <List sx = {{backgroundColor: theme.palette.background.default}}>
        {navItems3.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <Link href={item.path} sx ={{
              textDecoration: 'none',
              width:"100%"
            }}>
              <ListItemButton>
                <ListItemIcon>
                  <OutdoorGrillIcon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
