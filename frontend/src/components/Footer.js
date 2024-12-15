import { Box, Typography } from "@mui/material";

function Footer()
{
    return (
        <Box sx={{ backgroundColor: "transparent", color: "whites" }}>
        <Typography variant="h3">Account erstellen und keine Action mehr verpassen</Typography>
        <Typography variant="h5">Melde dich jetzt an und verpasse keinen Aktionen und Angebote</Typography>
        <Box sx={{ borderTop: "1px white", borderBottom: "1px white" }}>
            <Typography>Webshop</Typography>
            <Typography>Musterstraße 10</Typography>
            <Typography>Heinsberg 52525</Typography>
        </Box>
    </Box>
    ); 
}

export default Footer; 