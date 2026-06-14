const mongoose = require('mongoose')

const ResponseSchema = mongoose.Schema({
  attenderId:String,
  quizid: String,
  
  quizAttend: [{
    quizid: String,
    questionDetails:[{}],
    NumQuesAttended: Number,
    correctCount: Number,
    points: Number,
    isPass: Boolean,
    quizcreater : String,
    attendCount: Number,
    certificate: Number,
    quizTitle:String,
    quizType: String,
    answer: String,
    quizGrades: [String],
    subject: [String],
    average:Number,
    totalTime:String,
    quizDescription:String,
    language:String,
    totalPoints:Number,
    completedAt:{
      type: Date,
    },
    startedAt:{
      type: Date,
    },
    firstName:String,
    lastName:String,
    orgiName:String,
    paymentType:String,
    amount:Number
  }],
})

module.exports = mongoose.model('quizResponse', ResponseSchema);
