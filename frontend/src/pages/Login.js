import React from "react";
import Loginform from "../Components/Loginform";
import { Box } from "@mui/material";


function Login() {
  return (
    <Box sx={{         
      display: 'flex',
      justifyContent: 'center'
    }}>
    <Loginform/>
    </Box>

  );
}

export default Login;
