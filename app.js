
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var io = require('socket.io');


var app = module.exports = express.createServer();
io = io.listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

var counter = 0;

io.configure(function(){
 
  console.log('Configuring socket.io');
 
  io.set('log level', 1);
  io.set('transports', [
    'websocket'
  , 'flashsocket'
  , 'xhr-polling'
  , 'jsonp-polling'
  ]);
 
});

io.sockets.on('connection', function (socket) {
  
  console.log('Client connected');
  
  var msgPoll = setInterval(function () {
    socket.emit('mymessage', 'Sending message ' + counter);
    counter++;
  }, 1000); 
  
  socket.on('disconnect', function () {
    clearInterval(msgPoll);
    console.log('Client disconnected');
  });  
  
});



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
