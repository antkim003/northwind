var sueprtest = require('supertest');
var app = require('../app');
var agent = sueprtest.agent(app);

var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
var Product = require('../models/product').Product;
chai.use(spies);

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

  describe('POST /products', function () {
    it('gets 200 redirect on products page', function (done) {
      agent
        .post('/products')
        .send({
          name: 'test description',
          description: 'does this test work?'
        })
        .expect(302) // redirect
        .expect(function(res) {
          // how do you do redirects testing ??
          // expect(res.body._id).to.not.be.an('undefined');
          // expect(res.body.name).to.equal('test description');  
        })
        .end(done);
    });
  });

  describe('PUT/DEL /products/:id', function () {
    var foo1;
    beforeEach(function (done) {
      Product.remove()
        .then(function() {
          return Product.create(
            [
              {name: 'foo1', description: 'this is test 1'},
              {name: 'foo2', description: 'this is test with stock 5', stock: 5},
              {name: 'foo3', description: 'this is test 3', stock: 3}
            ]
          )
        })
        .then(function(products) {
          foo1 = products[0];
          done();
        })
    });

    it('updates the quantity of the product', function (done) {
      var url = '/products/' + foo1.id
      agent
        .put(url)
        .send({
          stock: 5
        })
        .expect(function(res) {
          expect(res.body.stock).to.equal(0);
        })
        done();
    });

    it('deletes a product', function (done) {
      agent
        .delete('/products/' + foo1._id) 
        .expect(302, done);
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