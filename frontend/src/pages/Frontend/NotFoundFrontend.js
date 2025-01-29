import { Box, Typography, Button, TextField, Grid, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const CategoryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.light,
  },
}));

function NotFoundFrontend() {
  const categories = ['Grocery', 'Beauty', 'Health', 'Home', 'Computers', 'Tools', 'Industrial', 'Electronic'];

  return (
    <Box sx={{ 
      maxWidth: 1280,
      mx: 'auto',
      px: { xs: 2, sm: 3, md: 4 },
      py: 8
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '9rem',
            fontWeight: 700,
            color: 'primary.main',
            mb: 4
          }}
        >
          404
        </Typography>

        <Typography variant="h4" sx={{ mb: 2, color: 'text.primary' }}>
          Seite nicht gefunden
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Die von Ihnen gesuchte Seite konnte leider nicht gefunden werden.
        </Typography>

        <Stack spacing={2} sx={{ maxWidth: 500, mx: 'auto', mb: 8 }}>
          <TextField 
            variant="outlined"
            placeholder="Was suchen Sie?"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1
              }
            }}
          />
          <Button 
            variant="contained" 
            size="large"
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Zur Startseite
          </Button>
        </Stack>

        <Paper variant="outlined" sx={{ pt: 8, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 600 }}>
            Beliebte Kategorien
          </Typography>
          
          <Grid container spacing={2} sx={{ maxWidth: 800, mx: 'auto', px: 2 }}>
            {categories.map((category) => (
              <Grid item xs={6} md={3} key={category}>
                <CategoryButton fullWidth>
                  {category}
                </CategoryButton>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default NotFoundFrontend;