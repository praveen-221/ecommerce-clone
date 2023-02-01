const express = require("express");
const { addItemToCart } = require("../controllers/cartControllers");
const { AuthLogin, userMiddldeware } = require('../middleware');
const router = express.Router();

router.post("/user/cart/addtocart", AuthLogin, userMiddldeware, addItemToCart);

module.exports = router;