const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY="FitnessTracker"
require('dotenv').config();


module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return jwt.sign(data, JWT_SECRET_KEY, {});
}


module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        // No token at all
        return res.status(401).send({
            auth: "Failed",
            message: "Please register first"
        });
    }

    // Remove "Bearer " prefix
    token = token.slice(7); // slice from index 7 to the end

    jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            // Token invalid or expired
            return res.status(403).send({
                auth: "Failed",
                message: "Please register first"
            });
        }

        // Valid token, attach user to request
        req.user = decodedToken;
        next();
    });
};



module.exports.verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        })
    }
}



module.exports.errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: err.code || 'SERVER_ERROR',
            details: err.details
        }
    });
};