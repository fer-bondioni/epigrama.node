var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel')


//get admin/novedades > present admin

router.get('/', async function (req, res, next) {
    var novedades
    if (req.query.q === undefined) {
      novedades = await novedadesModel.getNovedades();
    } else {
      novedades = await novedadesModel.buscarNovedades(req.query.q);
    }
    res.render('admin/novedades', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      novedades,
      is_search: req.query.q != undefined,
      q: req.query.q
    });
  });
  
  router.get('/agregar2', (req, res, next) => {
    res.render('admin/agregar2', {
      layout: 'admin/layout'
    });
  });
  
  router.post("/agregar2", async (req, res, next) => {
    try {
      if (req.body.mes !== "" && req.body.texto !== "") {
        await novedadesModel.insertNovedad(req.body);
        res.redirect('/admin/novedades')
      } else {
        res.render('admin/agregar2', {
          layout: 'admin/layout',
          error: true, mensaje: 'Todos los campos son requeridos'
        })
      }
    } catch{
      console.log(error)
      res.render('admin/agregar2', {
        layout: 'admin/layout',
        error: true, mensaje: 'No se cargó la novedad'
      })
    }//fin catch
  })
  
  router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
  });
  
  router.get('/modificar2/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesById(id);
    res.render('admin/modificar2', {
      layout: 'admin/layout',
      novedad
    });
  }); // cierra router.get
  
  router.post('/modificar2', async (req, res, next) => {
    try {
      var obj = {
        mes: req.body.mes,
        texto: req.body.texto
      }
      await novedadesModel.modificarNovedadbyId(obj, req.body.id);
      res.redirect('/admin/novedades');
    }
    catch (error) {
      console.log(error)
      res.render('admin/modificar2', {
        layout: 'admin/layout',
        error: true, mensaje: 'No se modificó la novedad'
      });
    }
  })

  module.exports = router;
