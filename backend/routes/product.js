const router = require("express").Router();
const validate = require("../middlewares/validate");
const productValidation = require("../validations/productValidation")
const { storeImage } = require("../services/ImageService");
const { Product } = require('../models');
const {
    Op,
    Sequelize
  } = require("sequelize");

// returns all products
router.get('/', async (req, res) => {
    try {
      const products = await Product.findAll({
      });
  
      return res.json(products);
    } catch (error) {
      console.error('Fehler beim Abrufen der Bestellungen:', error);
      res.status(500).json({ message: 'Interner Serverfehler.' });
    }
  });

// returns a specific product
router.get('/:id', async (req, res) => {
try {
    const productId = req.params.id;
    const product = await Product.findOne({
    where: { id: productId }
    });

    return res.json(product);
} catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
}
});

// creates a new product
router.post('/',productValidation(), validate,  async (req, res) => {
try {
    const product = req.body;
    const fileName = await storeImage(product.image)
    delete product.image;
    product.image_url = `http://localhost:3000/images/${fileName}`;

    product.is_active = true;

    const newProduct = await Product.create(product);

    if (newProduct) {
    return res.status(201).json({ message: 'Produkt wurde erfolgreich angelegt', product: newProduct });
    }
    else {
    return res.status(400).json({ message: 'Fehler bei Erstellung des Produktes' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
}
});
  
// search for a product
router.get('/search/query', async (req, res) => {
const searchQuery = req.query.q;

if (!searchQuery) {
    return res.status(400).json({ message: 'Suchbegriff erforderlich' });
}

try {
    const whereClause = [];

    if (!isNaN(searchQuery)) {
    console.log(searchQuery);

    whereClause.push(
        { id: searchQuery }, // Exakte Übereinstimmung für ID
        Sequelize.where(
        Sequelize.cast(Sequelize.col("sku"), "TEXT"), // SKU in Text umwandeln
        { [Op.like]: `%${searchQuery}%` } // Teilstring-Suche
        )
    );
    } else {
    // Suche nach Name (case-insensitive)
    whereClause.push(
        { name: { [Op.iLike]: `%${searchQuery}%` } } // Name durchsuchen
    );
    }


    // Kombinierte Abfrage für alle Bedingungen
    const products = await Product.findAll({
    where: {
        [Op.or]: whereClause,
    },
    });

    if (products.length === 0) {
    return res.status(404).json([]);
    }
    console.log(products);
    res.status(200).json(products);
} catch (error) {
    console.error('Fehler beim Abrufen der Bestellungen:', error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
}
});

// updates a product
router.put('/:id',productValidation(), validate, async (req, res) => {
try {

    const product = req.body;
    const productId = req.params.id;

    if (isNaN(productId)) {
    return res.status(400).json({ message: 'Ungültige Produkt-ID.' });
    }

    if (product.image) {
    const fileName = await storeImage(product.image)
    delete product.image;
    product.image_url = `http://localhost:3000/images/${fileName}`;
    }

    const updatetProduct = await Product.update(product,
    { where: { id: productId } }
    );

    if (updatetProduct == 0) {
    return res.status(404).json({ message: 'Produkt mit der ID wurde nicht gefunden ' });
    }
    else {
    return res.status(200).json({ message: 'Produkt wurde erfolgreich aktualisiert.' });
    }


} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
}
});

module.exports = router;