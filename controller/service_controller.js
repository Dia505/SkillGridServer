const Service = require("../model/Service")
const findAll = async (req,res) => {
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
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service)
    }
    catch (e) {
        res.json(e)
    }
}

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
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {new: true});
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