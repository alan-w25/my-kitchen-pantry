import React from 'react'
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function NavBar({ drawerOpen, toggleDrawer }) {
    const theme = useTheme();
    const list = () => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {['Home', 'About', 'Contact', 'Profile'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      );
    
    
  return (
    <Drawer ancho="left" open = {drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
    </Drawer>
  )
}
