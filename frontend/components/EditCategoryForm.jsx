import React, {useState} from 'react'; 
import { useAuth } from "../hooks/AuthProvider"; 
import { useTheme } from '@mui/material/styles';
import { doc, setDoc } from 'firebase/firestore';
import {db} from '../firebase';
import {Box, 
    Typography, 
    TextField, 
    Button, 
    Snackbar,
    Alert } 
    from "@mui/material";


export default function EditCategoryForm({handleModalClose, fetchData, currentRow}) {
    //hooks
    const { currentUser } = useAuth();
    const theme = useTheme();

    //state definition 
    const [form, setForm] = useState({
        categoryName: currentRow.categoryName || "", 
        description: currentRow.description || ""
    })
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    //functions

    const handleSnackbar = (type, message) => {
        setSnackbarMessage(type + ' ' + message);
        setSnackbar(true);
    }

    const handleEditCategory = async () => {
        if (!form.categoryName){
            console.log("Error: Category Name is required");
            handleSnackbar("Error", "Category Name is a required property");
        }

        try {
            const toEdit = currentUser ? doc(db, "users", currentUser.uid, "categories", currentRow.id) : doc(db, "categories", currentRow.id);
            await setDoc(toEdit, {
                categoryName: form.categoryName, 
                description: form.description
            }); 
            setForm({
                categoryName: "",
                description: ""
            })
            handleSnackbar("Success", "Category edited successfully");
            handleModalClose();
            fetchData();
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
                    Edit Category
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
        
                <Button variant="contained" onClick = {handleEditCategory} sx = {{mt:8, width:"10vw"}}>
                    Edit Category
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