const soapClient = require('../utils/soap');
const soapApiURL = require('../config');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const CommonResponse = require('../utils/commonResponse');
const User = require('../models/user');

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(401).send('Invalid');
    }
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.isLogged = true;
          req.session.user = user;
          return req.session.save((err) => {
            console.log(err);
            return res.status(200).send('Done');
          });
        }
        return res.status(401).send('Invalid');
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.logoutUser = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.status(200).send('Done');
  });
};

exports.registerUser = (req, res, next) => {
  const { name, lastname, document, phone, email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user) return res.status(400).send('error');
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name: name,
            lastname: lastname,
            document: document,
            phone: phone,
            email: email,
            password: hashedPassword,
          });

          return user.save();
        })
        .then((result) => {
          return res.status(201).send(result);
        })
        .catch((err) => {
          return res.status(400).send(err);
        });
    })
    .catch((err) => console.log(err));
};

exports.resetPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.status(400).send('error');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.email })
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not exists');
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;

        return user.save();
      })
      .then((result) => {
        return res.status(result.status).send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// OldMethods, the connect to a SOAP service hosted in another domain.

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  soapClient
    .createSoapClient(soapApiURL + '/soap/auth?wsdl')
    .then((client) => {
      return client.loginAsync({
        request: { email: email, password: password },
      });
    })
    .then((respXML) => {
      res.respXML = respXML;
      next();
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send(new CommonResponse('Error'));
    });
};

exports.register = (req, res, next) => {
  const { name, lastname, document, phone, email, password } = req.body;

  soapClient
    .createSoapClient(soapApiURL + '/soap/auth?wsdl')
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
      console.log(e);
      res.send(e.root.Envelope.Body);
    });
};
