const jwt = require("jsonwebtoken");
const SECRET_KEY = "ead678ab98e529472a8ba3bb8940653229510e01a9078ef9b15320d385f9df02"

function authenticateToken(req, res, next) {
    const token = req.header("authorization")?.split(" ")[1];
    if(!token) {
        return res.status(401).send("Access denied: no token provided")
    }

    try{
        const verified = jwt.verify(token, SECRET_KEY) 
        req.user = verified;
        next()
    }
    catch(e) {
        res.status(400).send("Invalid token")
    }
}

function authorizeRole(role) {
    return(req, res, next) => {
        if(req.user.role != role) {
            return res.status(403).send(" Access denied: Insufficient permission")
        }
        else {
            return
        }
    }
}

module.exports = {authenticateToken, authorizeRole}