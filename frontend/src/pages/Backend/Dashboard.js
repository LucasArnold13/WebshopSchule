import { Box, Card, Typography } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import BarChartIcon from '@mui/icons-material/BarChart';


function Dashboard() {
    return (
        <Box sx={{ width: "100%", height: "95vh", display : "flex", flexDirection : "column"}}>
            <Box sx={{ width: "100%", height: "300px", display: "flex", gap: 2, flex : 1, padding: 2, boxSizing: "border-box" }}>
                <Card sx={{ flex: 1, height: "200px" }}>
                    <CardHeader title="Bestellungen in diesem Monat" />
                    <CardContent>
                        {/* Titel */}
                        <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 1 }}>
                           1.12.2021 - 31.12.2021
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
                                1600
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

                        <Typography variant="subtitle2" sx={{ color: "green", marginTop: 1 }}>
                            51% mehr als letzten Monat
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ flex: 1, height: "200px" }}>
                    <CardHeader title="Heutige Einnahmen" />
                    <CardContent>
                        {/* Titel */}
                        <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 1 }}>
                            2.12.2021
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
                                15381,65€
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

                        <Typography variant="subtitle2" sx={{ color: "green", marginTop: 1 }}>
                            12% mehr als Gestern
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ flex: 1, height: "200px" }}>
                    <CardHeader title="Neuekunden in diesem Monat" />
                    <CardContent>
                        {/* Titel */}
                        <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 1 }}>
                            1.12.2021 - 31.12.2021
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
                                351
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

                        <Typography variant="subtitle2" sx={{ color: "red", marginTop: 1 }}>
                            5% weniger als letzten Monat
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <Box sx={{ display: "flex", gap: 2, padding: 2, boxSizing: "border-box", flex : 1 }}>
                <Card sx={{ flex: 1 }}>

                    <CardHeader title="tägliche Einahmen" subheader="Kalenderwoche 50" />
                    <CardContent>
                        <BarChart
                            series={[
                                { data: [20, 45, 23, 42, 322, 12, 23], color: "green" },
                            ]}
                            height={290}
                            xAxis={[
                                {
                                    data: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                                    scaleType: 'band',
                                },
                            ]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                            borderRadius={10}
                        />
                    </CardContent>
                </Card>

                <Card sx={{ flex: 1 }}>

                    <CardHeader title="tägliche Einahmen" subheader="Kalenderwoche 50" />
                    <CardContent>
                        <BarChart
                            series={[
                                { data: [20, 45, 23, 42, 322, 12, 23], color: "green" },
                            ]}
                            height={290}
                            xAxis={[
                                {
                                    data: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                                    scaleType: 'band',
                                },
                            ]}
                            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                            borderRadius={10}
                        />
                    </CardContent>
                </Card>
            </Box>

        </Box>
    );
}

export default Dashboard; 