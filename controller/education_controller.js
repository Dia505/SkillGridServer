const Education = require("../model/Education")

const findAll = async (req,res) => {
    try {
        const education = await Education.find().populate("freelancer_id");
        res.status(200).json(education);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const education = new Education(req.body);
        await education.save();
        res.status(201).json(education)
    }
    catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id).populate("freelancer_id");
        res.status(200).json(education);
    }
    catch (e) {
        res.json(e)
    }
}

const findByFreelancerId = async (req, res) => {
    try {
        const {freelancer_id} = req.params;
        const education = await Education.find({freelancer_id}).populate("freelancer_id");
        res.status(200).json(education);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(education);
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