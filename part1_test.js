var http = require('http');
var xml2js = require('xml2js');
var { FindByTag } = require('./util');

//PART 1 BUT NO DOWNLOAD
function getAnalysis(url){
    let dictionary = {};
    //REQUEST XML DATA
    var req = http.get(url, function(res) {
        var xmlString = '';

        res.on('data', function(chunk) {
            xmlString += chunk;
        });

        res.on('end', function() {
            //PARSER FOR XML STRING
            var parser = new xml2js.Parser();
            parser.parseString(xmlString, (err, result) => {
                if(err){
                    return promise;
                } else{
                    dictionary = FindByTag(result, 'SPEAKER', {});
                }
            });
        });
    });
    //HANDLE REQUEST ERROR
    req.on('error', function(err) {
        return promise;
    });
    //RETURN PROMISE TO TEST FILE
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            if(Object.keys(dictionary).length > 0){
                resolve(dictionary);
            }else{
                reject({message: 'Time out. Problem fetching the data'});
            }
        }, 1000);
    });
    return promise;
  
}

module.exports = getAnalysis;