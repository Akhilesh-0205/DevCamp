const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route                POST api/users
//@description           User register
//@acces                 Public
router.post("/", [check("name", "please enter a name").not().isEmpty(),
    check("email", "please enter a valid email").isEmail(),
    check("password", "enter a password with 6 letters or above").isLength({min: 6})
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    res.send("UserRoute");
}
);

module.exports = router;
