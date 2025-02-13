const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freelancer",
        required: false
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
        required: false
    },
    message: {
        type: String,
        required: true
    },
    notification_date: {
        type: Date,
        default: Date.now
    },
    appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment",
        required: false
    },
    read: { 
        type: Boolean, 
        default: false 
    },
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;