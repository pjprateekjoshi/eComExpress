var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom-test", {useNewUrlParser:true});
var Product = require ("./../modules/Product.js");

var categorySchema = new mongoose.Schema({
   name : String,
   image : String,
   productList : [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Product"
   }]
});

var Category = mongoose.model("Category", categorySchema);

module.exports = Category;
