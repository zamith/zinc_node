var http = require('http');
var fs = require('fs');
var { FindByTag } = require('./util');

const url = 'http://www.ibiblio.org/xml/examples/shakespeare/macbeth.xml';
const fileLocation = `${__dirname}/xml/${new Date().toISOString()}_macbeth.xml`;
var xml2js = require('xml2js');


//PRINT PRETTY FUNCTION
function prettyPrint(arr) {
    arr.forEach( data => {
        console.log(`${data.character}:  ${data.numLines}`);
    })
}

//CALLBACK FUNCTION FOR DOWNLOAD
var callback = function(err) {
    if(err) {
        console.error("couldn't complete the download" + err);
    } else {
        fs.readFile(fileLocation, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
            }else {
                //PARSER THAT CONVERTS THE XML STRING TO JS OBJECT
                var parser = new xml2js.Parser();
                parser.parseString(data, (err, result) => {
                    if(err) {
                        console.error(err);
                    } else {
                        //TURN THE PARSED XML RESULT INTO A DICTIONARY
                        let dictionary = FindByTag(result, "SPEAKER", {});
                        let sorted_dict = Object.keys(dictionary).map( character => {
                            return {character, numLines: dictionary[character]}
                        }).sort((a,b) => {
                            return b.numLines - a.numLines;
                        });
                        prettyPrint(sorted_dict);
                    }
                });
            }
        });
    }
}

//DOWNLOAD FUNCTION
var download = function(url, dest, cb) {
    //CREATE FILE
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        //WRITE TO FILE
        response.pipe(file);
        //CLOSE THE FILE ON COMPLETE.
        file.on('finish', function() {
            file.close(cb);
        });
    })
    // HANDLE ERRORS
    request.on('error', function(err) {
        // DELETE CREATED FILE
        fs.unlink(dest);
        if (cb) cb(err.message);
    });
};

//RUN THE FUNCTIONS
download(url, fileLocation, callback);