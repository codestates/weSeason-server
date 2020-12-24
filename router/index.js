const express = require('express');
const router = express.Router();
const usersController = require('../controller/users/index')
// const authController = require('../controller/auth/index')
// const clothesController = require('../controller/clothes/index')
// const weatherController = require('../controller/weather/index')

router.get('/users/:email', usersController.infoUser);
router.post('/users', usersController.createUser);
router.patch('/users', usersController.updateUser);
router.delete('/users', usersController.deleteUser);


// router.post('/auth/signin', authController);
// router.post('/auth/signout', authController);
// router.get('/clothes', clothesController);
// router.get('/weather', weatherController);

module.exports = router;