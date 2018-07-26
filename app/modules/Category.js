var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/ecom-test");
var Product = require ("./../modules/Product.js");

var categorySchema = new mongoose.Schema({
   name : String,
   image : String,
   productList : [Product.productSchema]
});

var Category = mongoose.model("Category", categorySchema);

module.exports = Category;