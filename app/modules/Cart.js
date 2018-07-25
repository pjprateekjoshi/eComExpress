var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/ecom-test");
var Product = require ("./Product.js");

var cartSchema = new mongoose.Schema({
   username : String,
   cartContents: [Product.productSchema]
});

var Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
