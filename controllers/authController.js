const soapClient = require("../utils/soap");
const soapApiURL = require("../config");
const CommonResponse = require("../utils/commonResponse");

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  soapClient
    .createSoapClient(soapApiURL + "/soap/auth?wsdl")
    .then((client) => {
      return client.loginAsync({
        request: { email: email, password: password },
      });
    })
    .then((resp) => {
      res.send(resp[0].return.item);
    })
    .catch((e) => {
      res.status(500).send(new CommonResponse("Error"));
    });
};

exports.register = (req, res, next) => {
  const { name, email, password } = req.body;

  soapClient
    .createSoapClient(soapApiURL + "/soap/auth?wsdl")
    .then((client) => {
      return client.registerAsync({
        request: { name: name, email: email, password: password },
      });
    })
    .then((resp) => {
      console.log(resp);
      res.send(resp[0].return.item);
    })
    .catch((e) => {
      res.send(e.root.Envelope.Body);
    });
};
