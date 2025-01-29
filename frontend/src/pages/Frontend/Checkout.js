import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  TextField,
  Grid as Grid2,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../../Context/CartContext";
import dayjs from "dayjs";
import { getFormattedDatetime } from "../../utils/getFormattedDatetime";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchaddressesFrontend } from "../../api/address";
import { createOrderFrontend } from "../../api/orders";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const customer = useSelector((state) => state.customer);
  const { state, dispatch } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [addressOption, setAddressOption] = useState("saved");
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    orderitems: [],
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    order_date: dayjs(),
    delivery_date: dayjs().add(2, "day"),
  });

  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      orderitems: state.cart,
    }));
  }, [state.cart]);

  const fetchAndSetAddreses = async () => {
    const response = await fetchaddressesFrontend();
    if (response.status === 200) {
      setAddresses(response.data);
    }
  }

  useEffect(() => {
    fetchAndSetAddreses();
  }, [])

  const updateQuantity = (productId, amount) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, amount } });
  };

  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const handleBuy  = async () => {
    const response = await createOrderFrontend(order);
    if (response.status === 201) {
      dispatch({ type: "CLEAR_CART" });
      navigate("/customer/orders/" + response.data.order_id);
    }
  }


  const handleAddressChange = (event) => {
    const selectedAddress = addresses.find((addr) => addr.id === event.target.value);
    if (selectedAddress) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        street: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        postalCode: selectedAddress.postalCode,
        country: selectedAddress.country,
      }));
    }
  };

  const handleManualAddressChange = (event) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [event.target.name]: event.target.value,
    }));
  };


  const totalItems = order.orderitems.reduce((acc, item) => acc + item.quantity, 0);


  // Gesamtbetrag berechnen
  const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


  return (
    <Box sx={{ p: 4, maxWidth: 900, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
        Ihre Bestellung
      </Typography>

      {/* 📦 Kundeninformationen */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Kunde</Typography>
            <Typography>{customer.firstname} {customer.lastname}</Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Bestelldatum:</Typography>
            <Typography>{getFormattedDatetime(order.order_date)}</Typography>
          </Grid2>
        </Grid2>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Lieferadresse</Typography>

        {/* Radio Button Auswahl */}
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <RadioGroup row value={addressOption} onChange={(e) => setAddressOption(e.target.value)}>
            <FormControlLabel value="saved" control={<Radio />} label="Gespeicherte Adresse wählen" />
            <FormControlLabel value="manual" control={<Radio />} label="Adresse manuell eingeben" />
          </RadioGroup>
        </FormControl>

        {/* Auswahl gespeicherter Adressen */}
        {addressOption === "saved" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Adresse auswählen</InputLabel>
            <Select onChange={handleAddressChange}>
              {addresses.map((address) => (
                <MenuItem key={address.id} value={address.id}>
                  {address.street}, {address.city} ({address.postalCode})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Manuelle Adresseingabe */}
        {addressOption === "manual" && (
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} md={6}>
              <TextField fullWidth label="Straße" name="street" value={order.street} onChange={handleManualAddressChange} />
            </Grid2>
            <Grid2 item xs={12} md={6}>
              <TextField fullWidth label="Stadt" name="city" value={order.city} onChange={handleManualAddressChange} />
            </Grid2>
            <Grid2 item xs={6} md={3}>
              <TextField fullWidth label="PLZ" name="postalcode" value={order.postalCode} onChange={handleManualAddressChange} />
            </Grid2>
            <Grid2 item xs={6} md={3}>
              <TextField fullWidth label="Bundesland" name="state" value={order.state} onChange={handleManualAddressChange} />
            </Grid2>
            <Grid2 item xs={12}>
              <TextField fullWidth label="Land" name="country" value={order.country} onChange={handleManualAddressChange} />
            </Grid2>
          </Grid2>
        )}

        {/* 📅 Lieferdatum Auswahl */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: "grey.100", borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>Lieferdatum</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Lieferdatum"
              format="DD/MM/YYYY"
              value={order.delivery_date}
              onChange={(newValue) => setOrder((prevOrder) => ({ ...prevOrder, delivery_date: getFormattedDatetime(newValue) }))}
              renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
            />
          </LocalizationProvider>
        </Box>
      </Paper>


      {/* 🛒 Artikelübersicht */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>Artikelübersicht</Typography>

        {/* **Gesamtanzahl der Artikel anzeigen** */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Gesamtanzahl: {order.orderitems.reduce((acc, item) => acc + item.quantity, 0)} {order.orderitems.length === 1 ? "Artikel" : "Artikel"}
        </Typography>

        {/* Scrollbarer Bereich mit maxHeight */}
        <Box sx={{ maxHeight: 350, overflowY: "auto", pr: 1 }}>
          <List>
            {order.orderitems.map((item) => (
              <Paper key={item.id} elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                <ListItem sx={{ display: "flex", alignItems: "center" }}>

                  {/* Produktbild */}
                  <Avatar
                    src={item.image_url || ""}
                    alt={item.name}
                    variant="rounded"
                    sx={{ width: 80, height: 80, mr: 2, borderRadius: 2 }}
                  />

                  {/* Name und SKU */}
                  <ListItemText
                    primary={
                      <Typography fontWeight="medium">
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">SKU: {item.sku || "Nicht verfügbar"}</Typography>
                    }
                    sx={{ flexGrow: 1 }}
                  />

                  {/* 🛠️ Mengensteuerung */}
                  <Box sx={{ display: "flex", alignItems: "center", mx: 2, backgroundColor: "grey.100", p: 1, borderRadius: 1 }}>
                    <IconButton onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1} size="small">
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1, fontWeight: "bold" }}>{item.quantity}</Typography>
                    <IconButton onClick={() => updateQuantity(item.id, 1)} size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>

                  {/* Preis */}
                  <Typography variant="body1" fontWeight="bold">{(item.price * item.quantity).toFixed(2)} €</Typography>

                  {/* 🗑️ Entfernen-Button */}
                  <IconButton onClick={() => removeItem(item.id)} sx={{ ml: 2 }}>
                    <DeleteIcon sx={{ color: "error.main" }} />
                  </IconButton>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Box>
      </Paper>

      {/* 💰 Zahlungszusammenfassung */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Zahlungszusammenfassung</Typography>
        <Grid2 container spacing={2}>
          <Grid2 item xs={6}>
            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>Gesamtbetrag:</Typography>
          </Grid2>
          <Grid2 item xs={6} sx={{ textAlign: "right" }}>
            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>{total.toFixed(2)} €</Typography>
          </Grid2>
        </Grid2>
      </Paper>

      {/* 🛒 Jetzt kaufen Button */}
      <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontWeight: "bold" }} onClick={handleBuy}>
        Jetzt kaufen
      </Button>
    </Box>
  );
}

export default Checkout;
