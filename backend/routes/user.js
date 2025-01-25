const router = require("express").Router();
const userValidation = require("../validations/userValidation");
const validate = require("../middlewares/validate");
const bcrypt = require("bcrypt");
const {
  User,
  Role
} = require('../models');
const {
  Op,
  Sequelize
} = require("sequelize");

const { frontendSession, backendSession } = require("../sessions/session");



// returns all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // für die Sicherheit
      include: [
        {
          model: Role,
          as: 'role',
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// returns an specific user
router.get('/:id', async (req, res) => {
  try {
    const userID = req.params.id;

    if (isNaN(userID)) {
      return res.status(400).json({ message: 'Ungültige Benutzer-ID.' });
    }

    const user = await User.findOne({
      where: { id: userID },
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({
        message: `Benutzer konnte nicht gefunden werden`,
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// updates a user
router.put('/:id', userValidation(), validate, async (req, res) => {
  try {

    const user = req.body;
    const userID = req.params.id;

    if (isNaN(userID)) {
      return res.status(400).json({ message: 'Ungültige Benutzer-ID.' });
    }

    const updatetUser = await User.update(user,
      { where: { id: userID } }
    );

    if (updatetUser == 0) {
      return res.status(404).json({ message: 'Benutzer mit der ID wurde nicht gefunden ' });
    }
    else {
      return res.status(200).json({ message: 'Benutzer wurde erfolgreich aktualisiert.' });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Interner Serverfehler.' });
  }
});

// creates a user
router.post('/', userValidation(), validate, async (req, res) => {
  try {
    const user = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    const newUser = await User.create(user);

    if (newUser) {
      return res.status(201).json({ message: 'User wurde erfolgreich angelegt', user: newUser });
    }
    else {
      return res.status(400).json({ message: 'Fehler bei Erstellung des Users' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfehler" });
  }
});


router.post('/login', backendSession, async (req, res) => {
  console.log("login");
  const { name, password } = req.body;
  const existingUser = await User.findOne({ where: { name }, include: [{ model: Role, as: 'role' }] });

  if (!existingUser) {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (isPasswordValid) {
    req.session.user = {
      id: existingUser.id,
      name: existingUser.name,
      role : existingUser.role
    };

    return res.status(200).json({ message: "Login erfolgreich", user: req.session.user });
  }
  else {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }
});

router.get('/auth/refresh', backendSession, (req, res) => {
  console.log("auth");
  if (req.session.user) {
    res.status(200).json({ isAuthenticated: true, user: req.session.user });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

router.delete('/logout',backendSession, (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Fehler beim Zerstören der Session:', err);
          return res.status(500).json({ message: 'Logout fehlgeschlagen' });
      }

      res.clearCookie('BSID');
      return res.status(200).json({ message: 'Logout erfolgreich' });
  });

});

module.exports = router;