var mongoose = require ("mongoose");

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
