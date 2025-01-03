import { TextField, Typography, Checkbox, FormControlLabel, Button, Snackbar, Alert, Box, Select, MenuItem } from "@mui/material";
import Textarea from '@mui/joy/Textarea';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api/products";
import { fetchCategories, fetchCategory } from "../../api/categories";

function Product() {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    const fetchAndSetProduct = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    const fetchAndSetCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        
      }
    }
    fetchAndSetCategories();
    fetchAndSetProduct();
  }, []);

  return (
    <>
      <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Produkt {product?.id}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1 }}>
            <img src={product.image_url} alt="Beschreibung des Bildes" width="300px" height="300px" />
          </Box>

          <Box sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField value={product?.name} label="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <TextField value={product?.sku} label="SKU" onChange={(e) => setProduct({ ...product, sku: e.target.value })} />
            <TextField value={product?.price} label="Preis" onChange={(e) => setProduct({ ...product, sku: e.target.value })} />
            <Select
        label="Kategorie"
        value={product?.category_id || ""}
        sx={{ width: "20%", marginTop: "1rem" }}
        onChange={(e) =>
          setProduct((prev) => ({ ...prev, role_id: e.target.value }))
        }
      >
        {categories?.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
          </Box>
        </Box>
        <Textarea value={product?.description} placeholder="Beschreibung" onChange={(e) => setProduct({ ...product, description: e.target.value })} style={{ width: '100%', padding: '8px', fontSize: '16px' }} />
      </Box>
    </>
  )
}

export default Product;