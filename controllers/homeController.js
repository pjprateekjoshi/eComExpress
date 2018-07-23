var bodyParser = require("body-parser");

var Product = require("./../App/modules/Product.js");

const home = function(req,res){
    res.render("./../resources/views/index.ejs");
}

const checkout = function(req,res){
    res.render("./../resources/views/checkout.ejs");
}

const cart = function(req,res){
    res.render("./../resources/views/cart.ejs");
}

const productDetails = function(req,res){
    res.render("./../resources/views/product-details.ejs");
}

const shop = function(req,res){
    res.render("./../resources/views/shop.ejs");
}

module.exports = {
    home,
    checkout,
    cart,
    productDetails,
    shop
}
