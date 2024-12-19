const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    hourly_rate: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service"
    },
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freelancer"
    },
})

const Freelancer_Service = mongoose.model("freelancer_service", reviewSchema)

module.exports = Freelancer_Service;