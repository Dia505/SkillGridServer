const mongoose = require("mongoose");

const credSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const Credential = mongoose.model(" credential", credSchema);

module.exports = Credential;
