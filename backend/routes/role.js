const router = require("express").Router();
const { Role } = require('../models');

// returns all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.findAll({
    });

    return res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

module.exports = router;