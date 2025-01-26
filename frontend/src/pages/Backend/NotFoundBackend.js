import { Box, Typography, Button, useTheme } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function NotFoundBackend() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "80vh",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      //  backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "800px",
          width: "100%",
          gap: theme.spacing(2),
        }}
      >
        <SentimentDissatisfiedIcon
          sx={{
            fontSize: "6rem",
            color: theme.palette.error.main,
            mb: 2,
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: theme.palette.text.primary,
            letterSpacing: "-0.05em",
          }}
        >
          404 – Nicht gefunden
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: "600px",
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          Die angeforderte Seite existiert nicht oder wurde verschoben. 
          Bitte überprüfen Sie die Adresse oder kehren Sie zum Dashboard zurück.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            href="/backend/dashboard"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "1.1rem",
              boxShadow: theme.shadows[3],
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[6],
              },
              transition: "all 0.3s ease",
            }}
          >
            Zurück zum Dashboard
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{
            mt: 4,
            color: theme.palette.text.disabled,
            display: "block",
          }}
        >
          Fehlercode: 404_NOT_FOUND
        </Typography>
      </Box>
    </Box>
  );
}

export default NotFoundBackend;