import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCartFromLocalStorage } from "../utils/localStorageCart";
import { useCart } from "../Context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch } = useCart();

  // Lade den Warenkorb aus dem Local Storage, wenn die Komponente gemountet wird
  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    dispatch({ type: "LOAD_CART", payload: savedCart });
  }, [dispatch]);

  // Funktion zum Hinzufügen des Produkts in den Warenkorb
  const addToCart = (product) => {
    try {
      dispatch({ type: "ADD_TO_CART", payload: product });
    } catch (error) {
      console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
    }
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        }
      }}
      onClick={() => navigate(`/product/${product.name}`)}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image_url}
        alt={product.name}
        sx={{
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          textAlign: "center",
          paddingBottom: "56px", // Platz für den "In den Warenkorb"-Button
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          {product.price} €
        </Typography>
      </CardContent>

      {/* Überlagernder "In den Warenkorb" Button am unteren Rand */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          pb: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.stopPropagation(); // Verhindert, dass onClick für die Card ausgelöst wird
            addToCart(product);
          }}
          sx={{
            borderRadius: 4,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          In den Warenkorb
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
