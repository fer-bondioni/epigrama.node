var express = require('express');
var router = express.Router();
// var noticiasModel = require('../models/noticiasModel')
// var novedadesModel = require('../models/novedadesModel')
var searchModel = require('../models/searchModel')


router.get('/', async function (req, res, next) {
  // var id = req.params.id;
  // var noticia = await noticiasModel.getNoticiasById(id);
  var resultados = await searchModel.buscarGlobal(req.query.q);
  res.render('resultados', {
    layout: 'layout',
    resultados,
    is_search: req.query.q !== undefined,
    q: req.query.q//agrego var q
  });
});

router.get('/:id', async (req, res, next) => {
  var id = req.params.id;
  var noticia = await noticiasModel.getNoticiasById(id);
  res.render('noticia', {
    layout:'layout2',
    noticia
  });
}); 


module.exports = router;