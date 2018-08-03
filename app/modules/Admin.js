var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom-test", {useNewUrlParser:true});

var adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

var Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
