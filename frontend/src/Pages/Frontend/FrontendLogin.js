import React from "react";
import Loginform from "../../Components/Loginform";
import { Box } from "@mui/material";


function FrontendLogin() {
  return (
    <Box sx={{         
      display: 'flex',
      justifyContent: 'center'
    }}>
    <Loginform/>
    </Box>

  );
}

export default FrontendLogin;
