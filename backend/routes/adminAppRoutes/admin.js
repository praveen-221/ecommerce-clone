const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const {AdminSignup, AdminLogin, AdminSignout} = require("../../controllers/authControllers");
const { checkSignup, checkLogin, validate } = require("../../validators/validation.js");
const { AuthLogin, adminMiddldeware } = require("../../middleware"); 
const { getAdminData } = require("../../controllers/adminApp/initDataControllers");

dotenv.config();

router.post('/signup', checkSignup, validate, AdminSignup);
router.post('/login', checkLogin, validate, AdminLogin);
router.post('/signout', AuthLogin, AdminSignout);

// get initial categories & products on login
router.post('/initData', AuthLogin, adminMiddldeware, getAdminData);

module.exports = router;