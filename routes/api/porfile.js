const express = require('express');
const router = express.Router();

// @route                GET api/Profile
//@description           Test route
//@acces                 Public
router.get('/', (req,res) => res.send('Profile Route'));

module.exports = router;