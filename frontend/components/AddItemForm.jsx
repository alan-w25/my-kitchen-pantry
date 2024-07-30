"use client"; 
import React, {useState} from "react"; 
import {Box, Typography, TextField, Button, Link, FormControl, MenuItem, Select, InputLabel} from "@mui/material";
import {useTheme} from "@mui/material/styles";


export default function AddItemForm() {
    const theme = useTheme()

    const [form, setForm] = useState({
        itemName: "",
        description: "",
        category: "",
        quantity: "",
        upcCode: ""
    })


    return (
        <Box sx = {{
            width:"35vw", 
            height:"70vh", 
            ml: 2, 
            mt:2,
            backgroundColor: theme.palette.background.secondary,
        }}>
            <Box sx = {{mt:3, px:2}}>
                <Typography variant="h6" gutterBottom>
                    Add New Item
                </Typography>

                <TextField fullWidth label="Item Name" margin="normal" 
                    sx = {{
                        height: "10%"
                }}/>
                <TextField 
                    fullWidth
                    multiline
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
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    
                </FormControl>
                <Button variant="contained" sx = {{ml:2, mt:2}}>Add New Category</Button>
                <TextField fullWidth label="Quantity" margin="normal" sx = {{
                    height: "10%"
                }}/>
                <TextField label="UPC Code" margin="normal" sx={{
                    width:"40%",
                    height: "10%"
                }} />
                <Button variant="contained" sx={{ml:2, mt:3}}>
                    Search for UPC Code
                </Button>

                <Button variant="contained"  sx = {{mt:8, width:"10vw"}}>
                    Add Item
                </Button>
            </Box>
        </Box>
    )
}