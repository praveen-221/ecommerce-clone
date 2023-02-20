const express = require("express");
const { createPage } = require("../../controllers/adminApp/pageControllers");
const { upload, AuthLogin, adminMiddldeware } = require("../../middleware");
const router = express.Router();

// upload needs to take 2 fields of image input banners, product images done using field method
router.post(`/page/create`, AuthLogin, adminMiddldeware, upload.fields([
    { name: "bannerImages"},
    { name: "products" }
]), createPage);

module.exports = router;