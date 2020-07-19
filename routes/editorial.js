var express = require('express');
var router = express.Router();

/* GET editorial page. */
router.get('/', function(req, res, next) {
  res.render('editorial', {
    IsEditorial: true
  });
});

module.exports = router;