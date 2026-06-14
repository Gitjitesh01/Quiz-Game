const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");


const Studentschema = new mongoose.Schema({
  _id:String,
  firstname: String,
  lastname: String,
  password: String,
  createdAt: Date,
  phoneNumber: Number,
  email: String,
  
  profilePic:String,
  quizAttend: [{
    quizid: String,
    responseid:String,
    profilePic:String
   /* NumQuesAttended: Number,
    correctCount: Number,
    questionDetails:[{}],
    points: Number,
    isPass: Boolean,
    attendCount: Number,
    certificate: Number,
    quizTitle:String,
    average:Number,
    totalTime:String,
    quizDescription:String,
    language:String,
    totalPoints:Number,
    completedAt:String,
    startedAt:String,*/
  }],
  organization: String,
  isActive:{type: Boolean, default: true},
  about:String,
  city:String,
  countryName:String,
  countryShort:String,
  state:String
});

// >> Password Encryption
Studentschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
})

// >> Compare Password

Studentschema.methods.comparePassword = async function (enteredPassword) {

  return await bcryptjs.compare(enteredPassword, this.password)
}
module.exports = mongoose.model("Studentschema", Studentschema);
