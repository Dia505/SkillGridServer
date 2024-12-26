const mongoose = require("mongoose")
const Role = require("../model/Role")

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
        default: "default_profile.png",
        required: false
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }
})

const Client = mongoose.model("client", clientSchema)

module.exports = Client;