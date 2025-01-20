const express = require("express");
const router = express.Router();
const session = require('express-session');
const { Address, Customer, Order, Orderitems, Status, User, Product, Role, Category } = require('../models');
const bcrypt = require("bcrypt");

const dayjs = require('dayjs');
const { Op, Sequelize } = require("sequelize");
const { getAllOrdersData, getTodaysRevenue, getNewCustomersFromThisMonth, getOrderChartData } = require("../services/DashboardService");
const { storeImage } = require("../services/test");

const orderValidation = require("../validations/orderValidation");
const productValidation = require("../validations/productValidation")
const categoryValidation = require("../validations/categoryValidation");
const customerValidation = require("../validations/customerValidation")
const userValidation = require("../validations/userValidation");
const validate = require("../middlewares/validate");

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



//#region Dashboard 


//#endregion
router.get('/dashboard', async (req, res) => {
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

//#region orders

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({
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
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

router.post('/orders', orderValidation(), validate, async (req, res) => {
  try {
    const order = req.body;

    const newOrder = await Order.create(order);

    for (const item of order.orderitems) {
      const product = await Product.findByPk(item.product_id);
      await product.update({ quantity: product.quantity - item.quantity });
      item.order_id = newOrder.id;
      Orderitems.create(item);
    }

    if (newOrder) {
      return res.status(201).json({ message: 'Bestellung wurde erfolgreich angelegt', order: newOrder });
    }
    else {
      return res.status(400).json({ message: 'Fehler bei Erstellung der Bestellung' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// alles noch in einer transaktion packen
router.put('/orders/:id', orderValidation(), validate, async (req, res) => {
  try {
    const order = req.body;
    const orderID = req.params.id;

    if (isNaN(orderID)) {
      return res.status(400).json({ message: 'Ungültige Bestellungs-ID.' });
    }

    const existingOrderItems = await Orderitems.findAll({
      where: {
        order_id : orderID
      }
    })

    const updatedOrderItemIds = order.orderitems.map((item) => item.id).filter((id) => id);

    const itemsToDelete = existingOrderItems.filter(
      (dbItem) => !updatedOrderItemIds.includes(dbItem.id)
    );

    for (const item of itemsToDelete) {
      const product = await Product.findByPk(item.product_id);

      // Menge zurücksetzen
      product.quantity += item.quantity;
      await product.save();

      // Position löschen
      await Orderitems.destroy({ where: { id: item.id } });
    }

    for (const item of order.orderitems) {
      const product = await Product.findByPk(item.product_id);
      if (item.id) {
        const orderitem = await Orderitems.findByPk(item.id);
        const difference = item.quantity - orderitem.quantity;
        product.quantity = product.quantity - difference;


        await Orderitems.update(
          { price: item.price, quantity: item.quantity },
          { where: { id: item.id } }
        );

        await product.save();


      } else {
        await product.update({ quantity: product.quantity - item.quantity });
        await Orderitems.create(item);
      }
    }

    const updatedOrder = await Order.update(order,
      { where: { id: orderID } }
    );


    if (updatedOrder == 0) {
      return res.status(404).json({ message: 'Bestellung mit der ID wurde nicht gefunden' });
    }
    else {
      return res.status(200).json({ message: 'Bestellung wurde erfolgreich aktualisiert' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const customerOrders = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: Orderitems,
          as: 'orderitems',
          include: [
            {
              model: Product,
              as: 'product',
            },
          ],
        },
        {
          model: Status,
          as: 'status',
        },
        {
          model: Customer,
          as: 'customer',
          attributes: { exclude: ['password'] },
          include: [
            {
              model: Address,
              as: 'addresses',
            },
          ],
        },
      ],
    });

    return res.json(customerOrders);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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

router.put('/customers/:id',customerValidation(),validate, async (req, res) => {
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

router.post('/customers',customerValidation(),validate, async (req, res) => {
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

router.get('/customers/search/query', async (req, res) => {
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

//#endregion


//#region products

// returns all products
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

router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({
      where: { id: productId }
    });

    return res.json(product);
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

router.post('/products',productValidation(), validate,  async (req, res) => {
  try {
    const product = req.body;
    const fileName = await storeImage(product.image)
    delete product.image;
    product.image_url = `http://localhost:3000/images/${fileName}`;

    product.is_active = true;

    const newProduct = await Product.create(product);

    if (newProduct) {
      return res.status(201).json({ message: 'Produkt wurde erfolgreich angelegt', product: newProduct });
    }
    else {
      return res.status(400).json({ message: 'Fehler bei Erstellung des Produktes' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});


router.get('/products/search/query', async (req, res) => {
  const searchQuery = req.query.q;

  if (!searchQuery) {
    return res.status(400).json({ message: 'Suchbegriff erforderlich' });
  }

  try {
    const whereClause = [];

    if (!isNaN(searchQuery)) {
      console.log(searchQuery);

      whereClause.push(
        { id: searchQuery }, // Exakte Übereinstimmung für ID
        Sequelize.where(
          Sequelize.cast(Sequelize.col("sku"), "TEXT"), // SKU in Text umwandeln
          { [Op.like]: `%${searchQuery}%` } // Teilstring-Suche
        )
      );
    } else {
      // Suche nach Name (case-insensitive)
      whereClause.push(
        { name: { [Op.iLike]: `%${searchQuery}%` } } // Name durchsuchen
      );
    }


    // Kombinierte Abfrage für alle Bedingungen
    const products = await Product.findAll({
      where: {
        [Op.or]: whereClause,
      },
    });

    if (products.length === 0) {
      return res.status(404).json([]);
    }
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

router.put('/products/:id',productValidation(), validate, async (req, res) => {
  try {

    const product = req.body;
    const productId = req.params.id;

    if (isNaN(productId)) {
      return res.status(400).json({ message: 'Ungültige Produkt-ID.' });
    }

    if (product.image) {
      const fileName = await storeImage(product.image)
      delete product.image;
      product.image_url = `http://localhost:3000/images/${fileName}`;
    }

    const updatetProduct = await Product.update(product,
      { where: { id: productId } }
    );

    if (updatetProduct == 0) {
      return res.status(404).json({ message: 'Produkt mit der ID wurde nicht gefunden ' });
    }
    else {
      return res.status(200).json({ message: 'Produkt wurde erfolgreich aktualisiert.' });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});
//#endregion


//#region users

// returns all users
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
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// returns an specific user
router.get('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;

    if (isNaN(userID)) {
      return res.status(400).json({ message: 'Ungültige Benutzer-ID.' });
    }

    const user = await User.findOne({
      where: { id: userID },
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({
        message: `Benutzer konnte nicht gefunden werden`,
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// updates a user
router.put('/users/:id',userValidation(), validate, async (req, res) => {
  try {

    const user = req.body;
    const userID = req.params.id;

    if (isNaN(userID)) {
      return res.status(400).json({ message: 'Ungültige Benutzer-ID.' });
    }

    const updatetUser = await User.update(user,
      { where: { id: userID } }
    );

    if (updatetUser == 0) {
      return res.status(404).json({ message: 'Benutzer mit der ID wurde nicht gefunden ' });
    }
    else {
      return res.status(200).json({ message: 'Benutzer wurde erfolgreich aktualisiert.' });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// creates a user
router.post('/users',userValidation(), validate,  async (req, res) => {
  try {
    const user = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    const newUser = await User.create(user);

    if (newUser) {
      return res.status(201).json({ message: 'User wurde erfolgreich angelegt', user: newUser });
    }
    else {
      return res.status(400).json({ message: 'Fehler bei Erstellung des Users' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
  }
});


//#endregion


//#region Roles

// returns all roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.findAll({
    });

    return res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});
//#endregion


//#region categories

// returns all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// returns a specific category
router.get('/categories/:id', async (req, res) => {
  try {
    const categoryID = req.params.id;

    if (isNaN(categoryID)) {
      return res.status(400).json({ message: 'Ungültige Kategorie-ID.' });
    }

    const category = await Category.findOne({
      where: { id: categoryID },
      include: [
        {
          model: Product,
          as: 'products',
        },
      ],
    });

    if (!category) {
      return res.status(404).json({
        message: `Kategorie konnte nicht gefunden werden`,
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});


router.post('/categories',categoryValidation(), validate, async (req, res) => {
  try {
    const category = req.body;
    console.log(category);
    const newCategory = await Category.create(category);

    if (newCategory) {
      return res.status(201).json({ message: 'Kategorie wurde erfolgreich angelegt', category: newCategory });
    }
    else {
      return res.status(400).json({ message: 'Fehler bei Erstellung der Kategorie' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

router.put('/categories/:id',categoryValidation(), validate, async (req, res) => {
  try {

    const category = req.body;
    const categoryID = req.params.id;

    if (isNaN(categoryID)) {
      return res.status(400).json({ message: 'Ungültige Kategorie-ID.' });
    }

    const updateCategory = await Category.update(category,
      { where: { id: categoryID } }
    );

    if (updateCategory == 0) {
      return res.status(404).json({ message: 'Kategorie mit der ID wurde nicht gefunden ' });
    }
    else {
      return res.status(200).json({ message: 'Kategorie wurde erfolgreich aktualisiert.' });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

//#endregion

//#region status
router.get('/status', async (req, res) => {
  try {
    const status = await Status.findAll();

    return res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

//#endregion

module.exports = router;