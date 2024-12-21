const Employment = require("../model/Employment")

const findAll = async (req,res) => {
    try {
        const employment = await Employment.find().populate("freelancer_id");
        res.status(200).json(employment);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const employment = new Employment(req.body);
        await employment.save();
        res.status(201).json(employment)
    }
    catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const employment = await Employment.findById(req.params.id).populate("freelancer_id");
        res.status(200).json(employment);
    }
    catch (e) {
        res.json(e)
    }
}

const findByFreelancerId = async (req, res) => {
    try {
        const {freelancer_id} = req.params;
        const employment = await Employment.find({freelancer_id}).populate("freelancer_id");
        res.status(200).json(employment);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const employment = await Employment.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const employment = await Employment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(employment);
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