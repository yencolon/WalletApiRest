const soap = require('soap');

exports.createSoapClient = (url) => {
  return soap
    .createClientAsync(url)
    .then((client) => {
      return client;
    })
    .catch((err) => {
      console.log(err);
    });
};
