const router = require("express").Router();
const validate = require("../middlewares/validate");
const isAuthenticated = require("../middlewares/authentification");
const customerValidation = require("../validations/customerValidation")
const { Customer, Order, Status, Address } = require('../models');
const bcrypt = require("bcrypt");
const {
  Op,
  Sequelize
} = require("sequelize");
const { backendSession, frontendSession } = require("../sessions/session");

module.exports = router;

// returns all customers
router.get('/', backendSession, async (req, res) => {
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
router.get('/:id', backendSession, isAuthenticated, async (req, res) => {
  try {
    console.log("test backendsession");
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

// returns a specific customer  
router.get('/frontend/me', frontendSession, isAuthenticated, async (req, res) => {
  try {
    console.log("test");
    const customerId = req.session.customer.id;
    console.log(customerId);

    const customer = await Customer.findByPk(customerId, {
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Address,
          as: 'addresses',
        }
      ]
    });

    if (!customer) {
      return res.status(404).json({
        message: 'Kein Kundenkonto gefunden'
      });
    }


    res.status(200).json(customer);

  } catch (error) {
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// updates a customer  
router.put('/:id', backendSession, isAuthenticated, customerValidation(), validate, async (req, res) => {
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

//updates the password of a customer 
router.post('/:id/password', backendSession, isAuthenticated, async (req, res) => {
  try {

    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password muss gesetzt sein' });
    }
    const customer = await Customer.findOne({ where: { id } });
    if (!customer) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const [updated] = await Customer.update(
      { password: hashedPassword },
      { where: { id } }
    );

    if (updated) {
      return res.status(200).json({ message: 'Passwort wurde erfolgreich aktualisiert' });
    } else {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
  }
});

// creates a customer  
router.post('/', backendSession, isAuthenticated, customerValidation(), validate, async (req, res) => {
  try {
    const customer = req.body;

    const hashedPassword = await bcrypt.hash(customer.password, 10);
    customer.password = hashedPassword;

    const newCustomer = await Customer.create(customer);
    if (newCustomer) {
      return res.status(200).json({ message: 'Kunde wurde erfolgreich angelegt', customer: newCustomer });
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

// login for a customer
router.post('/login', frontendSession, async (req, res) => {
  const { email, password } = req.body;
  const existingCustomer = await Customer.findOne({ where: { email } });
  console.log(existingCustomer);
  if (!existingCustomer) {
    console.log("Ungültige Anmeldedaten");
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }

  const isPasswordValid = await bcrypt.compare(password, existingCustomer.password);

  if (isPasswordValid) {
    req.session.customer = {
      id: existingCustomer.id,
      email: existingCustomer.email,
      firstname: existingCustomer.firstname,
      lastname: existingCustomer.lastname,
    };



    return res.status(200).json({ message: "Login erfolgreich", customer: req.session.customer });
  }
  else {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }
});

// authentication for a customer
router.get('/auth/refresh', frontendSession, (req, res) => {
  if (req.session.customer) {
    res.status(200).json({ customer: req.session.customer });
  } else {
    console.log(+ " falsch");
    res.status(401).json({ message: "Nicht authentifiziert" });
  }
});

// logout for a customer
router.delete('/logout', frontendSession, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Fehler beim Zerstören der Session:', err);
      return res.status(500).json({ message: 'Logout fehlgeschlagen' });
    }

    res.clearCookie('FSID');
    return res.status(200).json({ message: 'Logout erfolgreich' });
  });

});

// register for a customer
router.post('/register', frontendSession, async (req, res) => {
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

// returns all orders from a customer
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



