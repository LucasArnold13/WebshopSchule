const router = require("express").Router();
const validate = require("../middlewares/validate");
const orderValidation = require("../validations/orderValidation");
const {
  Order,
  Orderitems,
  Product,
  Status,
  Customer,
  Address,
} = require('../models');

const { backendSession, frontendSession } = require("../sessions/session");
const { where } = require("sequelize");
const isAuthenticated = require("../middlewares/authentification");

// returns all orders
router.get('/', async (req, res) => {
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

// returns all orders from a specific customer
router.get('/customer', frontendSession, async (req, res) => {
  try {

    const customerId = req.session.customer.id;

    const orders = await Order.findAll({
      include: [
        {
          model: Orderitems,
          as: 'orderitems',
        },
        {
          model: Status,
          as: 'status',
        }
      ],
      where: {
        customer_id: customerId
      },
      order: [['order_date', 'DESC']]
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// returns a specific order
router.get('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const customerOrder = await Order.findOne({
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
        },
      ],
    });

    if (!customerOrder) {
      return res.status(404).json({
        message: `Bestellung konnte nicht gefunden werden`,
      });
    }

    return res.status(200).json(customerOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// returns a specific order for the customer
router.get('/:id/frontend', frontendSession, isAuthenticated, async (req, res) => {
  try {
    const orderId = req.params.id;
    const customerOrder = await Order.findOne({
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
      ],
    });

    if (customerOrder.customer_id !== req.session.customer.id) {
      return res.status(401).json({ message: 'Zugriff auf Bestellung nicht autorisiert' });
    }

    if (!customerOrder) {
      return res.status(404).json({
        message: `Kategorie konnte nicht gefunden werden`,
      });
    }

    return res.status(200).json(customerOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});


// returns a specific order for edit
router.get('/:id/edit', async (req, res) => {
  try {
    const orderId = req.params.id;
    const dbOrder = await Order.findOne({
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

    if (dbOrder.status_id !== 1) {
      return res.status(403).json({ message: 'Bestellung kann nicht mehr bearbeitet werden.' });
    }

    return res.json(dbOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// creates a new order
router.post('/', orderValidation(), validate, async (req, res) => {
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

// updates an order
router.put('/:id', orderValidation(), validate, async (req, res) => {
  try {
    const order = req.body;
    const orderID = req.params.id;

    if (isNaN(orderID)) {
      return res.status(400).json({ message: 'Ungültige Bestellungs-ID.' });
    }

    const existingOrderItems = await Orderitems.findAll({
      where: {
        order_id: orderID
      }
    })

    if (order.status_id == 3) {
      for (const item of existingOrderItems) {
        const product = await Product.findByPk(item.product_id);
        product.quantity += item.quantity;
        await product.save();
        const updatedOrder = await Order.update(order,
          { where: { id: orderID } }
        );

        if (updatedOrder == 0) {
          return res.status(404).json({ message: 'Bestellung mit der ID wurde nicht gefunden' });
        }
        else {
          return res.status(200).json({ message: 'Bestellung wurde erfolgreich aktualisiert' });
        }

      }
    }

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

// alles noch in einer transaktion packen

module.exports = router;