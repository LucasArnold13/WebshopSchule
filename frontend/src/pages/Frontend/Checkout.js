import { Box, Typography } from "@mui/material"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Context/SnackbarContext";

function Checkout() {
    const customer = useSelector((state) => state.customer);
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (!customer.isAuthenticated) {
            //showSnackbar("Bitte einloggen um eine Bestellung aufzugeben", "info");
            //navigate("/login")

        }

    })
    console.log(customer);
    return (

        <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>ihr Bestellung</Typography>
        </Box>
    );
}

export default Checkout