import React from "react";
import { Box } from "@mui/material";
function StatusBox({ status }) {
    return (
        <Box
            sx={{
                padding: "4px 12px", // Innenabstand
                borderRadius: "8px", // Abgerundete Ecken
                fontWeight: "bold", // Fett für bessere Sichtbarkeit
                color: "white", // Weißer Text
                backgroundColor: // Hintergrundfarbe abhängig von der Status-ID
                    status?.id === 1 // Pending
                        ? "orange"
                        : status?.id === 2 // Approved
                            ? "green"
                            : status?.id === 3 // Rejected
                                ? "red"
                                : "gray" // Default color
            }}
        >
            {status?.name}
        </Box>
    );
}

export default StatusBox;