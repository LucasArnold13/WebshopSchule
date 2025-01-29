const router = require("express").Router();
const { Address } = require('../models');
const { frontendSession } = require("../sessions/session");
const isAuthenticated = require("../middlewares/authentification");
const { where } = require("sequelize");




// returns addresses from the customer
router.get('/frontend', frontendSession, isAuthenticated, async (req, res) => {
  try {
    const customerId = req.session.customer.id;

    const addresses = await Address.findAll({
        where: { 
            customer_id: customerId
        }
    });
    

    return res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

module.exports = router;