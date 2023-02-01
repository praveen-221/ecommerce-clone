const jwt = require("jsonwebtoken");

const AuthLogin = (req, res, next) => {
    if(req.headers.authorization){
        try{
            // header will have 'Bearer JWTtoken' hence spilt using space( ) & use the index 1(token)
            const token = req.headers.authorization.split(" ")[1];    // Authorization fiels is present i headers which is used here and then req is made
            const user = jwt.verify(token, process.env.JWT_PRIVATEKEY); // verifies the token using key
            req.user = user;
        }
        catch(err){
            return res.status(404).json({message: "User not found!", Error: err});
        }
    } else {
        return res.status(500).json({ message: "Authorization required :[" });
    }
    // if this is included in if block it will throw err of "headers can't set after sending to client" since next send to client
    next(); // executes the next function in post request
}

const adminMiddldeware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({ message: "Access Denied :], Not an Admin" });
    }
    next();
}

const userMiddldeware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({ message: "Access Denied :], Not Signed In" });
    }
    next();
}

module.exports = { AuthLogin, adminMiddldeware, userMiddldeware };