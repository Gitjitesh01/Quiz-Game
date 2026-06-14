const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");


const superAdminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
    firstname: String,
    lastname: String,
    organization: String,
});
// >> For encrypting the Password
superAdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
})

// >> Compare Password

superAdminSchema.methods.comparePassword = async function (enteredPassword) {

    return await bcryptjs.compare(enteredPassword, this.password)
}
module.exports = mongoose.model("SuperAdmin", superAdminSchema);