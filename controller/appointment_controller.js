const Appointment = require("../model/Appointment")
const Freelancer_Service = require("../model/Freelancer_Service");

const findAll = async (req,res) => {
    try {
        const appointment = await Appointment.find()
            .populate({
                path: "freelancer_service_id",
                populate: [
                    { path: "freelancer_id" },
                    { path: "service_id" }
                ],
            }).populate("client_id");
        res.status(200).json(appointment);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment)
    }
    catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate({
                path: "freelancer_service_id",
                populate: [
                    { path: "freelancer_id" },
                    { path: "service_id" }
                ],
            }).populate("client_id");
        res.status(200).json(appointment);
    }
    catch (e) {
        res.json(e)
    }
}

const findByFreelancerServiceId = async (req, res) => {
    try {
        const {freelancer_service_id} = req.params;
        const appointment = await Appointment.find({freelancer_service_id})
            .populate({
                path: "freelancer_service_id",
                populate: [
                    { path: "freelancer_id" },
                    { path: "service_id" }
                ],
            }).populate("client_id");
        res.status(200).json(appointment);
    }
    catch (e) {
        res.json(e)
    }
}

const findByClientId = async (req, res) => {
    try {
        const {client_id} = req.params;
        const appointment = await Appointment.find({client_id})
            .populate({
                path: "freelancer_service_id",
                populate: [
                    { path: "freelancer_id" },
                    { path: "service_id" }
                ],
            }).populate("client_id");
        res.status(200).json(appointment);
    }
    catch (e) {
        res.json(e)
    }
}

const findByFreelancerId = async (req, res) => {
    try {
        const freelancerServices = await Freelancer_Service.find({ freelancer_id: req.params.freelancer_id });

        if (!freelancerServices || freelancerServices.length === 0) {
            return res.status(404).json({ message: "Freelancer services not found" });
        }

        const serviceIds = freelancerServices.map(service => service._id);

        const appointments = await Appointment.find({ freelancer_service_id: { $in: serviceIds } })
            .populate({
                path: "freelancer_service_id",
                populate: [
                    { path: "freelancer_id" },
                    { path: "service_id" }
                ]
            })
            .populate("client_id"); // Separate populate call

        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching freelancer appointments:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const deleteById = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(appointment);
    }
    catch (e) {
        res.json(e)
    }
}

module.exports = {
    findAll,
    save,
    findById,
    findByFreelancerServiceId,
    findByClientId,
    findByFreelancerId,
    deleteById,
    update
}