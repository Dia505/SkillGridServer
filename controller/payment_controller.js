const Payment = require("../model/Payment");
const Appointment = require("../model/Appointment")

const findAll = async (req,res) => {
    try {
        const payment = await Payment.find()
            .populate({
                path: "appointment_id",
                populate: [
                    { path: "client_id" },
                    { path: "freelancer_service_id" }
                ]
            }).populate("billing_address_id");
        res.status(200).json(payment);
    }
    catch (e) {
        res.json(e)
    }
}

const calculateAmount = async (appointmentId) => {
    try {
        // Fetch the appointment data
        const appointment = await Appointment.findById(appointmentId)
            .populate('freelancer_service_id');  // Populate freelancer_service_id to get the hourly_rate

        if (!appointment) {
            throw new Error("Appointment not found");
        }

        // Extract values
        const { project_duration } = appointment;
        const { hourly_rate } = appointment.freelancer_service_id;

        // Convert project duration value to working hours (assuming 8 hours)
        let durationInHours;
        switch (project_duration.unit) {
            case 'hour':
                durationInHours = project_duration.value;
                break;
            case 'day':
                durationInHours = project_duration.value * 8;
                break;
            case 'week':
                durationInHours = project_duration.value * 6 * 8;
                break;
            case 'month':
                durationInHours = project_duration.value * 26 * 8;
                break;
            case 'year':
                durationInHours = project_duration.value * 313 * 8;
                break;
            default:
                throw new Error("Invalid project duration unit");
        }

        // Calculate the amount
        const amount = hourly_rate * durationInHours;

        return amount;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

const save = async (req, res) => {
    try {
        // Calculate the amount based on the appointment ID (assuming appointment_id is provided in the body)
        const appointmentId = req.body.appointment_id;
        const calculatedAmount = await calculateAmount(appointmentId);

        // Add the amount to the request body
        // Renamed to calculatedAmount to avoid redeclaration
        req.body.amount = calculatedAmount;

        // Create and save the Payment
        const { payment_method, payment_status, appointment_id, billing_address_id } = req.body;

        const payment = new Payment({
            payment_method,
            payment_status,
            amount: calculatedAmount,
            appointment_id,
            billing_address_id,
            payment_timestamp: payment_status ? Date.now() : null  // Only set the timestamp if payment is successful
        });

        await payment.save();

        // Send the response with the payment data
        res.status(201).json(payment);
    } catch (e) {
        res.json({ error: e.message });
    }
};

const findById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate({
                path: "appointment_id",
                populate: [
                    { path: "client_id" },
                    { path: "freelancer_service_id" }
                ]
            }).populate("billing_address_id");
        res.status(200).json(payment);
    }
    catch (e) {
        res.json(e)
    }
}

const findByAppointmentId = async (req, res) => {
    try {
        const {appointment_id} = req.params;
        const payment = await Payment.find({appointment_id})
            .populate({
                path: "appointment_id",
                populate: [
                    { path: "client_id" },
                    { path: "freelancer_service_id" }
                ]
            }).populate("billing_address_id");
        res.status(200).json(payment);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(payment);
    }
    catch (e) {
        res.json(e)
    }
}

module.exports = {
    findAll,
    save,
    findById,
    findByAppointmentId,
    deleteById,
    update
}