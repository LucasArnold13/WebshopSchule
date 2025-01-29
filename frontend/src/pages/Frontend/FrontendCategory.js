import { useEffect, useState } from "react";
import { fetchCategoryWithName } from "../../api/categories";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Skeleton,
  Container
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ProductCard from "../../Components/ProductCard";
import SearchOffIcon from "@mui/icons-material/SearchOff";

function FrontendCategory() {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  // Für Pagination
  const [page, setPage] = useState(1);

  // Anzahl Produkte pro Seite
  const itemsPerPage = 8;

  const fetchAndSetCategory = async () => {
    try {
      const response = await fetchCategoryWithName(categoryName);
      console.log(response);
      setCategory(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  };

  useEffect(() => {
    fetchAndSetCategory().finally(() => setLoading(false));
  }, [categoryName]);

  if (loading) {
    // Einfacher Skeleton-Loader ...
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Kategorie wird geladen...
        </Typography>
        <Skeleton variant="text" width="60%" height={50} />
        <Skeleton variant="text" width="40%" height={30} />
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  // Falls keine Produkte vorhanden
  if (!category.products || category.products.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh" }}>
        <SearchOffIcon sx={{ fontSize: 60, color: "gray", mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Keine Produkte gefunden
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Die angeforderte Kategorie enthält keine Produkte.
        </Typography>
      </Container>
    );
  }

  // Berechnungen für Pagination
  const totalProducts = category.products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Index-Bereiche für die aktuelle Seite
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = category.products.slice(startIndex, endIndex);

  // Handler für die Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        {category.name}
      </Typography>

      {category.description && (
        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
          {category.description}
        </Typography>
      )}

      {/* Produkte der aktuellen Seite */}
      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination-Komponente */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Container>
  );
}

export default FrontendCategory;
