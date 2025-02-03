const mongoose = require("mongoose")

const employmentSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: false,
        default: null
    },
    description: {
        type: String,
        required: false
    },
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freelancer"
    },
})

const Employment = mongoose.model("employment", employmentSchema)

module.exports = Employment;