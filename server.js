var express = require('express');
var http = require('http');
var fs = require('fs');
var xml2js = require('xml2js');
var bodyParser = require('body-parser')
var path = require('path');
var { FindByTag } = require('./util');

var app = express();
const PORT = 3000;
const xmlFolder = `${__dirname}/xml`;
const url = 'http://www.ibiblio.org/xml/examples/shakespeare/macbeth.xml';
const tag = "SPEAKER";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.use('/analyze', function(req, res, next){
	let { $url } = req.body;
	let fileLocation = `${xmlFolder}/${new Date().toISOString()}.xml`;
	var file = fs.createWriteStream(fileLocation);
	var request = http.get($url, function(response) {
		response.pipe(file);
		file.on('finish', function() {
			req.body.file = fileLocation;
			file.close(); 
			 // close() is async, call cb after close completes.
			next();
		});
	})
	request.on('error', function(err) { // Handle errors
		fs.unlink(fileLocation); // Delete the file async. (But we don't check the result)
		console.error(err);
		res.status(404).send("Couldn't make the http request");
	});
})

app.post('/analyze', function(req, res, next){
	let { $url, file } = req.body;
    fs.readFile(file, 'utf8', function(err, data) {
		if (err) {
			res.status(404).send("Couldn't read the file");
		}else {
			var parser = new xml2js.Parser();
			parser.parseString(data, (err, result) => {
				if(err){
					res.status(404).send("Couldn't parse the xml");
				} else{
					let dictionary = FindByTag(result, tag, {});
					res.status(200).send(dictionary);
				}
			});
		}
    });

});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`)
})

module.exports = app;



