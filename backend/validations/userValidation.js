const { body } = require('express-validator');
const { Role, User } = require('../models');

const userValidation = () => {
    return [
        body('name')
            .notEmpty().withMessage('username muss gesetzt sein'),
        body('email')
            .notEmpty().withMessage('E-Mail-Adresse muss gesetzt sein')
            .isEmail().withMessage('E-Mail-Adresse ist ungültig')
            .custom(async (email) => {
                existingUser = await User.findOne({
                    where: {
                        email: email
                    }
                })
                if (existingUser) {
                    throw new Error("E-Mail-Adresse wurde bereits benutzt");
                }
            }),
        body('password')
            .notEmpty().withMessage('Password muss gesetzt sein'),
        body('role_id')
            .notEmpty().withMessage('Die Rolle muss gesetzt sein für den Nutzer').bail()
            .custom(async (role_id) => {
                existingRole = await Role.findOne({
                    where: {
                        id: role_id
                    }
                })
                if (!existingRole) {
                    throw new Error("Rolle ist nicht vorhanden");
                }
            }),



    ];
};

module.exports = userValidation;