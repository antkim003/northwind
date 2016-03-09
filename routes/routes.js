var express = require('express');
var router = express.Router();
var Product = require('../models/product').Product;

router.get('/', function(req,res,next) {
  res.render('index');
});

router.get('/products', function(req,res,next) {
  Product.find()
    .then(function(products) {
      res.render('products', {products: products});    
    })
    .then(null,next);
  
});

router.post('/products', function(req,res,next) {
  var productDetails = req.body;

  Product.findOrCreate(productDetails)
    .then(function(product) {
      return product.save();
    })
    .then(function(product) {
      res.status(200).redirect('/products');
      next();
    })
    .then(null, next);
});

router.put('/products/:id', function(req, res, next) {
  var id = req.params.id;
  var stock = req.body.stock;
  var active = req.body.active;
  var updateObject = {};

  if (stock) {
    updateObject.stock = stock;
  } else {
    updateObject.active = !active;
  }

  Product.findById(id).update(updateObject).exec()
    .then(function(product){
      console.log('update product', product);
      Product.findById(id).then(function(product){console.log(product)});
      res.redirect('/products');
    })
    .then(null, next);  

  
});

router.delete('/products/:id', function(req, res, next) {
  var id = req.body.productid;

  Product.findById(id).remove().exec()
    .then(function(product) {
      res.redirect('/products');
    })
    .then(null, next);
});

router.get('/products/active', function(req,res,next) {
  Product.find({active: true})
    .then(function(products) {
      res.render('productsactive', {products: products});
    })
    .then(null, next);
});

router.get('/products/:name', function(req,res,next) {
  
  Product.findOne({name: req.params.name})
    .then(function(product) {
      console.log(product);
      res.render('productsdetail', {product: product});
    })
    .then(null, next);
});

module.exports = router;