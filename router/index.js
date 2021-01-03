const express = require('express');
const router = express.Router();
const usersController = require('../controller/users/index')
const authController = require('../controller/auth/index')
const clothesController = require('../controller/clothes/index')
const weatherController = require('../controller/weather/index')

router.get('/users', usersController.infoUser);
router.post('/users', usersController.createUser);
router.patch('/users', usersController.updateUser);
router.delete('/users', usersController.deleteUser);

router.get('/auth/signin', authController.tokenMaker)
router.post('/auth/signin', authController.signIn)
router.post('/auth/signout', authController.signout)
router.post('/auth/check', authController.check)
router.post('/auth/callback', authController.callback) // oauth accessToken 발급
router.get('/auth/refreshoauth', authController.refreshoauth) // oauth accessToken 재발급

router.get('/clothes', clothesController.getClothes);
router.get('/weather', weatherController.getWeathers);

module.exports = router;