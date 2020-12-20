module.exports = (req, res, next) => {
  if (!req.session.isLogged) return res.status(403).send('Prohibido');
  next();
};
