const mongoose = require("mongoose");


const gradeSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  value:{type:String,required:true,trim:true},
  url:{type:String,trim:true},
  isActive:{type:Boolean,required:true,default:true},
},

{ collection: "gradeSchema", timestamps: true }
);
module.exports = mongoose.model("gradeSchema", gradeSchema);