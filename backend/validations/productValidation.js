const { body } = require('express-validator');
const { Orderitems, Product, Category } = require('../models');

const productValidation = () => {
    return [
        body('name')
            .notEmpty().withMessage('Produktname muss gesetzt sein'),
        body('sku')
            .notEmpty().withMessage('Die SKU muss gesetzt sein')
            .isNumeric().withMessage('Die SKU muss eine Zahl sein')
            .custom(async (sku, { req }) => {
                existingProduct = await Product.findOne({
                    where: {
                        sku: sku
                    }
                })
                if (existingProduct && existingProduct.id !== req.body.id) {
                    throw new Error("SKU wird schon benutzt");
                }
            }),  
        body('price')
            .notEmpty().withMessage('Der Preis muss gesetzt sein')
            .isFloat({ min: 0.01 }).withMessage('Der Preis muss größer als 0 sein'),
        body('quantity')
            .notEmpty().withMessage('Die Menge muss gesetzt sein')
            .isNumeric().withMessage('Die Menge muss eine Zahl sein'),
        body('category_id')
            .notEmpty().withMessage('Die Kategorie muss gesetzt sein für das Produkt').bail()
            .custom(async (category_id) => {
                existingCategory = await Category.findOne({
                    where: {
                        id: category_id
                    }
                })
                if (!existingCategory) {
                    throw new Error("Kategorie ist nicht vorhanden");
                }
            }),



    ];
};

module.exports = productValidation;