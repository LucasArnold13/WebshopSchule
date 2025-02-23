const router = require("express").Router();
const {
  getAllOrdersData,
  getTodaysRevenue,
  getNewCustomersFromThisMonth,
  getOrderChartData,
  getQuantityByCategory
} = require("../services/DashboardService");

const isAuthenticated = require("../middlewares/authentification");
const { backendSession } = require("../sessions/session");

// returns all data for the dashboard
router.get('/', backendSession, isAuthenticated, async (req, res) => {
  try {

    const data = {
      allOrders: await getAllOrdersData(),
      todaysRevenue: await getTodaysRevenue(),
      newCustomers: await getNewCustomersFromThisMonth(),
      orderChartData: await getOrderChartData(),
      getQuantityByCategory : await getQuantityByCategory()

    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

module.exports = router;