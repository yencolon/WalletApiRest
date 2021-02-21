const bcrypt = require('bcryptjs');

exports.hashPassword = (password) => {
  return bcrypt.hash(password, 12);
};

exports.comparePasswords = (pass1, pass2) => {
  return bcrypt.compare(pass1, pass2);
};
