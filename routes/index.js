var express = require('express');
var router = express.Router();
var noticiasModel = require('../models/noticiasModel');
var novedadesModel = require('../models/novedadesModel');


/* GET home page. */
router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades2();
  var noticias = await noticiasModel.getNoticias();
  res.render('index', {
    IsHome: true,
    noticias,
    novedades
  });
});


module.exports = router;
