import { TextField, Modal, FormControl, Button, Divider, Box, Typography, Select, MenuItem, Paper, InputLabel, } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { searchProducts } from "../api/products";
import { useSnackbar } from "../Context/SnackbarContext";
import _ from "lodash";

function SearchModal({ open, setOpen, order, setOrder }) {
    const { showSnackbar } = useSnackbar();
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);

    const handleSearch = async (query) => {
        try {

            const response = await searchProducts(query);
            setProducts(response.data)

        } catch (error) {
            console.error('Fehler bei der Suche:', error);
        }
    };

    const debouncedSearch = useCallback(
        _.debounce((query) => {
            handleSearch(query);
        }, 500), 
        []
    );


    const handleChange = (event) => {
        const query = event.target.value;
        console.log(query);
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const onClose = () => {
        setOpen(false);
        setProducts([]);
        setSearchQuery("");
    };

    const addProduct = (item) => {
        const isProductInOrder = order.orderitems.some(
            (orderItem) => orderItem.product_id === item.id
        );
    
        if (isProductInOrder) {
            showSnackbar("Produkt bereits in der Bestellung enthalten", "info");
            return; 
        }

        const newOrderItem = {
            order_id: order.id,
            price: item.price,
            quantity: 1,
            product_id: item.id,
            product: item
        };
    

        setOrder((prevOrder) => ({
            ...prevOrder,
            orderitems: [...prevOrder.orderitems, newOrderItem],
        }));
    
        onClose();
    };
    

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "70%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    };

    useEffect(() => {
        return () => {
            debouncedSearch.cancel(); // Debounced-Funktion aufräumen
        };
    }, [debouncedSearch]);

    
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box
                    sx={{
                        width: "100%",
                        marginBottom: "1rem",
                    }}
                >
                    <TextField
                        id="filled-basic"
                        label="Search"
                        variant="filled"
                        sx={{ width: "100%" }}
                        value={searchQuery}
                        onChange={handleChange}
                    />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        overflowX: "hidden",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "0.5rem",
                    }}
                >

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 2fr 1fr 1fr",
                            alignItems: "center",
                            backgroundColor: "rgba(22, 139, 248, 0.9)",
                            padding: 2,
                            fontWeight: "bold",
                            borderBottom: "2px solid #ccc",
                        }}
                    >
                        <Typography variant="body1">ID</Typography>
                        <Typography variant="body1">Name</Typography>
                        <Typography variant="body1">SKU</Typography>
                        <Typography variant="body1">Menge</Typography>
                    </Box>

                    {/* Produktliste */}
                    {products?.length > 0 ? (
                        products.map((item) => (
                            <Paper
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 2fr 1fr 1fr",
                                    alignItems: "center",
                                    padding: 2,
                                    marginTop: 1,
                                    marginBottom: 1,
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "rgba(22, 139, 248, 0.27)",
                                    },
                                }}
                                onClick={() => addProduct(item)}
                                key={item.id}
                            >
                                <Typography variant="body1">{item.id}</Typography>
                                <Typography variant="body1">{item.name}</Typography>
                                <Typography variant="body1">{item.sku}</Typography>
                                <Typography variant="body1">{item.quantity}</Typography>
                            </Paper>
                        ))
                    ) : (
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: "center",
                                color: "gray",
                                marginTop: "1rem",
                            }}
                        >
                            Keine Produkte gefunden.
                        </Typography>
                    )}
                </Box>

            </Box>
        </Modal>
    );


}

export default SearchModal; 