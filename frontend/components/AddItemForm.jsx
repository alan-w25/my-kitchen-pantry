"use client"; 
import { db } from '../firebase'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';
import React, {useState, useEffect} from "react"; 
import {useTheme} from "@mui/material/styles";
import { useAuth } from '../hooks/AuthProvider';
import AddCategoryModal from './AddCategoryModal';
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





export default function AddItemForm({handleModalClose, fetchData}) {
    const theme = useTheme()
    const { currentUser } = useAuth();

    const [form, setForm] = useState({
        itemName: "",
        description: "",
        category: "",
        quantity: "",
    })
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(''); 
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);

    


    //functions 

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


    const handleSnackbar = (type, message) => {
        setSnackbarMessage(type + ' ' + message);
        setSnackbar(true);
    }

    const handleCreateItem = async() => {
        if (!form.itemName || !form.quantity){
            console.log("Error: Item Name and Quantity are required");
            handleSnackbar("Error", "Item Name and Quantity are required properties");
        }

        try {
            console.log(currentUser)
            const newCollection = currentUser ? collection(db, "users", currentUser.uid, "items") : collection(db, "items");
            console.log(newCollection);
            await addDoc(newCollection, {
                itemName: form.itemName,
                description: form.description, 
                quantity: parseInt(form.quantity, 10),
                date_added: new Date()
            })
            setForm({
                itemName: "",
                description: "",
                category: "",
                quantity: "",
            })
            handleSnackbar("Success", "Item added successfully");
            handleModalClose();
            fetchData();
        } catch (error) {
            console.log("Error adding document: ", error);
            handleSnackbar("Error", "Error adding document: " + error.message);
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
                    Add New Item
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
                        value = {category}
                        onChange = {(e) => {setCategory(e.target.value)}}
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

                <Button variant="contained" onClick = {handleCreateItem} sx = {{mt:8, width:"10vw"}}>
                    Add Item
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