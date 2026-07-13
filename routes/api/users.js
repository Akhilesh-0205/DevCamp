const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// @route                POST api/users
//@description           User register
//@acces                 Public
router.post("/", [check("name", "please enter a name").not().isEmpty(),
    check("email", "please enter a valid email").isEmail(),
    check("password", "enter a password with 6 letters or above").isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors: [{msg: "User already exists"}]});
        }


        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        });
        // Create user instance
        user = new User({
            name,
            email,
            avatar,
            password
        });
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
    res.send("UserRoute");
}
);

module.exports = router;
