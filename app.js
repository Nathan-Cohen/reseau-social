const path = require('path');
var express = require('express')
app = express()
server = require('http').createServer(app);

app.use(express.static(__dirname + '/'));
// app.use(express.static(__dirname + '/node_modules'));
// app.use(express.static(__dirname + '/directives'));
// app.use(express.static(__dirname + '/views'));
// app.use(express.static(__dirname + './controllers'));
// app.use(express.static(__dirname + './style'));
// app.use(express.static(__dirname + './roote'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'models/index.html'));
  });
 
server.listen(9007);