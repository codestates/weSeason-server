const express = require('express');
const router = express.Router();
const authController = require('../controller/auth')

router.post('/signin', authController)

router.post('/signout', authController)