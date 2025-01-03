const Client = require("../model/Client");
const bcrypt = require("bcryptjs");
const Role = require("../model/Role");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ead678ab98e529472a8ba3bb8940653229510e01a9078ef9b15320d385f9df02";

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
        const { first_name, last_name, mobile_no, email, password, city } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the client role
        const clientRole = await Role.findOne({ role_name: "client" });
        if (!clientRole) {
            return res.status(400).json({ message: "Client role not found" });
        }

        // Create the client
        const client = new Client({
            first_name,
            last_name,
            mobile_no,
            email,
            password: hashedPassword,
            city,
            profile_picture: req.file?.originalname || "default_profile.png",
            role_id: clientRole._id, // Explicitly set the role ID
        });

        await client.save();

        // Generate JWT token
        const token = jwt.sign(
            { role: clientRole.role_name, userId: client._id },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Respond with the client data and token
        res.status(201).json({
            message: "Client created successfully",
            client,
            token,
        });
    }
    catch (e) {
        console.error(e); // Log the error for debugging
        res.status(500).json({ message: "An error occurred while creating the client" });
    }
};


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