const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    file_path: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    caption: {
        type: String,
        required: false
    },
    freelancer_service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freelancer_service"
    },
})

const Portfolio = mongoose.model("portfolio", portfolioSchema)

module.exports = Portfolio;