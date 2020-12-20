const express = require('express');
const authController = require('../controllers/authController');
const xmlResponseFormatter = require('../middleware/xmlResponseFormatter');
const router = express.Router();

// Old routes, this routes connects to a SOAP serve to work
router.post('/', authController.login);
router.post('/register', authController.register);

router.use(xmlResponseFormatter);

// New Routes, these use their own database
router.post('/', authController.loginUser);
router.post('/register', authController.registerUser);

module.exports = router;
