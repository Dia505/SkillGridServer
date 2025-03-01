const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(user, "ead678ab98e529472a8ba3bb8940653229510e01a9078ef9b15320d385f9df02");
};

module.exports = { generateToken };
