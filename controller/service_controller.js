const Service = require("../model/Service")
const findAll = async (req, res) => {
    try {
        const service = await Service.find();
        res.status(200).json(service);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        // Check if the service already exists by service_name
        const existingService = await Service.findOne({ service_name: req.body.service_name });

        let service;
        if (existingService) {
            // If the service already exists, return the existing service
            service = existingService;
        } else {
            // If not, create a new service
            service = new Service(req.body);
            await service.save();
        }

        // Return the service (including the service_id) for use in other parts of the app
        res.status(201).json(service);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


const findById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.status(200).json(service);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(service);
    }
    catch (e) {
        res.json(e)
    }
}

module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update
}