const express = require('express');
const router = express.Router();
const usersController = require('../controller/users/index')
const authController = require('../controller/auth/index')
const clothesController = require('../controller/clothes/index')
// const weatherController = require('../controller/weather/index')

router.get('/users', usersController.infoUser);
router.post('/users', usersController.createUser);
router.patch('/users', usersController.updateUser);
router.delete('/users', usersController.deleteUser);

router.post('/auth/signin', authController.signIn)
router.get('/auth/signin', authController.tokenMaker)

router.get('/clothes/:temp', clothesController.getClothes);
// router.get('/weather', weatherController);

module.exports = router;