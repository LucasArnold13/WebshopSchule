import React from "react";
import { Box } from "@mui/material";
import { getStatusColor } from "../utils/getStatusColor";
function StatusBox({ status }) {
    return (
        <Box
            sx={{
                padding: "4px 12px", // Innenabstand
                borderRadius: "8px", // Abgerundete Ecken
                fontWeight: "bold", // Fett für bessere Sichtbarkeit
                color: "white", // Weißer Text
                backgroundColor: getStatusColor(status?.id),
    
            }}
        >
            {status?.name}
        </Box>
    );
}

export default StatusBox;