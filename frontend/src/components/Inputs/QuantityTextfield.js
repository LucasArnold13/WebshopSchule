import { TextField } from "@mui/material";

function QuantityTextfield({item, setOrder, order}){
     return (
        <TextField
        value={item.quantity}
        size="small"
        onChange={(e) => {
            const value = e.target.value;

            // Überprüft ob der Wert leer / numerisch ist und kleiner/gleich 10.000
            if (value === "" || (/^\d*$/.test(value) && parseInt(value || "0", 10) <= 10000)) {
                const updatedOrderItems = order.orderitems.map((orderItem) => {
                    if (orderItem.id === item.id) {
                        return {
                            ...orderItem,
                            quantity: value === "" ? "" : parseInt(value, 10),
                        };
                    }
                    return orderItem;
                });
                setOrder({ ...order, orderitems: updatedOrderItems });
            }
        }}
        onBlur={(e) => {
            // Sicherstellen, dass leere Eingaben auf 0 zurückgesetzt werden
            if (e.target.value === "") {
                const updatedOrderItems = order.orderitems.map((orderItem) => {
                    if (orderItem.id === item.id) {
                        return {
                            ...orderItem,
                            quantity: 0,
                        };
                    }
                    return orderItem;
                });
                setOrder({ ...order, orderitems: updatedOrderItems });
            }
        }}
        sx={{
            width: 80,
            "& .MuiInputBase-input": {
                textAlign: "center",
                padding: "4px 8px",
            },
        }}
    />

     );
}

export default QuantityTextfield;