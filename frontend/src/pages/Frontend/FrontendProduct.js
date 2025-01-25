import { useParams } from "react-router-dom";
import { fetchProductWithName } from "../../api/products";
import { useEffect, useState } from "react";

// Material UI Komponenten
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

function FrontendProduct() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const { productName } = useParams();

  const fetchAndSetProduct = async () => {
    try {
      const response = await fetchProductWithName(productName);
      setProduct(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  };

  useEffect(() => {
    Promise.all([fetchAndSetProduct()]).finally(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);

  if (loading) {
    // Skeleton-Loader für Bild, Titel, Preis, etc.
    return (
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="60%" height={60} />
            <Skeleton variant="text" width="40%" height={40} />
            <Skeleton variant="text" width="80%" height={120} />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  // Hier gehen wir davon aus, dass dein API-Response einen key "stock" mit dem Lagerbestand liefert
  const stockAvailable = product.stock || 0; // Fallback auf 0, falls nicht definiert

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4}>
        {/* Linke Spalte: Produktbild */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: "none",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          >
            <CardMedia
              component="img"
              image={product.image_url}
              alt={product.name}
              sx={{
                maxHeight: 500,
                objectFit: "contain",
              }}
            />
          </Card>
        </Grid>

        {/* Rechte Spalte: Produktdetails */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="h5" color="primary" gutterBottom>
              {product.price} €
            </Typography>

            <Divider sx={{ marginBottom: 2 }} />

            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description || "Keine Beschreibung verfügbar."}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginBottom: 2 }}
            >
              Artikelnummer: {product.sku}
            </Typography>

            {/* Lagerbestand */}
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              {stockAvailable > 0
                ? `Noch ${stockAvailable} Stück auf Lager`
                : "Aktuell nicht auf Lager"}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ textTransform: "none", fontWeight: "bold", width: "100%" }}
              onClick={() => console.log("Zum Warenkorb hinzugefügt")}
              disabled={stockAvailable <= 0}
            >
              In den Warenkorb
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Zusätzliche Informationen */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Weitere Informationen
        </Typography>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Produktdetails</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              Hier kannst du weitere Informationen, Spezifikationen
              oder technische Daten zum Produkt unterbringen.
              Du kannst auch mehrere Accordions verwenden, z.B.
              für „Lieferumfang“, „Garantiebestimmungen“ und mehr.
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* Weitere Accordions bei Bedarf hinzufügen */}
      </Box>
    </Box>
  );
}

export default FrontendProduct;
