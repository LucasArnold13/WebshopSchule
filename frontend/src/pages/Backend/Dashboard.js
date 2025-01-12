import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import { getDashboardData } from "../../api/dashboard";
import DashboardCard from "../../Components/DashboardCard";


function Dashboard() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndSetDashboardData = async () => {
            try {
                const response = await getDashboardData();
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchAndSetDashboardData();
    }, []);

    if(loading)
    {
        return (
            <CircularProgress data={data.allOrders}/>
        )
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
            }}>
                <Typography variant='h4' sx={{ padding: "10,10,10,10" }}>Dashboard</Typography>
            </Box>
            <Box sx={{ width: "100%", height: "300px", display: "flex", gap: 2, flex: 1, padding: 2, boxSizing: "border-box" }}>
                <DashboardCard data={data?.allOrders}/>
                <DashboardCard data={data?.todaysRevenue}/>
                <DashboardCard data={data?.newCustomers}/>
            </Box>

            <Box sx={{ display: "flex", gap: 2, padding: 2, boxSizing: "border-box", flex: 1 }}>
                <Card sx={{ flex: 1 }}>

                    <CardHeader title="Bestellungen in der Woche" subheader={data?.orderChartData?.timeRangeString} />
                    <CardContent>
                        <BarChart
                            series={[
                                { data:  data?.orderChartData?.orderCounts, color: "green" },
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

                   
                </Card>
            </Box>

        </Box>
    );
}

export default Dashboard; 