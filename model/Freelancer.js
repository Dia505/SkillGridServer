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
        required: false
    },
    job_category: {
        type: String,
        required: false
    },
    profession: {
        type: String,
        required: false
    },
    skills: {
        type: String,
        required: false
    },
    years_of_experience: {
        type: Number,
        required: false,
        min: 0
    },
    profile_picture: {
        type: String,
        default: "default_profile.png",
        required: false
    },
    background_picture: {
        type: String,
        default: "default_bg_img.jpg",
        required: false
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    role : {
        type: String,
        default: "freelancer",
        required: true
    }
})

const Freelancer = mongoose.model("freelancer", freelancerSchema)

module.exports = Freelancer;