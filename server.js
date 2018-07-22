var express = require ("express");
    
var app = express();

var home = require ("./routes/home.js");

app.use(express.static('resources/public'));

var port = 8000;

app.use('/', home);


app.listen(port, ()=>{console.log(`App running on localhost:${port}`);});