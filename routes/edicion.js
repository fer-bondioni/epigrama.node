var express = require('express');
var router = express.Router();
var noticiasModel = require('../models/noticiasModel');
var novedadesModel = require('../models/novedadesModel')

//get admin/noticias > present admin
router.get('/', async function (req, res, next) {
  var noticias
  if (req.query.q === undefined) {
    noticias = await noticiasModel.getNoticias3();
  } else {
    noticias = await noticiasModel.buscarNoticias(req.query.q);
  }
  res.render('admin/noticias', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    noticias,
    is_search: req.query.q != undefined,
    q: req.query.q
  });
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

router.post("/agregar", async (req, res, next) => {
  try {
    if (req.body.titulo !== "" && req.body.categoria !== "" && req.body.fecha !== "" && req.body.contenido) {
      await noticiasModel.insertNoticia(req.body);
      res.redirect('/admin/noticias')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, mensaje: 'Todos los campos son requeridos'
      })
    }
  } catch{
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, mensaje: 'No se cargó la noticia'
    })
  }//fin catch
})

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await noticiasModel.deleteNoticiasById(id);
  res.redirect('/admin/noticias')
});

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var noticia = await noticiasModel.getNoticiaById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    noticia
  });
}); // cierra router.get

router.post('/modificar', async (req, res, next) => {
  try {
    var obj = {
      titulo: req.body.titulo,
      categoria: req.body.categoria,
      contenido: req.body.contenido,
      fecha: req.body.fecha
    }
    await noticiasModel.modificarNoticiabyId(obj, req.body.id);
    res.redirect('/admin/noticias');
  }
  catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true, mensaje: 'No se modificó la novedad'
    });
  }
})

///////////



module.exports = router;

