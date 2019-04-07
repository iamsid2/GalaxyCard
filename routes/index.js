var express = require("express");
var router = express.Router();
var xmlBody = require("../utils/kookoo.js");

/* GET home page. */
router.get("/", function(req, res) {
  res.header("Content-Type", "text/xml");
  res.send(xmlBody.getXMLBody(req));
});
module.exports = router;
