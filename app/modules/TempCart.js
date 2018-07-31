var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom-test", {useNewUrlParser:true});
var Product = require ("./Product.js");

var tempCartSchema = new mongoose.Schema({
   tempUserID : String,
   tempCartContents: [Product.productSchema]
});

var TempCart = mongoose.model("Cart", tempCartSchema);

module.exports = TempCart;
