import React from "react";
import Registerform from "../components/Registerform";
import { Box } from "@mui/material";


function Register() {
  return (
    <Box sx={{         
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translateY(50px)',
    }}>
    <Registerform/>
    </Box>
  );
}

export default Register;
