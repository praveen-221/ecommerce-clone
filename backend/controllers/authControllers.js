const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            console.log(user);
            return res.status(400).json({message: "User already exists"});
        }    
        else {
            const {
                firstName,
                lastName,
                email,
                password,
            } = req.body;
            const userName = "user_" + shortid.generate();
            const hash_password = await bcrypt.hash(password, 10);

            const newuser = new User({
                firstName, lastName, email, hash_password, userName
            });
            newuser.save((err, data)=>{
                if(err){
                    return res.status(400).json({message: "User not created", Error: err});
                } 
                else if(data){
                    return res.status(200).json({message: "User created Successfully", user: data});
                }
            });
        }
    } catch(err){
        return res.status(400).json({message: "[-] Error creating user"});
    }
}

const Login = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            if(user.authenticate(req.body.password)){
                // Create JWT token using 'sign' function using unique user field, private key(any string of choice), expiry time
                const token = jwt.sign({_id: user.id, role: user.role}, process.env.JWT_PRIVATEKEY, {expiresIn: '1h'});
                const {_id, firstName, lastName, email, role, fullName, userName} = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, userName, firstName, lastName, fullName, email, role
                    }
                })
            } else {
                return res.status(400).json({message: "Invalid Password :("});  // 400 - Bad Request 
            }
        }else {
            return res.status(400).json({message: "User not found with given email :("});
        }
    }
    catch(err){
        return res.status(400).json({message: "[-] Error finding User!"})
    }
}

// const AuthLogin = (req, res, next) => {
//     try{
//         // header will have 'Bearer JWTtoken' hence spilt using space( ) & use the index 1(token)s
//         const token = req.headers.authorization.spilt(" ")[1];    // Authorization fiels is present i headers which is used here and then req is made
//         const userid = jwt.verify(token, process.env.JWT_PRIVATEKEY); // verifies the token using key
//         req.userId = userid;
//         next(); // executes the next function in post request
//     }
//     catch(err){
//         return res.status(400).json({message: "User not found!", Error: err});
//     }
// }

const AdminSignup = async (req, res) => {
    try{
        let admin = await User.findOne({email: req.body.email});
        if(admin){
            console.log(admin);
            return res.status(400).json({message: "Admin already exists", severity: "info"});
        }    
        else {
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const userName = "admin_" + shortid.generate();
            const hash_password = await bcrypt.hash(password, 10);

            const newuser = new User({
                firstName, lastName, email, hash_password, userName, role: "admin"
            });
            newuser.save((err, data)=>{
                if(err){
                    return res.status(400).json({message: "Admin not created", error: err, serverity: "error"});
                } 
                else if(data){
                    return res.status(200).json({message: "Admin created successfully", user: data, severity: "success"});
                }
            });
        }
    } catch(err){
        return res.status(400).json({message: "[-] Error creating Admin", serverity: "error"});
    }
}

const AdminLogin = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'admin'){
                // Create JWT token using 'sign' function using unique user field, private key(any string of choice), expiry time
                const token = jwt.sign({_id: user.id, role: user.role}, process.env.JWT_PRIVATEKEY, {expiresIn: '1d'});
                const {_id, firstName, lastName, email, role, fullName, userName} = user;
                res.cookie('token', token, { expiresIn: '1d' })
                res.status(200).json({
                    token,
                    user: {
                        _id, userName, firstName, lastName, fullName, email, role
                    }
                })
            } else {
                return res.status(400).json({message: "Invalid Password :("});  // 400 - Bad Request 
            }
        }else {
            return res.status(400).json({message: "Admin not found with given email :("});
        }
    }
    catch(err){
        return res.status(400).json({message: "[-] Error finding Admin!"})
    }
}

const AdminSignout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: "Signed Out Successfully...!"});
}

module.exports = { Signup, Login, AdminLogin, AdminSignup, AdminSignout };