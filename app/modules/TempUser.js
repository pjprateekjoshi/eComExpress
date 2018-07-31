var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom-test", {useNewUrlParser:true});
var TempUser = require ("./Cart.js");

var tempUserSchema = new mongoose.Schema({
    reference: Number,
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TempCart"
    }
});

var TempUser = mongoose.model("TempUser", tempUserSchema);

module.exports = TempUser;
