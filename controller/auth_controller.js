const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ead678ab98e529472a8ba3bb8940653229510e01a9078ef9b15320d385f9df02"
const Credential = require("../model/Credentials")

const register = async(req, res) => {
    const {email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const cred = new Credential({email, password:hashedPassword, role})
    cred.save();
    res.status(201).send(cred);
};

const login = async(req, res) => {
    const {email, password} = req.body;
    const cred = await Credential.findOne({email});

    if(!cred || !(await bcrypt.compare(password, cred.password))) {
        return res.status(403).send("Invalid email or password");
    }

    const token = jwt.sign(
        {email: cred.email, role: cred.role},
        SECRET_KEY, {expiresIn: "1 hour"});
    res.json({token});
};

module.exports = {
    login, register
}