var express = require('express');
var router = express.Router();
var noticiasModel = require('../models/noticiasModel')


router.get('/', async function (req, res, next) {
  // console.log(req.q.query); 
  var noticias
  if(req.query.q === undefined){
    noticias = await noticiasModel.getNoticias2();
  }else {
    noticias = await noticiasModel.buscarNoticias(req.query.q);
  }
  res.render('noticias', {
    IsNoticias:true,
    noticias,
    is_search: req.query.q !== undefined,
    q: req.query.q//agrego var q
  });
});


router.get('/:id', async (req, res, next) => {
  var id = req.params.id;
  var noticia = await noticiasModel.getNoticiasById(id);
  res.render('noticia', {
    layout: 'layout2',
    noticia
  });
}); 

router.get('/:categoria', async (req, res, next) => {
  var categoria = await noticiasModel.getNoticiasByCategoria();
  res.render('categoria', {
    layout:'layout2',
    categoria
  });
}); 




module.exports = router;