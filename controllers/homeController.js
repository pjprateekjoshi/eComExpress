var bodyParser = require("body-parser");

const home = function(req,res){
    res.render("./../resources/views/index.ejs");
}

module.exports = {
    home
}
