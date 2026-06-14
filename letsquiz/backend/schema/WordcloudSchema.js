const mongoose = require("mongoose");

const WordcloudSchema = new mongoose.Schema({
   question: String,
   options: [{ votes: { type: Number, default: 1 } }],
   
 });

 const Poll = mongoose.model('Wordcloud', WordcloudSchema);