const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CancelationSchema = new mongoose.Schema({
    email : String,
    reason : String,
    isActive : Boolean,
    requestDate : Date,
    cancelationDate : Date,
    imageurl : String,
    userId : String,
    subscriptionType : String,
});

module.exports = mongoose.model("Cancelation", CancelationSchema);
