import { useParams, useNavigate } from "react-router-dom";
import { fetchProductWithName } from "../../api/products";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  Divider,
  Grid2
} from "@mui/material";
import { useCart } from "../../Context/CartContext";
import { getCartFromLocalStorage } from "../../utils/localStorageCart";



function FrontendProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { productName } = useParams();
  const { dispatch } = useCart();

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
    const savedCart = getCartFromLocalStorage();
    dispatch({ type: "LOAD_CART", payload: savedCart });

  }, [productName, dispatch]);


  // Funktion zum Hinzufügen des Produkts in den Warenkorb
  const addToCart = () => {
    try {
      dispatch({ type: "ADD_TO_CART", payload: product });
    } catch (error) {
      console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
    }
  };


  if (loading) {
    return (
      <Box sx={{ padding: 4, maxWidth: 1280, margin: '0 auto' }}>
        <Grid2 container spacing={6}>
          <Grid2 item xs={12} md={6}>
            <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 4 }} />
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Skeleton variant="text" width="80%" height={80} />
            <Skeleton variant="text" width="40%" height={60} />
            <Skeleton variant="text" width="100%" height={120} />
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 4 }} />
          </Grid2>
        </Grid2>
      </Box>
    );
  }

  const stockAvailable = product.stock || 0;

  return (
    <Box sx={{ padding: 4, maxWidth: 1280, margin: '0 auto' }}>
      {/* Zurück-Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 4,
          textTransform: 'none',
          fontWeight: 500,
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'action.hover',
            boxShadow: 1
          }
        }}
      >
        Zurück zur Übersicht
      </Button>

      <Grid2 container spacing={6}>
        {/* Bildbereich */}
        <Grid2 item xs={12} md={6}>
          <Card sx={{
            boxShadow: 3,
            borderRadius: 4,
            overflow: 'hidden',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'scale(1.02)' }
          }}>
            <CardMedia
              component="img"
              image={product.image_url || '/placeholder-product.jpg'}
              alt={product.name}
              sx={{
                height: 500,
                objectFit: 'cover',
                backgroundColor: '#f5f5f5'
              }}
            />
          </Card>
        </Grid2>

        {/* Produktinfo */}
        <Grid2 item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h3" sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}>
              {product.name}
            </Typography>

            <Typography variant="h4" sx={{
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR'
              }).format(product.price)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: 10,
              mt: 2,
            }}>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Artikelnummer
                </Typography>
                <Typography variant="body1">{product.sku}</Typography>
              </Box>

              <Box>
                <Typography variant="overline" color="text.secondary">
                  Verfügbarkeit
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500 }}
                >
                  {product.quantity}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 2,
                fontSize: '1.1rem',
                borderRadius: 2,
                boxShadow: 3,
                '&:hover': { boxShadow: 5 }
              }}
              onClick={(e) => {
                e.stopPropagation(); // Verhindert, dass onClick für die Card ausgelöst wird
                addToCart();
              }}
            >
              in den Warenkorb
            </Button>
          </Box>
        </Grid2>
      </Grid2>

      <Box sx={{ mt: 8 }}>
        <Accordion
          sx={{
            border: 1,
            borderColor: 'divider',
            boxShadow: 'none',
            '&:before': { display: 'none' }
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Beschreibung
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{
              display: 'grid',
              gap: 3,
              p: 2
            }}>
              {product.description || (
                <Typography color="text.secondary">
                  Keine Produktbeschreibung verfügbar
                </Typography>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>


    </Box>
  );
}

export default FrontendProduct;