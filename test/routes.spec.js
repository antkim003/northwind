var sueprtest = require('supertest');
var app = require('../app');
var agent = sueprtest.agent(app);

var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
chai.use(spies);

routes spec
describe('expects the correct routes to the page', function () {
  
  describe('GET /', function () {
    it('gets 200 on index', function (done) {
      agent
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET /products', function () {
    it('gets 200 on products page', function (done) {
      agent
        .get('/products')
        .expect(200, done);
    });
  });

  describe('GET /products/active', function () {
    it('gets 200 on products page', function (done) {
      agent
        .get('/products/active')
        .expect(200, done);
    });
  });

  describe('GET /products/:name', function () {
    it('gets 200 on products page', function (done) {
      agent
        .get('/products/antonio')
        .expect(200, done);
    });
  });

  describe('failing GET /products123', function () {
    it('gets 404 on products page', function (done) {
      agent
        .get('/products123')
        .expect(404, done);
    });
  });
});