var express = require("express");

var router = express.Router();

var homeController = require("./../controllers/homeController.js");

router.get('/', (req,res)=>{homeController.home(req,res);});
router.get('/checkout', (req,res)=>{homeController.checkOut(req,res);});
router.get('/cart', (req,res)=>{homeController.cart(req,res);});
router.post('/cart', (req,res)=>{homeController.cartAdd(req,res);});
router.get('/product-details/:id', (req,res)=>{homeController.productDetails(req,res);});
router.get('/shop/:category', (req,res)=>{homeController.shop(req,res);});
router.get('/removeFromCart/:index', (req,res)=>{homeController.removeFromCart(req,res)});
router.post('/order', (req,res)=>{homeController.order(req,res);});



router.get('/admin/login', (req,res)=>{homeController.adminLoginForm(req,res);});
router.post('/admin/dashboard', (req,res)=>{homeController.allOrders(req,res);});

router.get('/admin/orders', (req,res)=>{homeController.allOrders(req,res);});
router.get('/admin/orders/:id', (req,res)=>{homeController.orderAdmin(req,res);});
//
router.get('/admin/add-product', (req,res)=>{homeController.addProductForm(req,res);});
router.post('/admin/add-product', (req,res)=>{homeController.addProduct(req,res);});
router.get('/admin/add-category', (req,res)=>{homeController.addCategoryForm(req,res);});
router.post('/admin/add-category', (req,res)=>{homeController.addCategory(req,res);});
//

module.exports = router;
