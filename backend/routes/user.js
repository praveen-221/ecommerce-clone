const express = require("express");
const router = express.Router();
const { Signup, Login } = require("../controllers/authControllers");
const { checkLogin, checkSignup, validate } = require("../validators/validation.js")
const dotenv = require("dotenv");
const { AuthLogin } = require("../middleware");

dotenv.config();

router.post('/signup', checkSignup, validate, Signup);
router.post('/login', checkLogin, validate, Login);
router.post('/profile', AuthLogin, (req, res) => {
    return res.status(200).json({message: 'profile found', UserID: req.userId});
})

module.exports = router;