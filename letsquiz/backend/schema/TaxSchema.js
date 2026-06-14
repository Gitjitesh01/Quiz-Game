const mongoose = require("mongoose");

const TaxSchema = new mongoose.Schema({
    taxName: String,
    taxPercentage: Number,
    isActive: {type: Boolean, default: true},
    taxType: String,
    taxDescription: String,
});

module.exports = mongoose.model("TaxSchema", TaxSchema);