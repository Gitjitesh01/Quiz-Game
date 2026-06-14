const mongoose = require("mongoose");


const QuizReport = new mongoose.Schema({
  studentid: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Studentschema"
  }],
  quizid: {
    type: mongoose.Schema.Types.ObjectId, ref: "QuizSchema"
  },
});
module.exports = mongoose.model("QuizReport", QuizReport);