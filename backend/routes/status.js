const router = require("express").Router();
const { Status } = require('../models');

// returns all status
router.get('/', async (req, res) => {
    try {
      const status = await Status.findAll();
  
      return res.status(200).json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  });

module.exports = router;