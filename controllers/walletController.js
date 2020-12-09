const soapClient = require("../utils/soap");
const soapApiURL = require("../config");
const mailer = require("../utils/mailer");
const CommonResponse = require("../utils/commonResponse");

exports.addCreditToWallet = (req, res, next) => {
  const { document, phone, amount } = req.body;
 
  soapClient
    .createSoapClient(soapApiURL + "/soap/wallet?wsdl")
    .then((client) => {
      return client.addCreditToWalletAsync({
        request: {
          userId: 1,
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
      res.status(500).send(new CommonResponse());
    });
};

exports.createPurchase = (req, res, next) => {
  const { userId, amount } = req.body;
  const token = Math.floor(Math.random() * 10000 + 1);
  
  soapClient
    .createSoapClient(soapApiURL + "/soap/wallet?wsdl")
    .then((client) => {
      return client.createPurchaseAsync({
        request: {
          userId: userId,
          amount: amount,
          token: token,
        },
      });
    })
    .then((respXML) => {
      mailer.sendMail(user.email, "Codigo de Confirmacion", `: ${code}`);
      res.respXML = respXML;
      next();
    })
    .catch((e) => {
      console.log(e)
      res.status(500).send(new CommonResponse([]));
    });
};

exports.verifyPurchase = (req, res, next) => {
  const { userId, recordId, token } = req.body;
  soapClient
    .createSoapClient(soapApiURL + "/soap/wallet?wsdl")
    .then((client) => {
      return client.verifyPurchaseAsync({
        request: {
          userId: userId,
          recordId: recordId,
          token: token,
        },
      });
    })
    .then((respXML) => {
      res.respXML = respXML;
      next();
    })
    .catch((e) => {
      res.status(500).send(new CommonResponse("Error"));
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
      res.status(500).send(new CommonResponse("Error"));
    });
};
