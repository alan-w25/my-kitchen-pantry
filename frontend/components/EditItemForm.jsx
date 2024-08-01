"use client"; 
import { db } from '../firebase'; 
import { collection, setDoc, doc, getDocs } from 'firebase/firestore';
import React, {useState, useEffect} from "react"; 
import AddCategoryModal from './AddCategoryModal';
import {useTheme} from "@mui/material/styles";
import {useAuth} from "../hooks/AuthProvider";
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
    const { currentUser } = useAuth();

    //state definitions
    const [form, setForm] = useState({
        itemName: currentRow.itemName || "",
        description: currentRow.description || "",
        category: currentRow.category || "",
        quantity: currentRow.quantity.toString() || "",
    });
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const showCategory = false;
    const [categories, setCategories] = useState([]);
    const [addModalOpen, setAddModalOpen] = useState(false);


    const handleAddModalOpen = () => setAddModalOpen(true);
    const handleAddModalClose = () => setAddModalOpen(false);

    const fetchCategoryData = async () => {
        try {
            const categoryCollection = currentUser
              ? collection(db, "users", currentUser.uid, "categories")
              : collection(db, "categories");
    
            const querySnapshot = await getDocs(categoryCollection);
            const fetchedCategories = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            // Set the fetched categories to state
            setCategories(fetchedCategories);
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
    }

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
            const selectedCategory = categories.find(cat => cat.id === form.category);
            const categoryName = selectedCategory ? selectedCategory.categoryName : "None";

            const toDoc = currentUser ? doc(db, "users", currentUser.uid, "items", currentRow.id) : doc(db, "items", currentRow.id);
            await setDoc(toDoc, {
                itemName: form.itemName,
                description: form.description, 
                category: categoryName,
                quantity: parseInt(form.quantity, 10),
            });
            handleSnackbar("Success", "Item edited successfully");
            handleModalClose();
            fetchData();
        } catch (error) {
            console.log("Error adding document: ", error);
            handleSnackbar("Error", "Error editing document: " + error.message);
        }

    }
    useEffect( () => {
        fetchCategoryData();
    }, [currentUser, fetchData])


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
               <FormControl sx = {{
                width: "50%",
                mt: 1
               }}>
                <InputLabel>Category</InputLabel>
                <Select
                    value = {form.category}
                    onChange = {(e) => {setForm({...form, category: e.target.value})}}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.categoryName}
                        </MenuItem>
                    ))}
                </Select>
                    
                </FormControl>
                <Button variant="contained" onClick = {handleAddModalOpen} sx = {{ml:2, mt:2}}>Add New Category</Button> 
                <TextField required value = {form.quantity} onChange={ (e) => {setForm({...form, quantity: e.target.value})}} fullWidth label="Quantity" margin="normal" sx = {{
                    height: "10%"
                }}/>

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

            <AddCategoryModal 
                open={addModalOpen}
                handleClose={handleAddModalClose}
                onCategoryAdded = {fetchCategoryData}
            />

        </Box>
    )
}