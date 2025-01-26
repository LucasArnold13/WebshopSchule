import { Typography, TextField, Select, MenuItem, Box, Divider, FormControl, InputLabel, Button, FormControlLabel, Checkbox } from "@mui/material";
import { useState, useEffect } from "react";
import Textarea from '@mui/joy/Textarea';
import { fetchCategories } from "../../../api/categories";
import { createProduct } from "../../../api/products";
import { useSnackbar } from "../../../Context/SnackbarContext";
import { useNavigate } from 'react-router-dom';
import NewItemHeader from "../../../Components/Backend/NewItemHeader";

function AddProduct() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [product, setProduct] = useState({
    image: imagePreview,
    is_active: true,
  });
  const [categories, setCategories] = useState([]);

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
    console.log(response);
    if (response.status === 201) {
      navigate("/backend/products/" + response.data.product.id)
    }

  };

  return (
    <>
      <NewItemHeader name="neues Produkt anlegen" >
      <Button 
      variant="contained" 
      color="success" 
      onClick={() => handleSave()} >
          Speichern
        </Button>
      </NewItemHeader>
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

          <Box sx={{ flex: 3, display: "flex", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                sx={{ width: 300 }}
                value={product?.name}
                label="Name"
                onChange={(e) => setProduct({ ...product, name: e.target.value })} />
              <TextField
                sx={{ width: 300 }}
                value={product?.sku}
                label="SKU"
                onChange={(e) => setProduct({ ...product, sku: e.target.value })} />
              <TextField
                sx={{ width: 300 }}
                value={product?.price}
                label="Preis"
                onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                sx={{ width: 300 }}
                value={product?.quantity}
                label="Anzahl"
                onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />

              <FormControl>
                <InputLabel id="category-label">Kategorie</InputLabel>
                <Select
                  label="Kategorie"
                  value={product?.category_id || ""}
                  onChange={(e) =>
                    setProduct((prev) => ({ ...prev, category_id: e.target.value }))
                  }
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={product?.is_active}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        is_active: e.target.checked,
                      })
                    }
                  />
                }
                label="Ist aktiv"
              />

            </Box>

          </Box>
        </Box>
        <Textarea
          value={product?.description}
          placeholder="Beschreibung"
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          style={{ width: '100%', padding: '8px', fontSize: '16px', height: '200px' }}
        />
      </Box>
    </>
  );
}

export default AddProduct;