var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom-test", {useNewUrlParser:true});
var Product = require ("./Product.js");

var orderSchema = new mongoose.Schema({
   username : String,
   status: String,
   orderContents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
}],
    email: String,
    address: String,
    comment: String
});

var Order = mongoose.model("Order", orderSchema);

module.exports = Order;
