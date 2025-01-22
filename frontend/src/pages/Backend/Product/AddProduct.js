import { Typography, TextField, Select, MenuItem, Box, Divider, FormControl, InputLabel, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Textarea from '@mui/joy/Textarea';
import { fetchCategories } from "../../../api/categories";
import { createProduct } from "../../../api/products";
import { useSnackbar } from "../../../Context/SnackbarContext";
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [product, setProduct] = useState({
    image: imagePreview
  });
  const [categories, setCategories] = useState([]);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {

    const fetchAndSetCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {

      }
    }
    fetchAndSetCategories();
  }, []);



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

  const handleSave = async () => {
    const response = await createProduct(product);
    if (response.status === 201) {
      showSnackbar(response.data.message, "success");
      navigate("/backend/products/" + response.data.product.id)
    }
    else {
      showSnackbar(response.data.message, "error");
    }

  };

  return (
    <>
      <Box>
        <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>neues Produkt anlegen</Typography>
        <Divider />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
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
            {!imagePreview && (
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
          <Box sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 2, }}>
            <TextField sx={{ width: 300 }} value={product?.name} label="Name" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <TextField sx={{ width: 300 }} value={product?.sku} label="SKU" onChange={(e) => setProduct({ ...product, sku: e.target.value })} />
            <TextField sx={{ width: 300 }} value={product?.price} label="Preis" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            <TextField sx={{ width: 300 }} value={product?.quantity} label="Anzahl" onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
            <FormControl
              sx={{ width: "20%", marginTop: "1rem" }}
              variant="outlined"
            >
              <InputLabel id="category-label">Kategorie</InputLabel>
              <Select
                labelId="category-label" // Verknüpft das Label mit dem Select
                value={product?.category_id || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, category_id: e.target.value }))
                }
                label="Kategorie" // Zeigt das Label innerhalb des Select-Felds an
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
        <Box>
          <Typography variant="h5">Beschreibung</Typography>
          <Textarea
            value={product?.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            style={{ width: '100%', height: 100, padding: '8px', fontSize: '16px' }} />
        </Box>
        <Button variant="contained" color="success" sx={{ width: "10%", marginTop: "1rem" }} onClick={() => handleSave()} >
          Speichern
        </Button>
      </Box>
    </>
  );
}

export default AddProduct;