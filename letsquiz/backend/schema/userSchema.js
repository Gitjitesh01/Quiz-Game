const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  isActive: {type: Boolean, default: true},
  organization: String,
  phoneNumber: String,
  about:String,
  city:String,
  usercode : Number ,
  countryName:String,
  countryShort:String,
  userType:String,
  subscriptionExpiryDate:Date,
  firstsubcriptiondiscount:{
    type:Boolean,
    default:true
  },
  subcriptioname : {
    type:String,
    default: null
  },
  requestForCancelation:{
    type:Boolean,
    default:false
  },
  emailVerified:{
    type:Boolean,
    default : false
  },  
  subscriptionType:String,
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
  state:String,
  _id:String,
  profilePic:String
});

module.exports = mongoose.model("User", UserSchema);