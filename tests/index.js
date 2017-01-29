let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;
//PART 1 BUT DOESN'T DOWNLOAD
let getAnalysis = require('../part1_test.js');

const url = 'http://www.ibiblio.org/xml/examples/shakespeare/macbeth.xml';
//FOR ROUTER TESTING
chai.use(chaiHttp);

describe('Fetch Macbeth xml without downloading', function() {
	var dictionary;

	before(function(done){
		getAnalysis(url)
		.then((result) => {
			dictionary = result;
			done();
		})
	});

	it('should return an object with character as the key and number of lines as the value', function(done) {
			expect(dictionary).to.be.an('object');
			done();
		}
	);

	it('should contain Macbeth as key', function(done) {
			expect(dictionary).to.include.keys('MACBETH');
			done();
	});

	it('should contain number as value', function(done) {
			expect(dictionary['MACBETH']).to.be.a('number');
			done();
	});

});


describe('Fetch non-existing url using http module', function() {
	it('should return ENOTFOUND error when given non-http invalid link and res is undefined', function(done){
		let request = chai.request("dafdsfsdf")
		.get('/')
		.end(function(err, res){
			expect(err.code).to.eql("ENOTFOUND");
			expect(res).to.be.an('undefined');
			done()
		})
	})

	it('given non-existing link', function(done){
		getAnalysis("http://www.ibiblio.org/xml/examples/shakespeare/mac.xml")
		.then((result) => {
			done();
		})
		.catch(err => {
			expect(err.message).to.equal("Time out. Problem fetching the data");
			done()
		})
	})

})


//ROUTER TEST
// describe('ANALYSIS', function() {
// 	it('should fetch object with characters /analyze POST', function(done) {
// 		chai.request(server)
// 		.post('/analyze')
// 		.send({$url: "http://www.ibiblio.org/xml/examples/shakespeare/macbeth.xml"})
// 		.end(function(err, res){
// 			res.should.have.status(200);
// 			done();
// 		});
// 	});
// });