var Product = require("./../App/modules/Product.js");
var Category = require("./../App/modules/Category.js");
var TempUser = require("./../App/modules/TempUser.js");
var TempCart = require("./../App/modules/TempCart.js");
var Order = require("./../App/modules/Order.js");

Product = Product.Product;

//  Cookie Functions
//  BEGIN
const checkCookie = function (req,res){
    var readCookie = req.cookies;
    if(readCookie.temp === undefined){
        return(false);
    }else{
        return(true);
    }
}

const setTempCookie = function(req,res,Function){
    if(!checkCookie(req,res)){
        i = Math.random();
        newTempCart = new TempCart({});
        newTempCart.save();
        newTempUser = new TempUser({
            reference: i,
            cartID: newTempCart
        });
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
                Function();
            }else{
                //false
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

const checkOut = function(req,res){
    setTempCookie(req,res,function(){
        var tempUserID = req.cookies.temp.user;
        TempUser.findById(tempUserID).populate("cartID")
        .exec(function(err,theTempUser){
            TempCart.findById(theTempUser.cartID._id).populate("tempCartContents")
            .exec(function(err,theTempCart){        
        
                var total = 0;
                for(i=0;i<theTempCart.tempCartContents.length;i++){
                    total = total + theTempCart.tempCartContents[i].price;
                }
                res.render("./../resources/views/checkout.ejs",{total:total});
            });
        });
    });
}

const cart = function(req,res){
    setTempCookie(req,res,function(){
        var tempUserID = req.cookies.temp.user;
        TempUser.findById(tempUserID).populate("cartID")
        .exec(function(err,theTempUser){
            TempCart.findById(theTempUser.cartID._id).populate("tempCartContents")
            .exec(function(err,theTempCart){
                res.render("./../resources/views/cart.ejs", {tempCartContents:theTempCart.tempCartContents});
            });
        });
    });
}

const productDetails = function(req,res){
    setTempCookie(req,res,function(){
        var id = req.params.id;
        if(id != "default"){
            Product.findOne({"id":id}, function(err,product){
                if(err){
                    console.log(err);
                    res.send("Error! Check log.");
                }else{
                    res.render("./../resources/views/product-details.ejs", {product:product});
                }
            });
        }else{
            Product.findOne({}, function(err,product){
                if(err){
                    console.log(err);
                    res.send("Error! Check log.");
                }else{
                    res.render("./../resources/views/product-details.ejs", {product:product});
                }
            });
        }
    });
}

const shop = function(req,res){
    setTempCookie(req,res,function(){
        var categoryID = req.params.category;
        if(categoryID != "default"){
            Category.find({}, function(err,categories){
                if(err){
                    console.log(err);
                    res.send("Error! Check log.");
                }else{
                    Category.findById(categoryID).populate("productList")
                    .exec(function(err,category){
                        if(err){
                            console.log(err);
                            res.send(err);
                        }else{
                            res.render("./../resources/views/shop.ejs", {category:category, categories:categories});
                        }
                    });
                }
            });
        }else{
            Category.find({}, function(err,categories){
                if(err){
                    console.log(err);
                    res.send("Error! Check log.");
                }else{
                    Category.findOne({}).populate("productList")
                    .exec(function(err,category){
                        if(err){
                            console.log(err);
                            res.send(err);
                        }else{
                            res.render("./../resources/views/shop.ejs", {category:category, categories:categories});
                        }
                    });
                }
            });
        }
    });
}

const cartAdd = function(req,res){
    setTempCookie(req,res,function(){
        var productID = req.body.id;
        // var productQty = req.body.quantity;
        var tempUserID = req.cookies.temp.user
        TempUser.findById(tempUserID).populate("cartID")
        .exec(function(err,theTempUser){
                theTempUser.cartID.tempCartContents.push(productID);
                theTempUser.cartID.save();
                res.redirect("/shop/default");
        });
    });
}

const removeFromCart = function(req,res){
    setTempCookie(req,res,function(){
        var index = req.params.index;
        var tempUserID = req.cookies.temp.user
        TempUser.findById(tempUserID).populate("cartID")
        .exec(function(err,theTempUser){
                theTempUser.cartID.tempCartContents.splice(index,1);
                theTempUser.cartID.save();
                res.redirect("/cart");
        });
    });
}

const order = function(req,res){
    setTempCookie(req,res,function(){
        var tempUserID = req.cookies.temp.user;
        TempUser.findById(tempUserID).populate("cartID")
        .exec(function(err,theTempUser){
            TempCart.findById(theTempUser.cartID._id).populate("tempCartContents")
            .exec(function(err,theTempCart){
                var total = 0;
                for(i=0;i<theTempCart.tempCartContents.length;i++){
                    total = total + theTempCart.tempCartContents[i].price;
                }
                var newOrder = new Order({
                    username: tempUserID,
                    status: "Placed",
                    orderContents: theTempCart.tempCartContents,
                    name: req.body.name,
                    address: req.body.address,
                    contactNumber: req.body.contactnumber,
                    email: req.body.email,
                    comment: req.body.comment,
                    total: req.body.total
                });
                newOrder.save();
                theTempCart.tempCartContents = [];
                theTempCart.save();
                res.send("Success!");
            });
        });
    });
}


/* ========================
    A
        D
            M
                I
                    N
========================= */

//Start admin cookie functions

const checkAdminCookie = function(req,res){
    var readCookie = req.cookies;
    if(readCookie.admin === undefined){
        return(false);
    }else{
        return(true);
    }
}

const verifyAdmin = function(req,res){
    if(checkAdminCookie(req,res)){
        var readCookie = req.cookies.admin;
        Reference.findOne({"user": readCookie.user, "reference": readCookie.reference}, function(err,result){
            if(err){console.log(err);}
            if(result != null){
                //true
                Function();
            }else{
                //false
                res.redirect("/admin/login");
            }
        });
    }else{
        res.redirect("/admin/login");
    }
}

//End admin cookie functions

const adminLoginForm = function(req,res){
    if(!checkAdminCookie(req,res)){
        res.render("./../resources/views/login.ejs");
    }else{
        res.redirect("/admin");
    }
}

const adminLogin = function(req,res){

    i = Math.random();
    newReference = new Reference({
        reference: i,
        adminID: req.body.username
    });
    newReference.save(function(err,addedReference){
        if(err){
            console.log(err);
            res.render(err);
        }else{
            res.cookie('admin',{"reference":i, "admin":req.body.admin});
            Function();
        }
    });

}

const admin = function(req,res){
    if(!checkAdminCookie(req,res)){
        res.redirect("/admin/login");
    }else{
        verifyAdmin(req,res,function(){
            res.render("./../resources/views/dashboard.ejs");
        });
    }
}

//STILL NEED TO CHECK
//
//AND AUTHENTICATE
//
//THE FOLLOWING CODE!!!

const allOrders = function(req,res){
    Order.find({},function(err,orders){
        res.render("./../resources/views/orders.ejs",{orders:orders});
    });
}

const orderAdmin = function(req,res){
    Order.findById(req.params.id).populate("orderContents")
    .exec(function(err,order){
        if (err){
            console.log(err);
        }else{
            console.log(order);
            res.render("./../resources/views/single-order.ejs",{order:order})
        }
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
                category.save(function(err,data){
                    if(err) console.log(err);
                });
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
            res.send("Category added!\n" + addedCategory);
        });
    }
/* ========================
        ADD CATEGORY END
========================= */

module.exports = {
    home,
    checkOut,
    cart,
    productDetails,
    shop,
    addProductForm,
    addProduct,
    addCategoryForm,
    addCategory,
    cartAdd,
    removeFromCart,
    order,
    allOrders,
    orderAdmin
}
