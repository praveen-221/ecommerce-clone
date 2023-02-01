const express = require('express');
const {createCategory, getCategories} = require("../../controllers/categoryControllers");
const { AuthLogin, adminMiddldeware } = require('../../middleware');
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(path.dirname(__dirname)), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname);
    }
});
const upload = multer({storage: storage});

router.post("/create", AuthLogin, adminMiddldeware, upload.single('categoryImage'), createCategory);
router.get("/getCategories", getCategories);

module.exports = router;