
var route = require('./route.js');
var express = require('express');
var logger = require('express-logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');



var app = express();

  app.use(logger({path: __dirname + '/log.txt'}));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(session({ secret: 'my_precious' }));

app.get('/user/:userId', route.getUser)
app.put('/user/:userId', route.createUser)


// port
app.listen(3000);

