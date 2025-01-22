const { body } = require('express-validator');
const { Orderitems, Product, Status} = require('../models');

const orderValidation = () => {
    return [
        body('order_date')
            .notEmpty().withMessage('Bestelldatum muss vorhanden sein'),

        body('status_id')
            .notEmpty().withMessage('Status muss gesetzt sein').bail()
            .custom(async (status_id) => {
                existingStatus = await Status.findOne({
                    where: {
                        id: status_id
                    }
                })
                if (!existingStatus) {
                    throw new Error("Status ist nicht vorhanden");
                }
            }),

        body('delivery_date')
            .custom((value) => {
                if (new Date(value) < new Date()) {
                    throw new Error('Lieferdatum muss in der Zukunft liegen');
                }
                return true;
            }),
        body('order_date')
            .notEmpty().withMessage('Lieferdatum muss vorhanden sein'),

        body('total_price_float')
            .notEmpty().withMessage('Der Gesamtbetrag muss vorhanden sein')
            .isFloat({ min: 0 }).withMessage('Der Gesamtbetrag darf nicht negativ sein'),

        body('orderitems')
            .isArray({ min: 1 }).withMessage('Die Bestellung muss Artikel beinhalten')
            .custom(async (items, { req }) => {
                for (const item of items) {

                    if (item.id) {
                        if (req.body.id != item.order_id) {
                            throw new Error("Bestellungsid der Bestellposition stimmt nicht mit der ID der Bestellung überein");
                        }
                    }

                    if (!item.price) {
                        throw new Error(`Preis für die Position mit der SKU ${item.product.sku} muss vorhanden sein`);
                    }

                    if (!item.quantity || item.quantity <= 0) {
                        throw new Error(`Anzahl der Position mit der SKU ${item.product.sku} muss größer als 0 sein`);
                    }


                    const product = await Product.findByPk(item.product_id);
                    if (!product) {
                        throw new Error(`Das Produkt mit der SKU ${item.product.sku} existiert nicht`);
                    }

                    if (!item.id) {
                        // Prüfen, ob die Menge den Bestand überschreitet
                        if (item.quantity > product.quantity) {
                            throw new Error(`Die Position mit der SKU ${item.product.sku} überschreitet den Bestand`);
                        }
                    } else {
                        // Prüfen, ob die neue Menge den Bestand überschreitet
                        const orderitem = await Orderitems.findByPk(item.id);
                        if (!orderitem) {
                            throw new Error(`Die Bestellposition mit ID ${item.id} existiert nicht`);
                        }

                        const difference = item.quantity - orderitem.quantity;
                        const newProductQuantity = product.quantity - difference;
                        if (newProductQuantity < 0) {
                            throw new Error(`Die Position mit der SKU ${product.sku} überschreitet den Bestand.`);
                        }
                    }
                }
                return true;
            }),

        body('street')
            .notEmpty().withMessage('Adresse muss vorhanden sein')
            .isString().withMessage('Adresse muss vorhanden sein'),
        body('city')
            .notEmpty().withMessage('Adresse muss vorhanden sein')
            .isString().withMessage('Adresse muss vorhanden sein'),
        body('postalCode')
            .notEmpty().withMessage('Adresse muss vorhanden sein')
            .isString().withMessage('Adresse muss vorhanden sein'),
        body('customer_id')
            .notEmpty().withMessage("Bestellung muss einen Kunden enthalten"),
    ];
};

module.exports = orderValidation;