import { Box, Divider, Typography } from '@mui/material';

function NewItemHeader({name, children}) {
    return (
        <Box sx={{ paddingBottom: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Typography variant="h4" sx={{}}>{name} </Typography>
          </Box>
  
          <Box sx={{ marginRight: "2rem", marginBottom: "0.5rem" }}>
            {children}
          </Box>
        </Box>
  
        <Divider />
      </Box>
    );
}   


export default NewItemHeader;