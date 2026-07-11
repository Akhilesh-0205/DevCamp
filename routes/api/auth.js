const express = require('express');
const router = express.Router();

// @route                GET api/Auth
//@description           Test route
//@acces                 Public
router.get('/', (req,res) => res.send('Auth Route'));

module.exports = router;