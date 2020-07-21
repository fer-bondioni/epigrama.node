var express = require('express');
var router = express.Router();
var searchModel = require('../models/searchModel')
var noticiasModel = require('../models/noticiasModel')



router.get('/', async function (req, res, next) {
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
  var noticia = await noticiasModel.getNoticiaById(id);
  res.render('noticia', {
    IsNoticias:true,
    noticia
  });
}); 


router.get('/categoria/:categoria', async (req, res, next) => {
  var categoria = req.params.categoria;
  var noticias = await noticiasModel.getNoticiasByCategoria(categoria);
  res.render('noticias', {
    IsNoticias:true,
    noticias,
    IsCategoria: true,
    categoria
  });
}); 


module.exports = router;