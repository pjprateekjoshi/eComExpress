var express = require("express");

var router = express.Router();

var homeController = require("./../controllers/homeController.js");

router.get('/', (req,res)=>{homeController.home(req,res);});
router.get('/checkout', (req,res)=>{homeController.checkout(req,res);});
router.get('/cart', (req,res)=>{homeController.cart(req,res);});
router.post('/cart', (req,res)=>{homeController.cartAdd(req,res);});
router.get('/product-details/:id', (req,res)=>{homeController.productDetails(req,res);});
router.get('/shop/:category', (req,res)=>{homeController.shop(req,res);});

//
router.get('/add-product', (req,res)=>{homeController.addProductForm(req,res);});
router.post('/add-product', (req,res)=>{homeController.addProduct(req,res);});
router.get('/add-category', (req,res)=>{homeController.addCategoryForm(req,res);});
router.post('/add-category', (req,res)=>{homeController.addCategory(req,res);});
//

module.exports = router;
