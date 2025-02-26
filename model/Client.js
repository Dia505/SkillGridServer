const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        default: "default_profile_img.png",
        required: false
    },
    role: {
        type: String,
        default: "client",
        required: true
    },
    otp: { 
        type: String, 
        required: false 
    },
    otpExpiresAt: { 
        type: Date, 
        required: false 
    },
})

const Client = mongoose.model("client", clientSchema)

module.exports = Client;