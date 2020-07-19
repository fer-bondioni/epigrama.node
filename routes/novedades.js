var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel')

/* GET novedades page. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades2();
  var nov2 = await novedadesModel.getNovedades3();
  var nov3 = await novedadesModel.getNovedades4();
  res.render('novedades', {
    IsNovedades: true,
    novedades,
    nov2,
    nov3
  });
});

module.exports = router;
