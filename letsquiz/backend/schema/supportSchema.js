const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    supportcode: {
        type: String,
        // required: true
    },
    userPhone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    // name : {
    //     type: String,
    //     required: true,
    // },
    status: {
        type: String,
        required: true,
        trim: true,
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Support', supportSchema);