var sueprtest = require('supertest');
var app = require('../app');
var agent = sueprtest.agent(app);

var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
chai.use(spies);

var Product = require('../models/product').Product;

describe('simple test', function () {
  it('it adds two numbers', function () {
    expect(2+2).to.eql(4);
  });
});
describe('database validation', function () {
  var product;
  beforeEach(function () {
    product = new Product();
  });
  

  it('errors without any content', function (done) {
    product.validate(function(err) {
      console.log(err);
      expect(err.errors).to.exist;
      done();
    });
  });
});
describe('database integrity', function () {
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

  it('foo1 stock to equal 1', function (done) {
    expect(foo1.stock).to.equal(1);
    done();
  });
  
});