import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Alert } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Category() {
    const [category, setCategory] = useState({});
    const { id } = useParams();


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/backend/categories/' + id, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                console.log(data);
                setCategory(data);
                if (response.ok) {

                } else {
                    console.error("Fehler bei der API-Anfrage:", response.statusText);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchCategory();
    }, []);

    const handleSave = async () => {};

    return (
        <div>
            <h1>categorieID {category?.id}</h1>
            <TextField value={category?.name} label="Name" onChange={(e) => setCategory({ ...category, name: e.target.value })} />
            <TextareaAutosize value={category?.description} label="Beschreibung" onChange={(e) => setCategory({ ...category, description: e.target.value })} />
                <Button variant="contained" onClick={handleSave}>Speichern</Button>


        </div>
    )
}

export default Category;