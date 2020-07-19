var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET novedades page. */
router.get('/', function(req, res, next) {
  res.render('contacto', {
    IsContacto: true
  });
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
  var subject = req.body.subject;
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  var obj = {
    to: "ferchu.b@gmail.com",
    subject: 'CONTACTO WEB',
    html: name + ' se contactó a través de la web y quiere más información a este correo: '
    + email + '.<br> Hizo este comentario: ' + message + ' y seleccionó este tema: ' + subject
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });// fin del transport

  var info = await transport.sendMail(obj);

  res.render('contacto', {
    mensaje: 'Mensaje enviado correctamente'
  })

})



module.exports = router;