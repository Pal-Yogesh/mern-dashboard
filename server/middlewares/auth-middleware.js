const jwt = require("jsonwebtoken");
const User = require("../models/user-model");


const authMiddleware = async (req, res, next) =>{

    const token = req.header("Authorization");

    if(!token){
        // if u use expire token , you will receive 401 response.
        return res
        .status(401)
        .json({ message: "Unauthorized HTTP, Token Not Provided" });
    }

    // assuming token in forma "Bearer" <jwtToken>, Removing the "Bearer" prefix

    
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("Token from auth middleware", token);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        const userData = await User.findOne({ email: isVerified.email }).
        select({ password: 0, });
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized! Invalid Token" });
    }


};

module.exports = authMiddleware;