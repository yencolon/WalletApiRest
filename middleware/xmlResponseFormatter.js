const CommonResponse = require("../utils/commonResponse");

module.exports = (req, res, next) => {
  if(!Array.isArray(res.respXML)){
    res.status(500).send({
      message: 'Error',
      xml: res.respXML
    })
  } 

  res.data = new CommonResponse(res.respXML[0].return.item);
  res.status(res.data.code).send(res.data);
};
