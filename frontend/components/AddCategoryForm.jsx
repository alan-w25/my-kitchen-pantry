import React, {useState} from 'react'; 
import { useAuth } from "../hooks/AuthProvider"; 
import { useTheme } from '@mui/material/styles';
import { doc, addDoc, collection } from 'firebase/firestore';
import {db} from '../firebase';
import {Box, 
    Typography, 
    TextField, 
    Button, 
    Snackbar,
    Alert } 
    from "@mui/material";


export default function AddCategoryForm({handleModalClose, fetchData, onCategoryAdded}) {
    //hooks
    const { currentUser } = useAuth();
    const theme = useTheme();

    //state definition 
    const [form, setForm] = useState({
        categoryName:"", 
        description:""
    })
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    //functions

    const handleSnackbar = (type, message) => {
        setSnackbarMessage(type + ' ' + message);
        setSnackbar(true);
    }

    const handleSubmitCategory = async () => {
        if (!form.categoryName){
            console.log("Error: Category Name is required");
            handleSnackbar("Error", "Category Name is a required property");
        }

        try {
            const toAddCollection = currentUser ? collection(db, "users", currentUser.uid, "categories") : collection(db, "categories"); 
            await addDoc(toAddCollection, {
                categoryName: form.categoryName, 
                description: form.description
            }); 
            setForm({
                categoryName: "",
                description: ""
            })
            handleSnackbar("Success", "Category added successfully");
            handleModalClose();
            if (fetchData){
                fetchData();
            }
            if (onCategoryAdded){
                onCategoryAdded();
            }
        } catch (error){
            console.log("Error: ", error);
            handleSnackbar("Error", "Category could not be added");
        }
    }


    return (
        <Box sx = {{
            width:"100%", 
            height:"100%", 
            backgroundColor: theme.palette.background.secondary,
        }}>
            <Box sx = {{mt:3, px:2}}>
                <Typography variant="h6" gutterBottom>
                    Add New Category
                </Typography>

                <TextField required value = {form.categoryName} onChange={ (e) => {setForm({...form, categoryName: e.target.value})}} fullWidth label="Category Name" margin="normal" 
                    sx = {{
                        height: "10%"
                }}/>
                <TextField 
                    fullWidth
                    multiline
                    value = {form.description} 
                    onChange={ (e) => {setForm({...form, description: e.target.value})}}
                    label="Description"
                    margin="normal"
                    sx = {{
                        height: "10%"
                    }}
                />                  
        
                <Button variant="contained" onClick = {handleSubmitCategory} sx = {{mt:8, width:"10vw"}}>
                    Add Category
                </Button>
            </Box>

            <Snackbar open={snackbar} autoHideDuration={6000} onClose={() => {setSnackbar(false)}}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={() => {setSnackbar(false)}} severity={snackbarMessage.startsWith('Error') ? "error" : "success"} sx={{width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
)
}