const express = require('express');

const walletController = require('../controllers/walletController');
const xmlResponseFormatter = require('../middleware/xmlResponseFormatter');
const router = express.Router();

router.post('/add', walletController.addCreditToWallet);
router.post('/get', walletController.getWalletCredit);
router.post('/purchase', walletController.createPurchase);
router.post('/verify', walletController.verifyPurchase);

router.use(xmlResponseFormatter);

module.exports = router;