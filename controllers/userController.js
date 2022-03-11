const router = require('express').Router();
const userModel = require('../models/users/userModel');

router.post('/register', userModel.registerUser);

router.post('/login', userModel.loginUserWithEmailAndPassword);


module.exports = router;