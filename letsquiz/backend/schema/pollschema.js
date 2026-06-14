const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
   question: String,
   options: [{ optionText: String, votes: { type: Number, default: 0 } }],
 });

 
module.exports = mongoose.model("poll", pollSchema);