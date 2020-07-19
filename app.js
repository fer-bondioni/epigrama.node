var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require ('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var novedadesRouter = require('./routes/novedades');
var catalogoRouter = require('./routes/catalogo');
var autoresRouter = require('./routes/autores');
var agendaRouter = require('./routes/agenda');
var editorialRouter = require('./routes/editorial');
var contactoRouter = require('./routes/contacto');
var noticiasRouter = require('./routes/noticias');
var loginRouter = require('./routes/login');
var adminNoticiasRouter = require('./routes/edicion');
var adminNovedadesRouter = require('./routes/edicion2');
var adminRegistroRouter = require('./routes/registro');
var resultadosRouter = require('./routes/resultados');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "PW2020",
  cookie: { maxAge: null},
  resave: false,
  saveUninitialized: true
}))

secured = async(req, res, next) => {
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario) {
      next();
    } else{
      res.redirect('/admin/login');
    } //cierra else
  } catch(error){
    console.log(error);
  }//cierra catch
}// cierra async


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/novedades', novedadesRouter);
app.use('/catalogo', catalogoRouter);
app.use('/autores', autoresRouter);
app.use('/agenda', agendaRouter);
app.use('/editorial', editorialRouter);
app.use('/contacto', contactoRouter);
app.use('/noticias', noticiasRouter);
app.use('/resultados', resultadosRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/noticias', secured, adminNoticiasRouter);
app.use('/admin/novedades', adminNovedadesRouter);
app.use('/admin/registro', adminRegistroRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
