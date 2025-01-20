const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    file_path: [String],
    upload_date: {
        type: Date,
        default: Date.now
    },
    freelancer_service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freelancer_service"
    },
})

const Portfolio = mongoose.model("portfolio", portfolioSchema)

module.exports = Portfolio;