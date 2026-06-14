const mongoose = require('mongoose')

const quizTransactionSchema = new mongoose.Schema({
  quizid: String,
  userid: String,
  amount: Number,
  transactionDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('quizTransaction', quizTransactionSchema)
