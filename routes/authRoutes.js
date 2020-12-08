const { Router } = require('express');
const express = require('express');

const authController = require('../controllers/authController');
const xmlResponseFormatter = require('../middleware/xmlResponseFormatter');
const router = express.Router();

router.post('/', authController.login);
router.post('/register', authController.register);

router.use(xmlResponseFormatter);

module.exports = router;