const router = require("express").Router();
const {
  getAllOrdersData,
  getTodaysRevenue,
  getNewCustomersFromThisMonth,
  getOrderChartData
} = require("../services/DashboardService");

// returns all data for the dashboard
router.get('/', async (req, res) => {
  try {

    const data = {
      allOrders: await getAllOrdersData(),
      todaysRevenue: await getTodaysRevenue(),
      newCustomers: await getNewCustomersFromThisMonth(),
      orderChartData: await getOrderChartData(),

    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

module.exports = router;