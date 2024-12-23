const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    review_date: {
        type: Date,
        default: Date.now
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client"
    },
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freelancer"
    },
})

const Review = mongoose.model("review", reviewSchema)

module.exports = Review;