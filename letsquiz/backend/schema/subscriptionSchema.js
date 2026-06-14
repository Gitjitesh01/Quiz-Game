const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
   
   userId:String,
    quizId:String,
    amount:String,
subscriptionType:String,
transactionDate:String
})

module.exports = mongoose.model('subscription', SubscriptionSchema);