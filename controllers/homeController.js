var Product = require("./../App/modules/Product.js");

const home = function(req,res){
    Product.find({}, function(err,products){
        if(err){
            console.log(err);
            res.send("Error! Check log.");
        }else{
            res.render("./../resources/views/index.ejs",{products:products});
        }
    });
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


/* ========================
        ADD PRODUCT BEGIN
========================= */

const addProductForm = function(req,res){
    res.render("./../resources/views/add-product.ejs");
}

const addProduct = function(req,res){
    var newProduct = new Product({
        id: req.body.id,
        name: req.body.name,
        shortDesc: req.body.shortDesc,
        longDesc: req.body.longDesc,
        image: req.body.image,
        price: req.body.price,
        brand: req.body.brand,
        availableQuantity: req.body.availableQuantity
    });

    newProduct.save((err,addedProduct)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log("Product added!");
            res.send("Product added!\n"+ addedProduct);
        }
    });
}

/* ========================
        ADD PRODUCT END
========================= */


module.exports = {
    home,
    checkout,
    cart,
    productDetails,
    shop,
    addProductForm,
    addProduct
}
