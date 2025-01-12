import React from 'react';
import { Card, Box, Typography, CardHeader, CardContent } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';

function DashboardCard({ data }) {
    // Dynamische Farbe und Nachricht basierend auf dem Prozentsatz
    const percentageColor =
        data?.percentageChange > 0
            ? 'green'
            : data?.percentageChange < 0
            ? 'red'
            : 'gray';

    const percentageText =
        data?.percentageChange > 0
            ? `${Math.ceil(Math.abs(data.percentageChange))}% mehr als letzten Monat`
            : data?.percentageChange < 0
            ? `${Math.ceil(Math.abs(data.percentageChange))}% weniger als letzten Monat`
            : 'Keine Veränderung im Vergleich zum letzten Monat';

    return (
        <Card sx={{ flex: 1, height: "200px" }}>
            <CardHeader title={data?.title} />
            <CardContent>
                {/* Titel */}
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{ marginBottom: 1 }}
                >
                    {data?.timeRangeString}
                </Typography>

                {/* Zahl und Vergleich */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* Große Zahl */}
                    <Typography variant="h4" fontWeight="bold">
                        {data?.data}
                    </Typography>

                    {/* Balken-Icon */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                        }}
                    >
                        <BarChartIcon />
                    </Box>
                </Box>

                {/* Dynamischer Prozentsatz-Text */}
                <Typography
                    variant="subtitle2"
                    sx={{ color: percentageColor, marginTop: 1 }}
                >
                    {percentageText}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default DashboardCard;
