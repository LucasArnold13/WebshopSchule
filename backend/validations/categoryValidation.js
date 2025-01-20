const { body } = require('express-validator');

const categoryValidation = () => {
    return [
        body('name')
            .notEmpty().withMessage('Name der Kategorie muss gesetzt sein'),
        body('description')
            .notEmpty().withMessage('Beschreibung der Kategorie muss gesetzt sein'),


    ];
};

module.exports = categoryValidation;