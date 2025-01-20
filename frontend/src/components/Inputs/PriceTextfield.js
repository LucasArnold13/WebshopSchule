import { TextField } from "@mui/material";

function PriceTextfield({item, order, setOrder})
{
    return (
        <TextField
        value={item.product.price.toString()} // Zeigt die Roh-Eingabe an
        size="small"
        onChange={(e) => {
            const inputValue = e.target.value.replace(",", "."); // Komma durch Punkt ersetzen
            const regex = /^[0-9]*[.,]?[0-9]*$/; // Nur Zahlen mit optionalem Dezimalpunkt/Komma

            // Eingabe validieren
            if (regex.test(inputValue) || inputValue === "") {
                const updatedOrderItems = order.orderitems.map((orderItem) => {
                    if (orderItem.id === item.id) {
                        return {
                            ...orderItem,
                            product: {
                                ...orderItem.product,
                                price: inputValue === "" ? "" : inputValue, // Eingabe direkt speichern
                            },
                        };
                    }
                    return orderItem;
                });
                setOrder({ ...order, orderitems: updatedOrderItems });
            }
        }}
        onBlur={() => {
            // Formatierung anwenden, wenn das Feld verlassen wird
            const updatedOrderItems = order.orderitems.map((orderItem) => {
                if (orderItem.id === item.id) {
                    return {
                        ...orderItem,
                        product: {
                            ...orderItem.product,
                            price: parseFloat(orderItem.product.price) || 0, // In Zahl umwandeln
                        },
                    };
                }
                return orderItem;
            });
            setOrder({ ...order, orderitems: updatedOrderItems });
        }}
        sx={{
            width: 80,
            "& .MuiInputBase-input": {
                textAlign: "center",
                padding: "4px 8px",
            },
        }}
        input={{
            inputMode: "decimal", // Virtuelle Tastatur für Dezimalzahlen
            pattern: "[0-9]*[.,]?[0-9]*", // Nur gültige Zahlen erlauben
        }}
    />
    );
}

export default PriceTextfield; 