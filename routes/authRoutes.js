const express = require('express');
const authController = require('../controllers/authController');
const xmlResponseFormatter = require('../middleware/xmlResponseFormatter');
const validation = require('../validation/authValidation');
const router = express.Router();

// Old routes, this routes connects to a SOAP serve to work
router.post('/', authController.login);
router.post('/register', authController.register);

router.use(xmlResponseFormatter);

// New Routes, these use their own database
router.post('/', validation.isValidLogin(), authController.loginUser);
router.post('/signup', validation.isValidSignUp(), authController.registerUser);
router.post(
  '/resetpassword',
  validation.isValidAskResetPassword(),
  authController.resetPassword
);
router.post('/changepassword/:token', authController.changePassword);

module.exports = router;
