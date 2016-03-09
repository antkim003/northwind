var express = require('express');
var app = express();

var swig = require('swig');
var path = require('path');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var methodOverride = require('method-override');

module.exports = app;

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html',swig.renderFile);
swig.setDefaults({ cache: false });
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  sass({
    src: __dirname + '/assets',
    dest: __dirname + '/public',
    debug: true
  })
); 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res,next) {
  res.render('index');
});

app.use('/products', require('./routes/products'));

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send(err.message);
});

