const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");


const TeacherSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  isActive: {type: String, default: true},
  organization: String,
  phoneNumber: String,
  about:String,
  city:String,
  countryName:String,
  countryShort:String,
  state:String,
  _id:String,
  profilePic:String
});
// >> For encrypting the Password
TeacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
})

// >> Compare Password

TeacherSchema.methods.comparePassword = async function (enteredPassword) {

  return await bcryptjs.compare(enteredPassword, this.password)
}
module.exports = mongoose.model("Teacher", TeacherSchema);