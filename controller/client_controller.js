const Client = require("../model/Client");
const bcrypt = require("bcryptjs");

const findAll = async (req, res) => {
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
        const { first_name, last_name, mobile_no, email, password, city } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const client = new Client({
            first_name,
            last_name,
            mobile_no,
            email,
            password: hashedPassword,
            city,
            profile_picture: req.file?.originalname || "default_profile.png",
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
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(client);
    }
    catch (e) {
        res.json(e)
    }
}

const updateProfilePicture = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const client = await Client.findByIdAndUpdate(
        req.params.id,
        { profile_picture: req.file.filename },
        { new: true }
    );

    if (!client) {
        return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);
};

module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update,
    updateProfilePicture
}