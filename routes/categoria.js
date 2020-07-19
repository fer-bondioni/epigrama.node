var express = require('express');
var router = express.Router();

/* GET categorias page. */
router.get('/', function (req, res, next) {
  res.render('categoria', {
    IsNoticias: true
  });
});

module.exports = router;