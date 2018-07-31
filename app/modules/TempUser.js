var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom-test", {useNewUrlParser:true});
// var TempUser = require ("./Product.js");

var tempUserSchema = new mongoose.Schema({
    reference: Number,
    cartID: String
});

var TempUser = mongoose.model("TempUser", tempUserSchema);

module.exports = TempUser;
