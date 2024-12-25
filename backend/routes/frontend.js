const express = require("express");
const router = express.Router();
const { Customer, Order, Orderitems, Status } = require('../models');
const bcrypt = require('bcrypt');
const session = require('express-session');

const frontendSession = session({
    name: "FSID", // Eindeutiger Name für Kunden-Session
    secret: "geheimes_passwort",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 Stunde
  });

  

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
