const mongoose = require('mongoose');

const SubscriptionPlanSchema = new mongoose.Schema({
  mcq: {
    type: Boolean,
    default: false
  },
  fillups: {
    type: Boolean,
    default: false
  },
  truefalse: {
    type: Boolean,
    default: false
  },
  matching: {
    type: Boolean,
    default: false
  },
  draganddrop: {
    type: Boolean,
    default: false
  },
  shortanswers: {
    type: Boolean,
    default: false
  },
  dropdown: {
    type: Boolean,
    default: false
  },
  checkbox: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: Date.now()
  },
  email: {
    type: String
  },
  poll: {
    type: Boolean,
    default: false
  },
  wordcloud: {
    type: Boolean,
    default: false
  },
  imageInQuestions: {
    type: Boolean,
    default: false
  },
  audioInQuestions: {
    type: Boolean,
    default: false
  },
  videoInQuestions: {
    type: Boolean,
    default: false
  },
  certificates: {
    type: Boolean,
    default: false
  },
  certificateTemplates: {
    type: [String]
  },
  ownCertificateTemplate: {
    type: Boolean,
    default: false
  },
  createPaidQuizzes: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  subscriptionName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  subscriptionType: {
    type: String,
    // required: true
  },
  features:{type:Array,required:true}
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);

module.exports = SubscriptionPlan;
