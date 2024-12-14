const mongoose = require("mongoose")

const freelancerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
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
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    job_category: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    years_of_experience: {
        type: Number,
        required: true,
        min: 0
    },
    profile_picture: {
        type: String,
        required: false
    },
    background_picture: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
})

const Freelancer = mongoose.model("freelancer", freelancerSchema)

module.exports = Freelancer;