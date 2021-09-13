const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header('x-auth-token');

    if(!token){

        res.status(401).json({ message: "Authorization token is required! Access denied!" });

    } else {

        try{

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;
            next();

        } catch(e) {

            res.status(400).json({ message: "Invalid token!" });

        }

    }
    
};

module.exports = auth;