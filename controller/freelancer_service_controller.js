const Freelancer_Service = require("../model/Freelancer_Service")

const findAll = async (req,res) => {
    try {
        const freelancer_service = await Freelancer_Service.find().populate("freelancer_id").populate("service_id");
        res.status(200).json(freelancer_service);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const freelancer_service = new Freelancer_Service(req.body);
        await freelancer_service.save();
        res.status(201).json(freelancer_service)
    }
    catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const freelancer_service = await Freelancer_Service.findById(req.params.id).populate("freelancer_id").populate("service_id");
        res.status(200).json(freelancer_service);
    }
    catch (e) {
        res.json(e)
    }
}

const findByFreelancerId = async (req, res) => {
    try {
        const {freelancer_id} = req.params;
        const freelancer_service = await Freelancer_Service.find({freelancer_id}).populate("freelancer_id").populate("service_id");
        res.status(200).json(freelancer_service);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const freelancer_service = await Freelancer_Service.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const freelancer_service = await Freelancer_Service.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(freelancer_service);
    }
    catch (e) {
        res.json(e)
    }
}

module.exports = {
    findAll,
    save,
    findById,
    findByFreelancerId,
    deleteById,
    update
}