import { Box, Typography } from "@mui/material";

function Statebox({state})
{
    const colors = {
        1: "red",  //
        2: "blue",
        3: "green",
    };

    return (
        <Box sx={{backgroundColor : colors[state.id], borderRadius : "5px", justifyContent : "center", display : "flex"}}>
            <Typography> {state.name}</Typography>
        </Box>
    );
}

export default Statebox; 