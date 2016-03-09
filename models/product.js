var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/northwind');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 1
  },
  active: {
    type: Boolean,
    default: true
  }
});

productSchema.statics.findOrCreate = function(productObj) {
  var self = this;
  console.log('findOrCreate', productObj.name);
  return this.findOne({ name: productObj.name }).exec()
    .then(function(product) {
      console.log('hello');
      if (product === null) {
        return self.create(productObj);
      } else {
        return product;
      }
    })
};

var Product = mongoose.model('Product', productSchema);

module.exports = {
  Product: Product
};