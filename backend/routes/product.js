const express = require("express");
const { addProduct, getProductsBySlug } = require("../controllers/productControllers");
const { AuthLogin, adminMiddldeware } = require("../middleware");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const router = express.Router();

// alternative package is 'formidable' 
// File upload is a part of configuration for routes not in controllers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname);
    }
});
const upload = multer({storage: storage});

router.post("/create", AuthLogin, adminMiddldeware, upload.array('productImages'), addProduct);
router.get("/:slug", getProductsBySlug);

module.exports = router;