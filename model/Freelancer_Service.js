const mongoose = require("mongoose")

const freelancerServiceSchema = new mongoose.Schema({
    hourly_rate: {
        type: Number,
        required: true
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

const Freelancer_Service = mongoose.model("freelancer_service", freelancerServiceSchema)

module.exports = Freelancer_Service;