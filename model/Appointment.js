const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    appointment_purpose: {
        type: String,
        required: true
    },
    appointment_date: {
        type: Date,
        required: true
    },
    project_duration: {
        value: {
            type: Number,
            required: true,
            min: 1, // Ensure a positive duration
        },
        unit: {
            type: String,
            required: true,
            enum: ["hour", "day", "week", "month", "year"], // Restrict to valid units
        },
    },
    project_end_date: {
        type: Date,
        required: false
    },
    appointment_time: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    freelancer_service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freelancer_service",
        required: true
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
        required: true
    }
});

// Add a compound unique index for date, time, and freelancer
// appointmentSchema.index(
//     { appointment_date: 1, appointment_time: 1, freelancer_service_id: 1 },
//     { unique: true }
// );

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;
