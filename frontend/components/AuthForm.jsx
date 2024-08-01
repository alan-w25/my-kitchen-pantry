"use client";
import React, {useState} from 'react';
import {useAuth} from "../hooks/AuthProvider";
import {Link, Box, Tabs, Tab, Typography, TextField, Button, Alert, useTheme, Snackbar, IconButton} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function AuthForm({handleModalClose}) {

    const { signUp, login, forgotPassword } = useAuth();

    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [signUpForm, setSignUpForm] = useState({
        name:"",
        email:"", 
        password:"", 
        password2:""
    })

    const [resetEmail, setResetEmail] = useState("");

    const handleSnackbar = (type, message) => {
        setSnackbarMessage(type + ' ' + message);
        setSnackbar(true);
    }

    const [signInForm, setSignInForm] = useState({
        email:"",
        password:""
    })
    
    const theme = useTheme();

    const [value, setValue] = useState(0); 

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const handleAuthError = (error) => {
        let message; 
        switch (error.code){
            case 'auth/invalid-credential': 
                message="Invalid email address or password";
                break;
            case 'auth/user-disabled':
                message="User account disabled";
                break;
            case 'auth/user-not-found':
                message="User not found";
                break;
            case 'auth/wrong-password':
                message="Incorrect password";
                break;
            case 'auth/email-already-in-use':
                message = 'The email address is already in use by another account.';
                break;
            case 'auth/weak-password':
                message = 'The password is too weak.';
                break;
            default:
                message = 'An unknown error occurred.';
                break;
        }
        return message;
    }
    const handleForgotPassword = async () => {
        try{
            await forgotPassword(resetEmail);
            setResetEmail(""); 
            handleSnackbar("Success", "Password reset email sent!");
            setValue(0);
        } catch (error){
            console.log(error.message);
            handleSnackbar("Error", handleAuthError(error));
        }
    }

            

    const handleSignUp = async () => {
        if (!signUpForm.name || !signUpForm.email || !signUpForm.password || !signUpForm.password2){
            console.log("Please fill out all fields");
            handleSnackbar("Error", "Please fill out all fields");
            return;
        }

        if (signUpForm.password !== signUpForm.password2){
            console.log("Passwords do not match");
            handleSnackbar("Error", "Passwords do not match");
            return 
        }

        try{
            const result = await signUp(signUpForm.name, signUpForm.email,signUpForm.password);
            console.log(result);
            setSignUpForm({name: "", email: "", password: "", password2: ""});
            setValue(0);
            handleSnackbar("Success", "Sign up successful! Please sign in.");
            return;

        } catch (error){
            console.log(error.message);
            handleSnackbar("Error", handleAuthError(error));
        }

    }

    const handleSignIn = async () => {
        if (!signInForm.email || !signInForm.password){
            console.log("Please fill out all fields");
            handleSnackbar("Error", "Please fill out all fields");
            return;
        }

        try{
            await login(signInForm.email, signInForm.password);
            setSignInForm({email: "", password: ""});
            handleSnackbar("Success", "Sign in successful!");
            handleModalClose();
            return;
        
        } catch (error) {
            console.log("error:", error.message);
            console.log(error.code);
            handleSnackbar("Error", handleAuthError(error));
            return;
        }
    }

    return (
        <Box sx = {{
            width: "100%", 
            height:"100%",
            backgroundColor: theme.palette.background.secondary}}>

            {
                (value === 0 || value === 1) && (
                    <Tabs sx={{display:'flex', justifyContent: 'space-between'}} value={value} onChange = {handleChange} aria-label="sign-in sign-up tabs">
                        <Tab label="Sign In" sx = {{flexGrow: 1}}/>
                        <Tab label="Sign Up" sx = {{flexGrow: 1}}/>
                    </Tabs>
                )
            }

            {value === 0 && (

                <Box sx = {{mt:3, px:2}}>
                    <Typography variant="h6" gutterBottom>
                        Sign In
                    </Typography>
                    <TextField value={signInForm.email} onChange={(e) => {setSignInForm({...signInForm, email:e.target.value})}} fullWidth required label="Email Address" margin="normal" />  
                    <TextField value={signInForm.password} onChange={(e) => {setSignInForm({...signInForm, password:e.target.value})}} fullWidth required label="Password" type="password" margin="normal" />
                    
                    <Link href="#" onClick={() => {setValue(2);}} >
                        <Typography sx={{color:"#000000", mt:8}}>
                            Forgot Password?
                        </Typography>
                    </Link>
                    <Link href="#" onClick = {() => {
                        setValue(1);
                        setSignInForm({name: "", email: "", password: "", password2: ""});
                    }}>
                        <Typography sx={{color:"#000000"}}>
                            Don't have an account? Sign up
                        </Typography>
                    </Link>


                    <Button variant="contained" onClick={handleSignIn} sx = {{mt:2, mb: 4, width:"10vw"}}>
                        Sign In
                    </Button>
                </Box>
            )}
            {value === 1 && (
                <Box sx = {{mt:3, px:2}}>
                    <Typography variant="h6" gutterBottom>
                        Sign Up
                    </Typography>
                    <TextField required value={signUpForm.name} onChange = {(e) => {setSignUpForm({...signUpForm, name: e.target.value})}} fullWidth label="Name" margin="normal" />
                    <TextField required value={signUpForm.email} onChange={(e) => {setSignUpForm({...signUpForm, email: e.target.value})}} fullWidth label="Email Address" margin="normal" /> 
                    <TextField required value={signUpForm.password} onChange={(e) => {setSignUpForm({...signUpForm, password: e.target.value})}} fullWidth label="Password" type="password" margin="normal" /> 
                    <TextField required value={signUpForm.password2} onChange={(e) => {setSignUpForm({...signUpForm, password2: e.target.value})}} fullWidth label="Confirm Password" type="password" margin="normal" />
                    
                    
                    <Link href="#" onClick = {() => {
                        setValue(0);
                        setSignInForm({email: "", password: ""});
                    }}>
                        <Typography sx={{color:"#000000", mt:8}}>
                            Already have an account? Sign in
                        </Typography>
                    </Link>


                    <Button onClick={handleSignUp} variant="contained" sx = {{mt:2, mb: 4, width:"10vw"}}>
                        Sign Up
                    </Button>
                </Box>
            )}

            {value===2 && (
                <Box sx = {{mt:3, px:2}}>
                    <Box sx = {{display:"flex"}}>
                        <Typography variant="h6" gutterBottom>
                            Reset Password
                        </Typography>
                        <IconButton onClick = {() => {setValue(0);}} sx = {{
                            ml: 2, 
                            mt: 0
                        }}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Box>
                    <TextField required value={resetEmail} onChange = {(e) => {setResetEmail(e.target.value)}} fullWidth label="Email Address" margin="normal" />
                    <Button onClick={handleForgotPassword} variant="contained" sx = {{mt:2, mb: 4, width:"15vw"}}>
                        Reset Password
                    </Button>
                </Box>

            )


            }
            <Snackbar open={snackbar} autoHideDuration={6000} onClose={() => {setSnackbar(false)}}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => {setSnackbar(false)}} severity={snackbarMessage.startsWith('Error') ? "error" : "success"} sx={{width: '100%' }}>
                {snackbarMessage}
            </Alert>
            </Snackbar>


        </Box>

    )

}