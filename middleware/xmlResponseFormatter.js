const CommonResponse = require("../utils/commonResponse");

module.exports = (req, res, next) => {
  const response = new CommonResponse(res.respXML[0].return.item);
  res.status(response.code).send(response);
};
