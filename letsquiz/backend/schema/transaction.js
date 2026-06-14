const mongoose = require("mongoose");


const TransactionSchema = new mongoose.Schema({
    type : String,
    account : String,
    userId: String,
    quizId: String,
    transactionId : String,
    amount: String,
    subscriptionType: String,
    transactionDate: String,
    status : String,
    ownerId : String,
    username : String,
    totalamount : Number,
    useremail : String,
    tax : {
        type : Object,
    },
    persentepaidtoowner : String,
})

module.exports = mongoose.model( "Transaction", TransactionSchema);
