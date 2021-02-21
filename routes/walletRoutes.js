const express = require('express');
const walletController = require('../controllers/walletController');
const xmlResponseFormatter = require('../middleware/xmlResponseFormatter');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

// Old routes, this routes connect to a SOAP service
router.post('/add', walletController.addCreditToWallet);
router.post('/get', walletController.getWalletCredit);
router.post('/purchase', walletController.createPurchase);
router.post('/verify', walletController.verifyPurchase);
router.use(xmlResponseFormatter);

// New Routes, these use their own database

router.post('/', isAuth, walletController.getWalletCredit);
router.post('/withdraw', isAuth, walletController.createPurchase);
router.post('/deposit', isAuth, walletController.addCreditToWallet);
router.post('/verify', isAuth, walletController.verifyPurchase);

module.exports = router;
