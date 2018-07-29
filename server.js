var express = require ("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
 

var app = express();

var home = require ("./routes/home.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


var port = 8000;

app.use('/', home);
app.use(express.static('resources/public'));
app.use('/product-details', express.static('resources/public'));
app.use('/shop', express.static('resources/public'));

app.listen(port, ()=>{console.log(`App running on localhost:${port}`);});
