const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");


const AdminSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    username: String,
    password: String,
    isActive: {type: Boolean, default: true},
});
// >> For encrypting the Password
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
})

// >> Compare Password

AdminSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcryptjs.compare(enteredPassword, this.password)
}
module.exports = mongoose.model("Admin", AdminSchema);