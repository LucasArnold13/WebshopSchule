const isAuthenticated = (req, res, next) => {
    console.log(req.session);
    if (req.session.user || req.session.customer) {
      return next();
    } else {
      return res.status(401).json({ message: 'Nicht autorisiert. Bitte einloggen.' });
    }
  };

  module.exports = isAuthenticated;