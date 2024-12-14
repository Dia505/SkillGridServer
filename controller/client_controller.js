const Client = require("../model/Client")

const findAll = async (req,res) => {
    try {
        const client = await Client.find();
        res.status(200).json(client);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const {first_name, last_name, mobile_no, email, password, city} = req.body
        const client = new Client({
            first_name,
            last_name,
            mobile_no,
            email,
            password,
            city,
            profile_picture: req.file.originalname
        });
        await client.save();
        res.status(201).json(client)
    }
    catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.status(200).json(client);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(client);
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