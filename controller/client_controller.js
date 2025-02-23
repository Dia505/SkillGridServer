const Client = require("../model/Client");
const bcrypt = require("bcryptjs");
const Role = require("../model/Role");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ead678ab98e529472a8ba3bb8940653229510e01a9078ef9b15320d385f9df02";
const nodemailer = require("nodemailer");

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

        // Create the client
        const client = new Client({
            first_name,
            last_name,
            mobile_no,
            email,
            password: hashedPassword,
            city,
            profile_picture: req.file?.originalname || "default_profile_img.png"
        });

        await client.save();

        // Generate JWT token
        const token = jwt.sign(
            { role: client.role, userId: client._id },
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

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        const BASE_URL = "http://localhost:3000";

        // Ensure profile_picture contains a full URL
        const profilePicture = client.profile_picture
            ? `${BASE_URL}/client_images/${client.profile_picture}`
            : `${BASE_URL}/client_images/default_profile_img.png`; // Fallback to default image

        res.status(200).json({ ...client._doc, profile_picture: profilePicture });
    } catch (e) {
        res.status(500).json({ message: "Server error", error: e });
    }
};

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
        // Check if password is in the request body
        if (req.body.password) {
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }

        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json(client);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

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

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const client = await Client.findOne({ email });

        if (!client) return res.status(404).json({ message: "Client not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        client.otp = otp;
        client.otpExpiresAt = otpExpiresAt;
        await client.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            protocol: "smtp",
            auth: {
                user: "skillgrid2025@gmail.com",
                pass: "atufivxdidghafoh"
            }
        })

        await transporter.sendMail({
            from: '"SkillGrid Support" <skillgrid2025@gmail.com>',
            to: client.email,
            subject: "Reset Your Password - OTP Verification",
            html: `
                <h1>Reset your password</h1>
                <p>Use the following OTP to reset your password:</p>
                <h2>${otp}</h2>
                <p>If you did not request this, please ignore this email.</p>
            `
        });

        res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const client = await Client.findOne({ email });

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        // Check if OTP matches and if it has expired
        if (client.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (client.otpExpiresAt < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const resetPassword = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { email, newPassword } = req.body;

        const client = await Client.findOne({ email });

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await Client.findOneAndUpdate(
            { email },
            { password: hashedPassword, otp: null, otpExpiresAt: null },
            { new: true }
        );

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update,
    updateProfilePicture,
    sendOtp,
    verifyOtp,
    resetPassword
}