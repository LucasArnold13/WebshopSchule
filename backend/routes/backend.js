const express = require("express");
const router = express.Router();
const session = require('express-session');
const { Customer, Order, Orderitems, Status, User, Product, Role, Category } = require('../models');
const bcrypt = require("bcrypt");

const backendSession = session({
  name: "BSID",
  secret: "geheimes_passwort",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 },
});


router.post('/login', backendSession, async (req, res) => {
  console.log("test");
  const { name, password } = req.body;
  const existingUser = await User.findOne({ where: { name } });

  if (!existingUser) {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (isPasswordValid) {
    req.session.user = {
      id: existingUser.id,
      name: existingUser.name
    };



    return res.status(200).json({ message: "Login erfolgreich", user: req.session.user });
  }
  else {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }
});

router.get('/auth', backendSession, (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    console.log(req.session.user + " richtig");
    res.status(200).json({ isAuthenticated: true, user: req.session.user });
  } else {
    console.log(req.session.user + " falsch");
    res.status(401).json({ isAuthenticated: false });
  }
});



//#region orders

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
      where: { id: orderId },
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
//#endregion


//#region customers

router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: { exclude: ['password'] }, // für die Sicherheit
    });

    return res.status(200).json(customers);
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

router.get('/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findOne({
      where: { id: customerId },
      attributes: { exclude: ['password'] }, // für die Sicherheit
      include: [
        {
          model: Order,
          as: 'orders',
        },
      ],
    });

    if (!customer) {
      return res.status(404).json({ message: 'Kunde nicht gefunden.' });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

router.put('/customers/:id', async (req, res) => {
  try {

    const  customer  = req.body;
    console.log(customer);
    console.log(req.params.id);
    const updatedtCustomer = await Customer.update(customer,
      { where: { id: req.params.id } }
    );
    console.log(updatedtCustomer);
    if (updatedtCustomer == 0) {
      return res.status(400).json({ message: 'Kunde konnte nicht aktualisiert werden.' });
    }
    else {
      return res.status(200).json({ message: 'Kunde wurde erfolgreich aktualisiert.' });
    }


  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

//#endregion


//#region products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
    });

    return res.json(products);
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

//#endregion


//#region users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // für die Sicherheit
      include: [
        {
          model: Role,
          as: 'role',
        },
      ],
    });

    return res.json(users);
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});
//#endregion


//#region categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({
    });

    return res.json(categories);
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});
//#endregion



module.exports = router;