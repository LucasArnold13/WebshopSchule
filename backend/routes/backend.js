const express = require("express");
const router = express.Router();
const { Customer, Order, Orderitems, Status } = require('../models');



router.get('/orders', async (req, res) => {
  try {
    const customerOrders = await Order.findAll({
      include: [
        {
          model: Orderitems, 
          as: 'orderitems', 
        },
        {
          model: Status, 
          as: 'status', 
        },
        {
          model: Customer, 
          as: 'customer', 
          attributes: { exclude: ['password'] }, // für die Sicherheit
        },
      ],
    });

    return res.json(customerOrders); 
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});



router.get('/order/:id', async (req, res) => {
    try {
      const orderId = req.params.id; 
      const customerOrders = await Order.findAll({
        where: {id :  orderId }, 
        include: [
          {
            model: Orderitems, 
            as: 'orderitems', 
          },
          {
            model: Status, 
            as: 'status', 
          },
          {
            model: Customer, 
            as: 'customer', 
            attributes: { exclude: ['password'] }, // für die Sicherheit
          },
        ],
      });
  
      return res.json(customerOrders); 
    } catch (error) {
      console.error('Fehler beim Abrufen der Bestellungen:', error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  });

  
module.exports = router;