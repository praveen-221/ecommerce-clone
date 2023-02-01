const Cart = require("../models/cartSchema");

const addItemToCart = (req, res) => {
    try {
        Cart.findOne({ user: req.user._id })
        .exec((err, userCart) => {
            if(err){
                return res.status(404).json({ErrorMsg: err});
            }
            if(userCart){
                //cart already exists and quantity needs to be updated
                const item = userCart.cartItems.find(i => i.product == req.body.cartItems.product);
                let condition, update, filters;

                if(item){
                    condition = {"user": req.user._id, "req.user._id.cartItems.product": req.body.cartItems.product};
                    update = {
                        "$set": {
                            /*
                            * $ - get positional value in the array similar to index usage
                            * $[] - update all the matches
                            * $[arrayFilter name] - update the element matching arrayFilter
                            */
                            "cartItems.$[ele].quantity" : item.quantity + req.body.cartItems.quantity,
                            "cartItems.$[ele].price": req.body.cartItems.price
                        }
                    };
                    filters = {
                        // used to select an element with all the specified matches given below & can use more than one filter with different names ({ele1}, {ele2})
                        "arrayFilters": [
                            {
                                "ele.product": req.body.cartItems.product
                            }
                            /* {
                                "ele2.price": 120000 
                            } */
                        ]
                    };
                    /*
                    * Cart.findOneAndUpdate({"user": req.user._id, "req.user._id.cartItems.product": req.body.cartItems.product}, {
                    *     "$set": {
                    *         "cartItems.$[ele].quantity" : item.quantity + req.body.cartItems.quantity,
                    *         "cartItems.$[ele].price": req.body.cartItems.price
                    *     }
                    * },
                    * {
                    *     // used to select an element with all the specified matches given below & can use more than one filter with different names ({ele1}, {ele2})
                    *     "arrayFilters": [
                    *         {
                    *             "ele.product": req.body.cartItems.product
                    *         }
                    *     ]
                    * })
                    * .exec((err, result) => {
                    *     if(err){
                    *         return res.status(404).json({ErrorMsg: err});
                    *     }
                    *     if(result){
                    *         return res.status(201).json({cart: result});
                    *     }
                    * });
                    */
                }
                else {
                    condition = {user: req.user._id};
                    update = {
                        "$push": {
                            "cartItems": req.body.cartItems                    
                        }
                    };
                    filters = {};
                }
                Cart.findOneAndUpdate(condition, update, filters)
                .exec((err, result) => {
                    if(err){
                        return res.status(404).json({ErrorMsg: err});
                    }
                    if(result){
                        return res.status(201).json({cart: result});
                    }
                });
            }
            else {
                //new cart is added
                const cart = new Cart ({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                });
                cart.save((err, result) => {
                    if(err){
                        return res.status(400).json({ErrorMsg: err});
                    }
                    else {
                        return res.status(201).json({Msg: "Added Successfully", cartItems: result});
                    }
                });
            }
        });
    }
    catch(err){
        return res.status(404).json(err);
    }
};

module.exports = { addItemToCart };