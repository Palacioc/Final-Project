var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./api/user/user');
var projects = require('./api/project/project');
var needs = require('./api/need/need');
var proposals = require('./api/proposal/proposal');
var auth = require('./api/auth/auth-controller');
var cors = require('cors');
require("dotenv").config();

const session         = require("express-session");
const passport        = require("passport");


// database connection
require('./configs/database');
require('./configs/passport')(passport);

var app = express();

// Configure the session:
app.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true,
  // cookie : { domain:'localhost', maxAge: 2419200000 }
}));

// Para comunicación entre los dos puertos
var whitelist = [
    'http://localhost:4200',
    'https://idtm.herokuapp.com',
    'http://idtm.herokuapp.com'
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/dist',express.static(path.join(__dirname, 'public-dist')));
app.use(express.static(path.join(__dirname, 'public')));

//Initialize auth modules
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', users);
app.use('/api/needs', needs);
app.use('/api/projects', projects);
app.use('/api/proposals', proposals);
app.use('/api/auth', auth);

app.all('/*', function (req,res){
  res.sendfile(__dirname+'/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
