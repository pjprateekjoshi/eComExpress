var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/ecom-test");

var productSchema = new mongoose.Schema({
    id: String,
    name: String,
    shortDesc: String,
    longDesc: String,
    image: String,
    imageLarge1: String,
    imageLarge2: String,
    imageLarge3: String,
    imageLarge4: String,
    category: String,
    price: Number,
    brand: String,
    availableQuantity: Number
});

var Product = mongoose.model("Product", productSchema);

module.exports = {
    Product,
    productSchema
};
