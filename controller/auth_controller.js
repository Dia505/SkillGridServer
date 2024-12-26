const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ead678ab98e529472a8ba3bb8940653229510e01a9078ef9b15320d385f9df02"
const Admin = require("../model/Admin")
const Role = require("../model/Role")

const register = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminRole = await Role.findOne({ role_name: "admin" })
    if (!adminRole) {
        return res.status(400).send("Client role not found");
    }

    const cred = new Admin({ email, password: hashedPassword, role: adminRole._id })
    cred.save();
    res.status(201).json(cred);
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const cred = await Admin.findOne({ email });

    if (!cred || !(await bcrypt.compare(password, cred.password))) {
        return res.status(403).send("Invalid email or password");
    }

    const token = jwt.sign(
        { email: cred.email, role: cred.role },
        SECRET_KEY, { expiresIn: "1 hour" });
    res.json({ token });
};

module.exports = {
    login, register
}