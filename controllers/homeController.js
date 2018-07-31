var Product = require("./../App/modules/Product.js");
var Category = require("./../App/modules/Category.js");
var TempUser = require("./../App/modules/TempUser.js");

Product = Product.Product;

//  Cookie Functions
//  BEGIN
const checkCookie = function (req,res){
    var readCookie = req.cookies;
    if(readCookie.temp === undefined){
        console.log("I didn't know this user earlier. But I will remember next time.");
        return(false);
    }else{
        return(true);
    }
}

const setTempCookie = function(req,res,Function){
    if(!checkCookie(req,res)){
        i = Math.random();
        newTempUser = new TempUser({reference: i});
        newTempUser.save(function(err,addedNewTempUser){
            if(err){
                console.log(err);
                res.render(err);
            }else{
                res.cookie('temp',{"reference":i,"loggedIn":false, "user":addedNewTempUser._id});
                Function();
            }
        });
    }else{

        var readCookie = req.cookies.temp;
        TempUser.findOne({"_id": readCookie.user, "reference": readCookie.reference}, function(err,result){
            if(err){console.log(err);}
            if(result != null){
                //true
                console.log("I remember this user!");
                Function();
            }else{
                //false
                console.log("This user is a hacker!");
                res.send("You tampered with your cookies! Clear cookies and reload.");
            }
        });
    }
}
//  Cookie Functions
//  END

const home = function(req,res){
    setTempCookie(req,res,function(){
            Category.find({}, function(err,categories){
                if(err){
                    console.log(err);
                    res.send("Error! Check log.");
                }else{
                    res.render("./../resources/views/index.ejs",{categories:categories});
                }
            });
        });
}

const checkout = function(req,res){
    setTempCookie(req,res,function(){
        res.render("./../resources/views/checkout.ejs");
    });
}

const cart = function(req,res){
    setTempCookie(req,res,function(){
        res.render("./../resources/views/cart.ejs");
    });
}

const productDetails = function(req,res){
    setTempCookie(req,res,function(){
        var id = req.params.id;
        Product.findOne({"id":id}, function(err,product){
            if(err){
                console.log(err);
                res.send("Error! Check log.");
            }else{
                res.render("./../resources/views/product-details.ejs", {product:product});
            }
        });
    });
}

const shop = function(req,res){
    setTempCookie(req,res,function(){
        var categoryID = req.params.category;
        Category.find({}, function(err,categories){
            if(err){
                console.log(err);
                res.send("Error! Check log.");
            }else{
                Category.findById(categoryID, function(err,category){
                    if(err){
                        console.log(err);
                        res.send(err);
                    }else{
                        Product.find({"category":category.name}, function(err,products){
                            if(err){
                                console.log(err);
                                res.send(err);
                            }else{
                                res.render("./../resources/views/shop.ejs", {products:products, categories:categories});
                            }
                        });
                    }
                });
            }
        });
    });
}

const cartAdd = function(req,res){
    setTempCookie(req,res,function(){
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
    });
}

/* ========================
        ADD PRODUCT BEGIN
========================= */

const addProductForm = function(req,res){
    Category.find({}, function(err,categories){
        res.render("./../resources/views/add-product.ejs", {categories:categories});
    });
}

const addProduct = function(req,res){
    var newProduct = new Product({
        id: req.body.id,
        name: req.body.name,
        shortDesc: req.body.shortDesc,
        longDesc: req.body.longDesc,
        image: req.body.image,
        imageLarge1: req.body.imagelarge1,
        imageLarge2: req.body.imagelarge2,
        imageLarge3: req.body.imagelarge3,
        imageLarge4: req.body.imagelarge4,
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
            res.send("Product added!\n"+ addedProduct);
            
            Category.findOne({"name":req.body.category}, function(err,category){

            category.productList.push(addedProduct);
    });

        }
    });
}

/* ========================
        ADD PRODUCT END
========================= */

/* ========================
        ADD CATEGORY START
========================= */
    const addCategoryForm = function(req,res){
        res.render("./../resources/views/add-category.ejs");
    }

    const addCategory = function(req,res){
        var newCategory = new Category({
            name: req.body.name,
            image: req.body.image
        });
        newCategory.save(function(err, addedCategory){
            console.log("Category added!");
            res.send("Category added!\n" + addedCategory);
        });
    }
/* ========================
        ADD CATEGORY END
========================= */

module.exports = {
    home,
    checkout,
    cart,
    productDetails,
    shop,
    addProductForm,
    addProduct,
    addCategoryForm,
    addCategory
}
