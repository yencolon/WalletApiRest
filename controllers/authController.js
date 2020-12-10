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
    .then((respXML) => {
      // req.session.user = {
      //   isLogged: true, 
      //   email: email,
      //   password: password
      // };
      res.respXML = respXML;
      next();
    })
    .catch((e) => {
      res.status(500).send(new CommonResponse("Error"));
    });
};

exports.register = (req, res, next) => {
  const { name, lastname, document, phone, email , password } = req.body;

  soapClient
    .createSoapClient(soapApiURL + "/soap/auth?wsdl")
    .then((client) => {
      return client.registerAsync({
        request: {
          name: name,
          lastname: lastname,
          phone: phone,
          document: document,
          email: email,
          password: password,
        },
      });
    })
    .then((respXML) => {
      res.respXML = respXML;
      next();
    })
    .catch((e) => {
      res.send(e.root.Envelope.Body);
    });
};
