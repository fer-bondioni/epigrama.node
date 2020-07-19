var express = require('express');
var router = express.Router();
var usuariosModel = require('../models/usuariosModel');

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('admin/registro', {
        layout: 'admin/layout'
    });
});

router.post('/', async (req, res, next) => {
    try {
        var data = await usuariosModel.addUser(req.body);
        if (data != undefined) {
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;
            res.redirect('/admin/login');
        } else {
            res.render('admin/registro', {
                layout: 'admin/layout',
                error: true
            });
        }//cierra el else
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;