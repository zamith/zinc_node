var express = require('express');
var http = require('http');
var fs = require('fs');
var xml2js = require('xml2js');
var bodyParser = require('body-parser')
var path = require('path');
var { FindByTag } = require('./util');

var app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`)
})

module.exports = app;



