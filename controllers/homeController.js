var Product = require("./../App/modules/Product.js");

Product = Product.Product;

/*
Create a function that set temp user cookie only if it is not set.
cookie format: {
    loggedIn : boolean,
    user     : string, //(username if loggedIn is true, and random, unique for each browser if loggedIn is false)
                        //temp-user table must be having an _id field which can be used as unique user cookie for each browser.
                        //I must learn how to delete mongodb row(document) automatically after some definite time.
}
*/

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
    var id = req.params.id;
    Product.findOne({"id":id}, function(err,product){
        if(err){
            console.log(err);
            res.send("Error! Check log.");
        }else{
            res.render("./../resources/views/product-details.ejs", {product:product});
        }
    });
}

const shop = function(req,res){
    res.render("./../resources/views/shop.ejs");
}

const cartAdd = function(req,res){
    var productID = req.body.id;
    var productQty = req.body.quantity;
    Product.findOne({"id":id},function(err,product){
        if(err){
            console.log(err);
        }else{
            //  get username from cookies(set 2 types of cookies, logged in and logged out.)
            //  (Logged out must have unique temp username corresponding to temp-user table.)
            //  get cart _id findOne({_id},function(err,cart){  });
            //  push product object to that cart
            //  
            //  make ejs display from the user's cart...

            res.render("./../resources/views/cart.ejs");
        }
    });
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
        category: req.body.category,
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
