var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom-test", {useNewUrlParser:true});
var Product = require ("./Product.js");

var tempCartSchema = new mongoose.Schema({
   tempCartContents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
}]
});

var TempCart = mongoose.model("TempCart", tempCartSchema);

module.exports = TempCart;
