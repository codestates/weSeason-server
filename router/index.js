const express = require('express');
const router = express.Router();
const usersController = require('../controller/users/index')
// const authController = require('../controller/auth/index')
// const clothesController = require('../controller/clothes/index')
// const weatherController = require('../controller/weather/index')

router.get('/users/:email', usersController.get);
router.post('/users', usersController.post);
// router.patch('/users', usersController);
// router.delete('/users', usersController);

// router.post('/auth/signin', authController);
// router.post('/auth/signout', authController);

// router.get('/clothes', clothesController);

// router.get('/weather', weatherController);

module.exports = router;