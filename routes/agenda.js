var express = require('express');
var router = express.Router();

/* GET agenda page. */
router.get('/', function(req, res, next) {
  res.render('agenda', {
    IsAgenda: true
  });
});

module.exports = router;