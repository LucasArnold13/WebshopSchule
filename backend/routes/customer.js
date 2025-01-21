const router = require("express").Router();
const validate = require("../middlewares/validate");
const isAuthenticated = require("../middlewares/authentification");
const customerValidation = require("../validations/customerValidation")
const { Customer, Order, Status, Address } = require('../models');
const {
  Op,
  Sequelize
} = require("sequelize");

// returns all customers
router.get('/', async (req, res) => {
    try {
      const customers = await Customer.findAll({
        attributes: { exclude: ['password'] }, // für die Sicherheit
      });
  
      return res.status(200).json(customers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  });

// returns a specific customer  
router.get('/:id', async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = await Customer.findOne({
        where: { id: customerId },
        attributes: { exclude: ['password'] }, // für die Sicherheit
        include: [
          {
            model: Order,
            as: 'orders',
            include: [
              {
                model: Status,
                as: 'status',
              },
            ],
          },
          {
            model: Address,
            as: 'addresses',
          },
        ],
      });
  
      if (!customer) {
        return res.status(404).json({ message: 'Kunde nicht gefunden.' });
      }
  
      return res.status(200).json(customer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  });
 
// updates a customer  
router.put('/:id',customerValidation(),validate, async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = req.body;
  
      const updatedCustomer = await Customer.update(customer, {
        where: { id: customerId },
      });
  
      if (updatedCustomer == 0) {
        return res.status(400).json({ message: 'Kunde konnte nicht aktualisiert werden.' });
      }
  
      if (customer.addresses && Array.isArray(customer.addresses)) {
        for (const address of customer.addresses) {
          if (address.id) {
            await Address.update(address, {
              where: { id: address.id, customer_id: customerId },
            });
          } else {
            await Address.create({ ...address, customer_id: customerId });
          }
        }
      }
  
      return res.status(200).json({ message: 'Kunde und Adressen wurden erfolgreich aktualisiert.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  });

// creates a customer  
router.post('/',customerValidation(),validate, async (req, res) => {
    try {
      const customer = req.body;
      customer.password = "test";
  
      const newCustomer = await Customer.create(customer);
  
      if (newCustomer) {
        return res.status(200).json({ message: 'Kunde wurde erfolgreich angelegt', customer : newCustomer });
      }
      else {
        console.log(newUser);
        return res.status(400).json({ message: 'Fehler bei Erstellung des Kunden' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  });

// serach for a customer
router.get('/search/query', async (req, res) => {
    const searchQuery = req.query.q;
  
    if (!searchQuery) {
      return res.status(400).json({ message: 'Suchbegriff erforderlich' });
    }
  
    try {
      const whereClause = [];
  
      if (!isNaN(searchQuery)) {
  
        whereClause.push(
          { id: searchQuery }, // Exakte Übereinstimmung für ID
        );
      } else {
        // Suche nach Name (case-insensitive)
        whereClause.push({
          [Op.or]: [
            { firstname: { [Op.iLike]: `%${searchQuery}%` } },  // Vorname durchsuchen
            { lastname: { [Op.iLike]: `%${searchQuery}%` } },   // Nachname durchsuchen
            { email: { [Op.iLike]: `%${searchQuery}%` } }       // E-Mail durchsuchen
          ]
        });
      }
  
  
      // Kombinierte Abfrage für alle Bedingungen
      const customers = await Customer.findAll({
        where: {
          [Op.or]: whereClause,
        },
      });
  
      if (customers.length === 0) {
        return res.status(404).json([]);
      }
      console.log(customers);
      res.status(200).json(customers);
    } catch (error) {
      console.error('Fehler beim Abrufen der Kunden:', error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  });

module.exports = router;


/*
const express = require("express");
const router = express.Router();
exports.router = router;
const { Customer, Order, Orderitems, Status } = require('../models');
const bcrypt = require('bcrypt');




  

router.post('/login',frontendSession, async (req, res) => {
    const { email, password } = req.body;
    const existingCustomer = await Customer.findOne({ where: { email } });

    if (!existingCustomer) {
        return res.status(401).json({ message: "Ungültige Anmeldedaten" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingCustomer.password);

    if (isPasswordValid) {
        req.session.user = {
            id: existingCustomer.id,
            email: existingCustomer.email,
            firstname: existingCustomer.firstname,
            lastname: existingCustomer.lastname,
        };



        return res.status(200).json({ message: "Login erfolgreich", user: req.session.user });
    }
    else {
        return res.status(401).json({ message: "Ungültige Anmeldedaten" });
    }
});

router.post('/register',frontendSession,  async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich!' });
    }

    const existingCostumer = await Customer.findOne({ where: { email } });

    if (existingCostumer) {
        return res.status(400).json({ message: 'E-Mail wird bereits verwendet!' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newCustomer = new Customer({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await newCustomer.save();


        req.session.user = {
            id: newCustomer.id,
            email: newCustomer.email,
            firstname: newCustomer.firstname,
            lastname: newCustomer.lastname,
        };


        res.status(201).json({
            message: 'Benutzer erfolgreich registriert!',
            user: req.session.user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ein Fehler ist aufgetreten!' });
    }
});

router.get('/auth',frontendSession,  (req, res) => {
    console.log(req.session);
    if (req.session.user) {
        console.log(req.session.user + " richtig");
        res.status(200).json({ isAuthenticated: true, user: req.session.user });
    } else {
        console.log(req.session.user + " falsch");
        res.status(401).json({ isAuthenticated: false });
    }
});

router.delete('/logout',frontendSession, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Fehler beim Zerstören der Session:', err);
            return res.status(500).json({ message: 'Logout fehlgeschlagen' });
        }

        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Logout erfolgreich' });
    });

});

router.get('/customer/:id/orders', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customerOrders = await Order.findAll({
            where: { customer_id: customerId },
            include: [
                {
                    model: Orderitems,
                    as: 'orderitems',
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
*/