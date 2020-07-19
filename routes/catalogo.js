var express = require('express');
var router = express.Router();

/* GET catalogo page. */
router.get('/', function(req, res, next) {
  res.render('catalogo', {
    IsCatalogo: true
  });
});

module.exports = router;