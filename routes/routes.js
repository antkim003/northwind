var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next) {
  res.send('homepage');
});

router.get('/products', function(req,res,next) {
  res.send('products page');
});

router.get('/producst/active', function(req,res,next) {
  res.send('products/active page');
});

router.get('/products/:name', function(req,res,next) {
  res.send('products detail page');
});

module.exports = router;