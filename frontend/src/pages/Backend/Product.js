import { TextField, Checkbox, FormControlLabel, Button, Snackbar, Alert } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product() {
    const [product, setProduct] = useState({});
    const { id } = useParams();


    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/backend/products/' + id, {
              method: 'GET',
              credentials: 'include',
            });
    
            const data = await response.json();
            console.log(data);
            setProduct(data);
            if (response.ok) {
    
            } else {
              console.error("Fehler bei der API-Anfrage:", response.statusText);
            }
          } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
          }
        };
    
        fetchProduct();
      }, []);

    return (
        <div>
            <h1>product_id {product?.id}</h1>
            <TextField value={product?.name} label="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <TextField value={product?.sku} label="SKU" onChange={(e) => setProduct({ ...product, sku: e.target.value })} />
                <TextareaAutosize value={product?.description} label="Beschreibung" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
            <img src={product.image_url} alt="Beschreibung des Bildes" />

        </div>
    )
}

export default Product;