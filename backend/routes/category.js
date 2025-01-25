const router = require("express").Router();
const validate = require("../middlewares/validate");
const isAuthenticated = require("../middlewares/authentification");
const categoryValidation = require("../validations/categoryValidation");
const { Category, Product } = require('../models');
const { backendSession } = require("../sessions/session");


// returns all categories
router.get('/',backendSession, async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// returns a specific category
router.get('/:id',backendSession, isAuthenticated, async (req, res) => {
  try {
    const categoryID = req.params.id;

    if (isNaN(categoryID)) {
      return res.status(400).json({ message: 'Ungültige Kategorie-ID.' });
    }

    const category = await Category.findOne({
      where: { id: categoryID },
      include: [
        {
          model: Product,
          as: 'products',
        },
      ],
    });

    if (!category) {
      return res.status(404).json({
        message: `Kategorie konnte nicht gefunden werden`,
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});


router.get('/name/:categoryName', async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    const category = await Category.findOne({
      where: { name: categoryName },
      include: [
        {
          model: Product,
          as: 'products',
        },
      ],
    });

    if (!category) {
      return res.status(404).json({
        message: `Kategorie konnte nicht gefunden werden`,
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// creates a new category
router.post('/',backendSession, isAuthenticated, categoryValidation(), validate, async (req, res) => {
  try {
    const category = req.body;
    console.log(category);
    const newCategory = await Category.create(category);

    if (newCategory) {
      return res.status(201).json({ message: 'Kategorie wurde erfolgreich angelegt', category: newCategory });
    }
    else {
      return res.status(400).json({ message: 'Fehler bei Erstellung der Kategorie' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// updates a category
router.put('/:id',backendSession, isAuthenticated, categoryValidation(), validate, async (req, res) => {
  try {

    const category = req.body;
    const categoryID = req.params.id;

    if (isNaN(categoryID)) {
      return res.status(400).json({ message: 'Ungültige Kategorie-ID.' });
    }

    const updateCategory = await Category.update(category,
      { where: { id: categoryID } }
    );

    if (updateCategory == 0) {
      return res.status(404).json({ message: 'Kategorie mit der ID wurde nicht gefunden ' });
    }
    else {
      return res.status(200).json({ message: 'Kategorie wurde erfolgreich aktualisiert.' });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

module.exports = router;
