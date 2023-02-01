// package to validate input fields either automatically or in a manually described format
const { check, validationResult } = require("express-validator");

exports.checkSignup = [
    // check('userName')
    // .notEmpty()
    // .withMessage("userName is required :("),
    check('firstName')
    .notEmpty()
    .withMessage("Firstname is required :("),
    check('lastName')
    .notEmpty()
    .withMessage("Lastname is required :("),
    check("email")
    .isEmail()
    .withMessage("Not a valid email address :/"),
    check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long :!")
];

exports.checkLogin = [
    check("email")
    .isEmail()
    .withMessage("Not a valid email address :/"),
    check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long :!")
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ErrorMsg: errors.array()[0].msg});
    }
    next(); // after validation successful forward to controllers otherwise no action will take place
}