var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom-test", {useNewUrlParser:true});

var referenceSchema = new mongoose.Schema({
    reference: Number,
    adminID: String
});

var Reference = mongoose.model("Reference", referenceSchema);

module.exports = Reference;
