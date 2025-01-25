import { TextField, Typography, Checkbox, FormControl, Button, InputLabel, Divider, Box, Select, MenuItem, CircularProgress } from "@mui/material";
import Textarea from '@mui/joy/Textarea';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../../api/products";
import { fetchCategories, fetchCategory } from "../../../api/categories";
import { useSnackbar } from "../../../Context/SnackbarContext";
import { updateProduct } from "../../../api/products";
import BackendHeader from "../../../Components/Backend/ItemHeader";

function Product() {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { showSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    const fetchAndSetProduct = async () => {
      try {
        const response = await fetchProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    };

    const fetchAndSetCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {

      }
    }


    Promise.all([fetchAndSetCategories(), fetchAndSetProduct()]).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    await updateProduct(product);
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;

        // Aktualisiere das product-Objekt mit dem Bild
        setProduct((prev) => ({
          ...prev,
          image: imageData, // Speichert die Bilddaten als Base64
        }));

        // Setze die Vorschau
        setImagePreview(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <CircularProgress />
    )
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <BackendHeader item={product} name={"Produkt"}>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleSave()} >
          Speichern
        </Button>
      </BackendHeader>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 2, marginTop: 2 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              border: imagePreview || product.image_url ? "none" : "2px dashed #ccc",
              borderRadius: "8px",
              width: "300px",
              height: "300px",
              cursor: "pointer",
              backgroundImage: imagePreview
                ? `url(${imagePreview})`
                : product.image_url
                  ? `url(${product.image_url})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              "&:hover": {
                borderColor: imagePreview || product.image_url ? "none" : "#1976d2",
              },
            }}
            onClick={() => document.getElementById("imageInput").click()}
          >
            {!imagePreview || !product.image_url && (
              <Typography variant="body1" color="textSecondary">
                Klicke hier, um ein Bild hochzuladen
              </Typography>
            )}
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </Box>

          <Box sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField value={product?.name} label="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <TextField value={product?.sku} label="SKU" onChange={(e) => setProduct({ ...product, sku: e.target.value })} />
            <TextField value={product?.price} label="Preis" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            <TextField value={product?.quantity} label="Anzahl" onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
            <FormControl
              sx={{ marginTop: "1rem" }}
            >
              <InputLabel id="category-label">Kategorie</InputLabel>
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
            </FormControl>
          </Box>
        </Box>
        <Textarea
          value={product?.description}
          placeholder="Beschreibung"
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          style={{ width: '100%', padding: '8px', fontSize: '16px', height: '200px' }}
        />
      </Box>

    </Box>
  )
}

export default Product;