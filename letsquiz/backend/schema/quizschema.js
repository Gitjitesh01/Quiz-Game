const mongoose = require('mongoose');



const QuizSchema = new mongoose.Schema({
  quizTitle: String,
  quizDescription: String,
  videoLink: {
    type: Array,
  },
  images: {
    type: Array,
  },
  questions: [
    Object
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  reqPercentage: Number,
  isActive: {
    type: Boolean,
    default: true
  },
  userId: String,
  quizType: String,
  attemptlimit : {
    type : Boolean,
    default:true,
  },
  quizGrades: [],
  subject: [],
  quizUrl: {
    type: String,
    default: ""
  },
  accesstype: {
    type: String,
    default: "public"
  },
  attemptlimiter: {
    type: Boolean,
    default: false
  },
  studentnamecoordination: {
    x : {
      type: Number,
      default: 0
    },
    y : {
      type: Number,
      default: 0
    }
  },
  rating :{
    userId : mongoose.Schema.Types.ObjectId,
    rating : Number,
    time : {
      type : Date,
      default :Date.now()
    },
  },
  avarage_rating : Number,
  totalCredit: Number,
  totalPoint: Number,
  totalQuestions: Number,
  paymentType: String,
  subscriptionId: String,
  language: String,
  coverImage: String,
  musicId: Number,
  themeId: Number,
  certificate: Number,
  customCertificate: {
    type : String,
  },
  numAttempt: Number,
  fontClr: String,
  fontSize: Number,
  fontStyle: String,
  quizMode: Number,
  sections: [],
  orgiName: String,
  competitionName: String,
  customlogo: String,
  discriptionofcertificate: String,
  postiononcertificate : String,
  ownerSignature : String,

  startdate: {
    type: Date,
    required: false,
    default: Date.now
  },
  enddate: {
    type: Date,
    required: false,
    default: Date.now
  },
  timeline: {
    type: Boolean,
    default: false
  },
  wordcloud: [],
  amount: Number,
  certContent: String
});

module.exports = mongoose.model('Quiz', QuizSchema);