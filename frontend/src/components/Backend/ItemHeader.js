import { Box, Button, Divider, Typography } from '@mui/material';
import { getFormattedDatetime } from '../../utils/getFormattedDatetime';


function ItemHeader({ children, item, name }) {

  return (
    <Box sx={{ paddingBottom: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Typography variant="h4" sx={{}}>{name} {item?.id}</Typography>
          <Typography variant='body2' sx={{ color: "gray", }}>
            Erstellt am: {getFormattedDatetime(item?.createdAt)}
          </Typography>

          <Typography variant='body2' sx={{ color: "gray", }}>
            Aktualisiert am: {getFormattedDatetime(item?.updatedAt)}
          </Typography>
        </Box>

        <Box sx={{ marginRight: "2rem", marginBottom: "0.5rem", gap : 3, display : "flex" }}>
          {children}
        </Box>
      </Box>

      <Divider />
    </Box>
  );
}

export default ItemHeader;