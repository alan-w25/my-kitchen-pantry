"use client";
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function AuthForm() {
    
    const theme = useTheme();

    const [value, setValue] = useState(0); 

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleSignUpClick = () =>{
        setValue(1);
    }

    const handleSignInClick = () => {
        setValue(0);
    }

    return (
        <Box sx = {{mt: 4, mx: 4, minWidth: "25vw", width: "30vw", backgroundColor: theme.palette.background.secondary, boxShadow: 1, borderRadius: 4}}>
            <Tabs sx={{display:'flex', justifyContent: 'space-between'}} value={value} onChange = {handleChange} aria-label="sign-in sign-up tabs">
                <Tab label="Sign In" sx = {{flexGrow: 1}}/>
                <Tab label="Sign Up" sx = {{flexGrow: 1}}/>
            </Tabs>


            {value === 0 && (

                <Box sx = {{mt:3, px:2}}>
                    <Typography variant="h6" gutterBottom>
                        Sign In
                    </Typography>

                    <TextField fullWidth label="Email Address" margin="normal" />  
                    <TextField fullWidth label="Password" type="password" margin="normal" />
                    <Link href="#" passHref onClick = {handleSignUpClick}>
                        <Typography sx={{color:"#000000", mt:8}}>
                            Don't have an account? Sign up
                        </Typography>
                        
                    
                    
                    </Link>


                    <Button variant="contained"  sx = {{mt:2, mb: 4, width:"10vw"}}>
                        Sign In
                    </Button>
                </Box>
            )}
            {value === 1 && (
                <Box sx = {{mt:3, px:2}}>
                    <Typography variant="h6" gutterBottom>
                        Sign Up
                    </Typography>

                    <TextField fullWidth label="Email Address" margin="normal" /> 
                    <TextField fullWidth label="Password" type="password" margin="normal" /> 
                    <TextField fullWidth label="Confirm Password" type="password" margin="normal" />

                    <Link href="#" passHref onClick = {handleSignInClick}>
                        <Typography sx={{color:"#000000", mt:8}}>
                            Already have an account? Sign in
                        </Typography>
                    </Link>


                    <Button variant="contained" sx = {{mt:2, mb: 4, width:"10vw"}}>
                        Sign Up
                    </Button>
                </Box>
            )}

        </Box>

    )

}