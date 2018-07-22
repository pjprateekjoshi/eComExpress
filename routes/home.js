var express = require("express");

var router = express.Router();

var homeController = require("./../controllers/homeController.js");

router.get('/', (req,res)=>{homeController.home(req,res);});



/*======================
        DELETE
======================*/
router.get('/another', (req,res)=>{
    res.send("This is another page");
});
/*===========================
        TILL HERE
===========================*/


module.exports = router;