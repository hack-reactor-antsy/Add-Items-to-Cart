var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log('mongo is connected');
});

var storeSchema = new mongoose.Schema({
  productId: Number, 
  price: Number,
  description: String, 
  overview: Array,
  options: Schema.Types.Mixed, //Let's me create an obj
  quantityInStock: Number,
  availableToReturn, Boolean, 
})