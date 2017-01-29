let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

describe('testing', function() {
	it('should pass basic math', function(done){
		expect(1+1).to.equal(2);
		done()
	})
});