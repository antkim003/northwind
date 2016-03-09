var express = require('express');
var router = express.Router();
var Product = require('../models').Product;


router.get('/', function(req,res,next) {
  Product.find()
    .then(function(products) {
      res.render('products', {products: products});    
    })
    .then(null,next);
  
});

router.post('/', function(req,res,next) {
  var product = req.body;

  Product.findOrCreate(product)
    .then(function(product) {
      return product.save();
    })
    .then(function(product) {
      res.redirect('/products');
    })
    .then(null, next);
});

router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var stock = req.body.stock;
  var active = req.body.active;


  Product.findById(id)
    .then(function(product){
      if (stock) 
        product.stock = stock;
      else
        product.active = !active;
     
      return product.save();
    })
    .then(function(){
      res.redirect('/products');
    }, next);
  
});

router.delete('/:id', function(req, res, next) {

  Product.remove({ _id: req.params.id})
    .then(function(product) {
      res.redirect('/products');
    }, next);
});

router.get('/active', function(req,res,next) {
  Product.find({active: true})
    .then(function(products) {
      res.render('productsactive', {products: products});
    })
    .then(null, next);
});

router.get('/:name', function(req,res,next) {
  
  Product.findOne({name: req.params.name})
    .then(function(product) {
      res.render('productsdetail', {product: product});
    })
    .then(null, next);
});

module.exports = router;
