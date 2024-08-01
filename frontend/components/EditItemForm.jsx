"use client"; 
import { db } from '../firebase'; 
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import React, {useState, useEffect} from "react"; 
import {useTheme} from "@mui/material/styles";
import {Box, 
    Typography, 
    TextField, 
    Button, 
    Link, 
    FormControl, 
    MenuItem, 
    Select, 
    InputLabel, 
    Snackbar,
    Alert } 
    from "@mui/material";





export default function EditItemForm({handleModalClose, fetchData, currentRow}) {
    //hooks
    const theme = useTheme()

    //state definitions
    const [form, setForm] = useState({
        itemName: currentRow.itemName || "",
        description: currentRow.description || "",
        category: currentRow.category || "",
        quantity: currentRow.quantity.toString() || "",
        upcCode: currentRow.upcCode || ""
    });
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const showCategory = false;
    

    //function handlers
    const handleSnackbar = (type, message) => {
        setSnackbarMessage(type + ' ' + message);
        setSnackbar(true);
    }

    const handleEditItem = async() => {
        if (!form.itemName || !form.quantity){
            console.log("Error: Item Name and Quantity are required");
            handleSnackbar("Error", "Item Name and Quantity are required properties");
        }

        try {
            await setDoc(doc(db, "items", currentRow.id), {
                itemName: form.itemName,
                description: form.description, 
                quantity: parseInt(form.quantity, 10),
            });
            handleSnackbar("Success", "Item edited successfully");
            handleModalClose();
            fetchData();
        } catch (error) {
            console.log("Error adding document: ", error);
            handleSnackbar("Error", "Error adding document: " + error.message);
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
                    Edit Item
                </Typography>

                <TextField required value = {form.itemName} onChange={ (e) => {setForm({...form, itemName: e.target.value})}} fullWidth label="Item Name" margin="normal" 
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
               {showCategory && (<FormControl sx = {{
                width: "50%",
                mt: 1
               }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    
                </FormControl> )}
                {showCategory && (
                    <Button variant="contained" sx = {{ml:2, mt:2}}>Add New Category</Button> 
                )}
                <TextField required value = {form.quantity} onChange={ (e) => {setForm({...form, quantity: e.target.value})}} fullWidth label="Quantity" margin="normal" sx = {{
                    height: "10%"
                }}/>
                <TextField value = {form.upcCode} onChange={ (e) => {setForm({...form, upcCode: e.target.value})}} label="UPC Code" margin="normal" sx={{
                    width:"40%",
                    height: "10%"
                }} />
                <Button variant="contained" sx={{ml:2, mt:3}}>
                    Search for UPC Code
                </Button>

                <Button variant="contained" onClick = {handleEditItem} sx = {{mt:8, width:"10vw"}}>
                    Edit Item
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