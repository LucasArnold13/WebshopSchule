const express = require("express");
const router = express.Router();
const { Customer, Order, Orderitems, Status, User } = require('../models');
const bcrypt = require("bcrypt");
const { router, frontendSession } = require("./frontend");

const backendSession = session({
  name: "BSID", 
  secret: "geheimes_passwort",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }, 
});


router.post('/login', backendSession, async (req, res) => {
    const { name, password } = req.body;
    const existingUser = await User.findOne({ where: { name } });

    if (!existingUser) {
        return res.status(401).json({ message: "Ungültige Anmeldedaten" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
        req.session.user = {
            id: existingUser.id,
            email: existingUser.name
        };



        return res.status(200).json({ message: "Login erfolgreich", user: req.session.user });
    }
    else {
        return res.status(401).json({ message: "Ungültige Anmeldedaten" });
    }
});




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