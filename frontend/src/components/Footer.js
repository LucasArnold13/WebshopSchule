import { Box, Typography, Container, Grid, Link, Button } from "@mui/material";

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: "background.paper",
                color: "text.primary",
                padding: 4,
                borderTop: "1px solid",
                borderColor: "divider",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Newsletter Section */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Account erstellen und keine Action mehr verpassen
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Melde dich jetzt an und verpasse keine Aktionen und Angebote.
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                gap: 2,
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Deine E-Mail-Adresse"
                                style={{
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    flexGrow: 1,
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    textTransform: 'none',
                                }}
                            >
                                Anmelden
                            </Button>
                        </Box>
                    </Grid>

                    {/* Contact Information */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Kontakt
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Webshop
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Musterstraße 10
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Heinsberg 52525
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Telefon: 01234 567890
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            E-Mail: info@webshop.de
                        </Typography>
                    </Grid>
                </Grid>

                {/* Footer Bottom */}
                <Box
                    sx={{
                        borderTop: "1px solid",
                        borderColor: "divider",
                        paddingTop: 2,
                        marginTop: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        © {new Date().getFullYear()} Webshop. Alle Rechte vorbehalten.
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Link href="#" sx={{ color: 'text.secondary', mx: 1 }}>
                            Datenschutz
                        </Link>
                        <Link href="#" sx={{ color: 'text.secondary', mx: 1 }}>
                            Impressum
                        </Link>
                        <Link href="#" sx={{ color: 'text.secondary', mx: 1 }}>
                            AGB
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;