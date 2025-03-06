const express = require('express');
const router = express.Router();
const jwtController = require('../controllers/controllers');
const jwtmiddleware = require('../middleware/auth');

router.post('/register',jwtController.register);
router.post('/login',jwtController.login);

//create/welcome endpoint ---call middleware & welcome function-Lab5

module.exports = router;


