const soapClient = require("../utils/soap");
const soapApiURL = require("../config");
const CommonResponse = require("../utils/commonResponse");

exports.addCreditToWallet = (req, res, next) => {
  const { userId, document, phone, amount } = req.body;
  soapClient
    .createSoapClient(soapApiURL + "/soap/wallet?wsdl")
    .then((client) => {
      return client.addCreditToWalletAsync({
        request: {
          userId: userId,
          document: document,
          phone: phone,
          amount: amount,
        },
      });
    })
    .then((resp) => {
      res.send(resp[0].return.item);
    })
    .catch((e) => {
      res.status(500).send(new CommonResponse("Error"));
    });
};

exports.createPurchase = (req, res, next) => {
  const { userId, amount } = req.body;
  const token = "123";
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
    .then((resp) => {
      res.send(resp[0].return.item);
    })
    .catch((e) => {
      res.status(500).send(new CommonResponse("Error"));
    });
};

exports.verifyPurchase = (req, res, next) => {
  const { userId, recordId } = req.body;
  const token = "123";
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
    .then((resp) => {
      res.send(resp[0].return.item);
    })
    .catch((e) => {
      res.status(500).send(new CommonResponse("Error"));
    });
};

exports.getWalletCredit = (req, res, next) => {
  const { userId } = req.body;
  soapClient
    .createSoapClient(soapApiURL + "/soap/wallet?wsdl")
    .then((client) => {
      return client.getWalletCreditAsync({
        request: {
          userId: userId,
        },
      });
    })
    .then((resp) => {
      res.send(resp[0].return.item);
    })
    .catch((e) => {
      res.status(500).send(new CommonResponse("Error"));
    });
};
