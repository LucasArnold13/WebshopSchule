const { body } = require('express-validator');
const { Customer } = require('../models');

const customerValidation = () => {
    return [
        body('firstname')
            .notEmpty().withMessage('Vorname muss gesetzt sein'),
        body('lastname')
            .notEmpty().withMessage('Nachname muss gesetzt sein'),
        body('email')
            .notEmpty().withMessage('E-Mail-Adresse muss gesetzt sein')
            .isEmail().withMessage('E-Mail-Adresse ist ungültig')
            .custom(async (email) => {
                existingCustomer = await Customer.findOne({
                    where: {
                        email: email
                    }
                })
                console.log("test");
                console.log(existingCustomer);
                if (existingCustomer) {
                    throw new Error("E-Mail-Adresse wurde bereits benutzt");
                }
            }),
            body('is_active')
                .notEmpty().withMessage('Das Feld "is_active" darf nicht leer sein')
                .isBoolean().withMessage('Das Feld "is_active" muss true oder false sein'),
            body('addresses')
                .optional() 
                .custom((items) => {
                    for (const item of items) {
                        if (typeof item.street !== 'string' || item.street.trim() === '') {
                            throw new Error(`Die Straße muss gesetzt sein`);
                        }
                        if (typeof item.city !== 'string' || item.city.trim() === '') {
                            throw new Error(`Die Stadt muss gesetzt sein `);
                        }
                        if (typeof item.state !== 'string' || item.state.trim() === '') {
                            throw new Error("Der Staat muss gesetzt sein");
                        }
                        if (typeof item.postalCode !== 'string' || item.postalCode.trim() === '') {
                            throw new Error(`Die Postleitzahl muss gesetzt sein`);
                        }
                        if (typeof item.country !== 'string' || item.country.trim() === '') {
                            throw new Error(`Das Land muss gesetzt sein`);
                        }
                    }
                    return true; 
                }),



    ];
};

module.exports = customerValidation;