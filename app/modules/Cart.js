var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/ecom-test");
var Product = require ("./Cart.js");

var cartSchema = new mongoose.Schema({
   username : String,
   cartContents: [Product.productSchema]
});

var Product = mongoose.model("Cart", cartSchema);

module.exports = Product;
