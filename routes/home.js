var express = require("express");

var router = express.Router();

var homeController = require("./../controllers/homeController.js");

router.get('/', (req,res)=>{homeController.home(req,res);});
router.get('/checkout', (req,res)=>{homeController.checkout(req,res);});
router.get('/cart', (req,res)=>{homeController.cart(req,res);});
router.get('/product-details', (req,res)=>{homeController.productDetails(req,res);});
router.get('/shop', (req,res)=>{homeController.shop(req,res);});

module.exports = router;
