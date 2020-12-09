const soapClient = require("../utils/soap");
const soapApiURL = require("../config");

exports.addCreditToWallet = (req, res, next) => {
  const { document, phone, amount } = req.body;
 
  soapClient
    .createSoapClient(soapApiURL + "/soap/wallet?wsdl")
    .then((client) => {
      return client.addCreditToWalletAsync({
        request: {
          document: document,
          phone: phone,
          amount: amount,
        },
      });
    })
    .then((respXML) => {
      res.respXML = respXML;
      next();
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

exports.createPurchase = (req, res, next) => {
  const { document, amount } = req.body;
  const token = Math.floor(Math.random() * 10000 + 1);
  soapClient
    .createSoapClient(soapApiURL + "/soap/wallet?wsdl")
    .then((client) => {
      return client.createPurchaseAsync({
        request: {
          document: document,
          amount: amount,
          token: token,
        },
      });
    })
    .then((respXML) => {
      res.respXML = respXML;
      next();
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

exports.verifyPurchase = (req, res, next) => {
  const { token } = req.body;
  soapClient
    .createSoapClient(soapApiURL + "/soap/wallet?wsdl")
    .then((client) => {
      return client.verifyPurchaseAsync({
        request: {
          token: token,
        },
      });
    })
    .then((respXML) => {
      res.respXML = respXML;
      next();
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

exports.getWalletCredit = (req, res, next) => {
  const { document, phone } = req.body;
  soapClient
    .createSoapClient(soapApiURL + "/soap/wallet?wsdl")
    .then((client) => {
      return client.getWalletCreditAsync({
        request: {
          document: document,
          phone: phone,
        },
      });
    })
    .then((respXML) => {
      res.respXML = respXML;
      next();
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};
