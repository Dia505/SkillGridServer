const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    payment_status: {
        type: Boolean,
        default: false,
        required: true
    },
    payment_timestamp: {
        type: Date,
        default: null
    },
    appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment"
    },
    billing_address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "billing_address"
    }
})

const Payment = mongoose.model("payment", paymentSchema)

module.exports = Payment;