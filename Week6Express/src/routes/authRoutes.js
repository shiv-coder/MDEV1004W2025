const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register',authController.registerUser);

router.get('/login',passport.authenticate('local'),(req,res)=>{
    res.send('Looged in successfully');
})

//logout route

module.exports = router;