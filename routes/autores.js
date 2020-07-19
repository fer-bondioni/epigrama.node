var express = require('express');
var router = express.Router();

/* GET autores page. */
router.get('/', function(req, res, next) {
  res.render('autores', {
    IsAutores: true
  });
});

module.exports = router;