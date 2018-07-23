var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/ecom-test");

var productSchema = new mongoose.Schema({
    id: String,
    name: String,
    shortDesc: String,
    longDesc: String,
    image: String,
    price: Number,
    brand: String,
    quantity: Number
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
