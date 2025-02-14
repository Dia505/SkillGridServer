const Appointment = require("../model/Appointment")
const Freelancer_Service = require("../model/Freelancer_Service");
const Notification = require("../model/Notification");

const findAll = async (req, res) => {
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
        // Extract values from the request body
        const { appointment_date, project_duration } = req.body;

        // Calculate the project end date based on appointment_date and project_duration
        let projectEndDate = new Date(appointment_date);

        switch (project_duration.unit) {
            case 'hour':
                projectEndDate.setHours(projectEndDate.getHours() + project_duration.value);
                break;
            case 'day':
                projectEndDate.setDate(projectEndDate.getDate() + project_duration.value);
                break;
            case 'week':
                projectEndDate.setDate(projectEndDate.getDate() + project_duration.value * 7);
                break;
            case 'month':
                projectEndDate.setMonth(projectEndDate.getMonth() + project_duration.value);
                break;
            case 'year':
                projectEndDate.setFullYear(projectEndDate.getFullYear() + project_duration.value);
                break;
            default:
                throw new Error('Invalid duration unit');
        }

        // Add project_end_date to the request body before saving
        req.body.project_end_date = projectEndDate;

        // Create and save the appointment
        const appointment = new Appointment(req.body);
        await appointment.save();

        //For notification
        const savedAppointment = await Appointment.findById(appointment._id).populate({
            path: "freelancer_service_id",
            populate: { path: "freelancer_id" }
        }).populate("client_id");

        const freelancerId = savedAppointment.freelancer_service_id?.freelancer_id?._id;
        console.log("Freelancer ID:", freelancerId);
        const clientName = `${savedAppointment.client_id.first_name} ${savedAppointment.client_id.last_name}`;
        const message = `You have a new appointment request from ${clientName}`;

        const freelancerNotification = new Notification({
            freelancer_id: freelancerId,
            message,
            appointment_id: appointment._id
        });

        await freelancerNotification.save();

        // Emit real-time notification to client
        req.app.get("io").to(freelancerId).emit("new_notification", {
            message,
            appointment_id: appointment._id,
        });

        // Return the created appointment
        res.status(201).json(appointment);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

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
        const { freelancer_service_id } = req.params;
        const appointment = await Appointment.find({ freelancer_service_id })
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
        const { client_id } = req.params;
        const appointment = await Appointment.find({ client_id })
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
        const { appointment_date, project_duration } = req.body;

        // Get the current appointment to preserve existing values
        const existingAppointment = await Appointment.findById(req.params.id);

        // Calculate the new project_end_date
        let projectEndDate = null;

        // If appointment_date is provided, use it, else use the existing appointment's date
        if (appointment_date) {
            projectEndDate = new Date(appointment_date);
        } else {
            projectEndDate = new Date(existingAppointment.appointment_date); // Fallback to existing appointment date
        }

        // If project_duration is provided or if we need to recalculate using existing project_duration
        const duration = project_duration || existingAppointment.project_duration;

        if (duration) {
            switch (duration.unit) {
                case 'hour':
                    projectEndDate.setHours(projectEndDate.getHours() + duration.value);
                    break;
                case 'day':
                    projectEndDate.setDate(projectEndDate.getDate() + duration.value);
                    break;
                case 'week':
                    projectEndDate.setDate(projectEndDate.getDate() + duration.value * 7);
                    break;
                case 'month':
                    projectEndDate.setMonth(projectEndDate.getMonth() + duration.value);
                    break;
                case 'year':
                    projectEndDate.setFullYear(projectEndDate.getFullYear() + duration.value);
                    break;
                default:
                    throw new Error('Invalid duration unit');
            }
        }

        // Set the newly calculated project_end_date to the request body
        req.body.project_end_date = projectEndDate;

        // Proceed with the update
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(appointment);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const acceptAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        //Update the status to true i.e., the freelancer has accepted the offer
        appointment.status = true;
        await appointment.save();

        const updatedAppointment = await Appointment.findById(appointment._id).populate({
            path: "freelancer_service_id",
            populate: { path: "freelancer_id" }
        }).populate("client_id");

        const clientId = updatedAppointment.client_id._id
        const freelancerName = updatedAppointment.freelancer_service_id.freelancer_id.first_name;
        const message = `${freelancerName} has accepted your offer!`

        const clientNotification = new Notification({
            client_id: clientId,
            message,
            appointment_id: appointment._id
        });

        await clientNotification.save();

        // Emit real-time notification to client
        req.app.get("io").to(clientId).emit("new_notification", {
            message,
            appointment_id: appointment._id,
        });

        res.status(200).json();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
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
    update,
    acceptAppointment
}