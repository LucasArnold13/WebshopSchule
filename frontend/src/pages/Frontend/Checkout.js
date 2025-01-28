import { Box, Typography, Grid, Paper, List, ListItem, Divider, ListItemText, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../../Context/CartContext";
import dayjs from "dayjs";
import { getFormattedDatetime } from '../../utils/getFormattedDatetime';

function Checkout() {
  const customer = useSelector((state) => state.customer);
  const { state } = useCart();
  const [order, setOrder] = useState({
    status_id: 1,
    customer_id: customer.id,
    orderitems: [],
    total_price_float: 0,
    street: "",
    city: "",
    state: "",
    postalcode: "",
    country: "",
    order_date: getFormattedDatetime(dayjs()),
    delivery_date: getFormattedDatetime(dayjs().add(2, "day")),
  });

  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      orderitems: state.cart,
    }));
  }, [state.cart]);

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
        Ihre Bestellung
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Kundennummer:
            </Typography>
            <Typography>{order.customer_id}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Bestelldatum:
            </Typography>
            <Typography>{order.order_date}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Lieferadresse
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Straße:</Typography>
            <Typography>{order.street || "-"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Stadt:</Typography>
            <Typography>{order.city || "-"}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2">PLZ:</Typography>
            <Typography>{order.postalcode || "-"}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2">Bundesland:</Typography>
            <Typography>{order.state || "-"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Land:</Typography>
            <Typography>{order.country || "-"}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Artikelübersicht
        </Typography>
        <List>
          {order.orderitems.map((item, index) => (
            <div key={item.product_id}>
              <ListItem sx={{ py: 2, alignItems: "flex-start" }}>
                <Avatar
                  src={item.image_url || ""}
                  alt={item.name || "Produktbild"}
                  variant="rounded"
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <ListItemText
                  primary={
                    <Typography fontWeight="medium">
                      {item.name || `Produkt ${item.product_id}`}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">SKU: {item.sku || "Nicht verfügbar"}</Typography>
                      <Typography variant="body2">Menge: {item.quantity}</Typography>
                    </>
                  }
                />
                <Typography variant="body1">{(item.price * item.quantity).toFixed(2)} €</Typography>
              </ListItem>
              {index < order.orderitems.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Zahlungszusammenfassung
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Zwischensumme:</Typography>
            <Typography>Versandkosten:</Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
              Gesamtbetrag:
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Typography>s €</Typography>
            <Typography>0.00 €</Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
              a €
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Checkout;
