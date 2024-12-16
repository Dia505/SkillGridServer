const mongoose = require("mongoose")

const educationSchema = new mongoose.Schema({
    degree_title: {
        type: String,
        required: true
    },
    institution_name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freelancer"
    },
})

const Education = mongoose.model("education", educationSchema)

module.exports = Education;