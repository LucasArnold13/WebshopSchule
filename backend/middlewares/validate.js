const { validationResult } = require('express-validator');

const validate = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message : errors.array()[0].msg
        });
    }
    next(); 
};

module.exports = validate;
