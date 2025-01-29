import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { Box, Typography, Grid, Paper } from "@mui/material";
import ProductCard from "../../Components/ProductCard";  // Assuming your ProductCard is located here
import { fetchProducts } from "../../api/products";  // Import the fetchProducts function

function Home() {
  // State to store the products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state to handle the loading UI

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetchProducts();  // Fetch the products from the API
        if (response.status === 200) {
          // Slice the first 3 products from the response data
          setProducts(response.data.slice(0, 3));  // Only keep the first 3 products
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    fetchProductData();  // Call the function to fetch products
  }, []);  // Empty dependency array means this will run once when the component mounts

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h6" color="textSecondary">Loading products...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "20px", backgroundColor: "" }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
            marginBottom: 4,
          }}
        >
          <Box sx={{ flex: 1, fontWeight: "bold", fontStyle: "italic" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", color: "#fff" }}>
              Unsere High Tech Angebote
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff", marginTop: 1 }}>
              Entdecke unsere Produkte zu unschlagbaren Preisen.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundImage:
                "url(https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg)", // Replace with your image path
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
              borderRadius: "10px",
            }}
          />
        </Box>

        {/* Recommendations Section */}
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff", marginBottom: 2 }}>
          Empfehlungen
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper
                sx={{
                  padding: "20px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ProductCard product={product} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
