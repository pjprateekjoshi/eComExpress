var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom-test", {useNewUrlParser:true});
var Admin = require ("./Admin.js");

var tempUserSchema = new mongoose.Schema({
    reference: Number,
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});

var TempUser = mongoose.model("TempUser", tempUserSchema);

module.exports = TempUser;
